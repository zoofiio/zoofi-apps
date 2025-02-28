import { useThemeState } from '@/components/theme-mode'
import { getCurrentChainId } from '@/config/network'
import { OKXUniversalConnectUI, THEME } from '@okxconnect/ui'
import _ from 'lodash'
import { Address, getAddress, RpcError } from 'viem'
import { Connector, createConnector } from 'wagmi'

export function okxConnector() {
  let okxUniversal: OKXUniversalConnectUI

  let accountsChanged: Connector['onAccountsChanged'] | undefined
  let chainChanged: Connector['onChainChanged'] | undefined
  let connect: Connector['onConnect'] | undefined
  let disconnect: Connector['onDisconnect'] | undefined

  return createConnector<ReturnType<OKXUniversalConnectUI['getUniversalProvider']>, {}, {}>((config) => {
    return {
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJDSURBVHgB7Zq9jtpAEMfHlhEgQLiioXEkoAGECwoKxMcTRHmC5E3IoyRPkPAEkI7unJYmTgEFTYwA8a3NTKScLnCHN6c9r1e3P2llWQy7M/s1Gv1twCP0ej37dDq9x+Zut1t3t9vZjDEHIiSRSPg4ZpDL5fxkMvn1cDh8m0wmfugfO53OoFQq/crn8wxfY9EymQyrVCqMfHvScZx1p9ls3pFxXBy/bKlUipGPrVbLuQqAfsCliq3zl0H84zwtjQrOw4Mt1W63P5LvBm2d+Xz+YzqdgkqUy+WgWCy+Mc/nc282m4FqLBYL+3g8fjDxenq72WxANZbLJeA13zDX67UDioL5ybXwafMYu64Ltn3bdDweQ5R97fd7GyhBQMipx4POeEDHIu2LfDdBIGGz+hJ9CQ1ABjoA2egAZPM6AgiCAEQhsi/C4jHyPA/6/f5NG3Ks2+3CYDC4aTccDrn6ojG54MnEvG00GoVmWLIRNZ7wTCwDHYBsdACy0QHIhiuRETxlICWpMMhGZHmqS8qH6JLyGegAZKMDkI0uKf8X4SWlaZo+Pp1bRrwlJU8ZKLIvUjKh0WiQ3sRUbNVq9c5Ebew7KEo2m/1p4jJ4qAmDaqDQBzj5XyiAT4VCQezJigAU+IDU+z8vJFnGWeC+bKQV/5VZ71FV6L7PA3gg3tXrdQ+DgLhC+75Wq3no69P3MC0NFQpx2lL04Ql9gHK1bRDjsSBIvScBnDTk1WrlGIZBorIDEYJj+rhdgnQ67VmWRe0zlplXl81vcyEt0rSoYDUAAAAASUVORK5CYII=',
      name: 'OKX Connect',
      id: 'okxConnect',
      type: '',
      async setup() {
        okxUniversal = await OKXUniversalConnectUI.init({
          dappMetaData: { name: 'Zoo Finance', icon: 'https://zoofi.io/logo-alt.svg' },
          actionsConfiguration: {
            returnStrategy: 'tg://resolve',
            modals: 'all',
            tmaReturnUrl: 'back',
          },
          language: 'en_US',
          uiPreferences: {
            theme: useThemeState.getState().theme == 'light' ? THEME.LIGHT : THEME.DARK,
          },
        })
      },
      async connect(parameters) {
        const data = await okxUniversal.openModal({
          namespaces: {
            eip155: {
              // 请按需组合需要的链id传入，多条链就传入多个
              chains: config.chains.map((item) => `eip155:${item.id}`),
              defaultChain: `${getCurrentChainId()}`,
              rpcMap: _.reduce(config.chains, (map, item) => ({ ...map, [`${item.id}`]: item.rpcUrls.default.http[0] }), {} as Record<string, string>),
            },
          },
        })
        if (!data) throw new Error('Connect Error')
        const { eip155 } = data.namespaces
        if (!eip155) throw new Error('Not support EVM')
        return { accounts: eip155.accounts.map((x) => getAddress(x)), chainId: getCurrentChainId() }
      },
      async disconnect() {
        await okxUniversal.disconnect()
      },
      async getAccounts() {
        return okxUniversal.requestAccountsWithNamespace('eip155') as readonly Address[]
      },
      async getChainId() {
        return Number(okxUniversal.requestDefaultChainWithNamespace('eip155'))
      },
      async getProvider() {
        return okxUniversal.getUniversalProvider()
      },
      async isAuthorized() {
        return okxUniversal.connected()
      },
      async switchChain(parameters) {
        const chain = config.chains.find((item) => item.id == parameters.chainId)
        if (!chain) throw new Error('Not support chain')
        return chain
      },
      async onAccountsChanged(accounts) {
        // Disconnect if there are no accounts
        if (accounts.length === 0) this.onDisconnect()
        // Connect if emitter is listening for connect event (e.g. is disconnected and connects through wallet interface)
        else if (config.emitter.listenerCount('connect')) {
          const chainId = (await this.getChainId()).toString()
          this.onConnect?.({ chainId })
          // Remove disconnected shim if it exists
          //   if (shimDisconnect) await config.storage?.removeItem(`${this.id}.disconnected`)
        }
        // Regular change event
        else
          config.emitter.emit('change', {
            accounts: accounts.map((x) => getAddress(x)),
          })
      },
      onChainChanged(chain) {
        const chainId = Number(chain)
        config.emitter.emit('change', { chainId })
      },
      async onConnect(connectInfo) {
        const accounts = await this.getAccounts()
        if (accounts.length === 0) return

        const chainId = Number(connectInfo.chainId)
        config.emitter.emit('connect', { accounts, chainId })

        // Manage EIP-1193 event listeners
        const provider = await this.getProvider()
        if (provider) {
          if (connect) {
            provider.removeListener('connect', connect)
            connect = undefined
          }
          if (!accountsChanged) {
            accountsChanged = this.onAccountsChanged.bind(this)
            provider.on('accountsChanged', accountsChanged)
          }
          if (!chainChanged) {
            chainChanged = this.onChainChanged.bind(this)
            provider.on('chainChanged', chainChanged)
          }
          if (!disconnect) {
            disconnect = this.onDisconnect.bind(this)
            provider.on('disconnect', disconnect)
          }
        }
      },
      async onDisconnect(error) {
        const provider = await this.getProvider()

        // If MetaMask emits a `code: 1013` error, wait for reconnection before disconnecting
        // https://github.com/MetaMask/providers/pull/120
        if (error && (error as RpcError<1013>).code === 1013) {
          if (provider && !!(await this.getAccounts()).length) return
        }

        // No need to remove `${this.id}.disconnected` from storage because `onDisconnect` is typically
        // only called when the wallet is disconnected through the wallet's interface, meaning the wallet
        // actually disconnected and we don't need to simulate it.
        config.emitter.emit('disconnect')

        // Manage EIP-1193 event listeners
        if (provider) {
          if (chainChanged) {
            provider.removeListener('chainChanged', chainChanged)
            chainChanged = undefined
          }
          if (disconnect) {
            provider.removeListener('disconnect', disconnect)
            disconnect = undefined
          }
          if (!connect) {
            connect = this.onConnect?.bind(this)
            provider.on('connect', connect)
          }
        }
      },
    }
  })
}
