'use client'

import { ApproveAndTx } from "@/components/approve-and-tx";
import { ContractAll, Expandable, inputClassname } from "@/components/general-action";
import { PageWrap } from "@/components/page-wrap";
import { SimpleTabs } from "@/components/simple-tabs";
import { abiLntErc721, abiLntFactory, abiLntMarketRouter, abiMockERC20, abiMockERC721 } from "@/config/abi";
import { codeLNTVaultERC721, codeVT } from "@/config/codes";
import { cn } from "@/lib/utils";
import { Fragment, useMemo, useState } from "react";
import { useSetState } from "react-use";
import { encodeAbiParameters, isAddress, parseAbi, parseEventLogs } from "viem";


function DeployContractByLntFactory({
    tit,
    types,
    code,
    upInfos,
}: { tit: string, types: ({ type: string, name: string })[], code: string, upInfos?: (obj: any) => void }) {
    const disableExpand = types.length == 0;
    const [args, setArgs] = useState(types.map(() => ''))
    const deployArgs = useMemo(() => {
        try {
            const cargs = encodeAbiParameters(types, args)
            console.info('types:', types.map(item => item.type), cargs)
            return [code, cargs]
        } catch (error) {
            return undefined;
        }
    }, [args])
    return <Expandable tit={tit} disable={disableExpand}>
        {types.map((item, index) => (
            <div
                className='relative'
                key={`input_${index}`}
            >
                <div className='opacity-60 absolute top-1/2 left-2 -translate-y-1/2 text-xs'>{item.name}:({item.type})</div>
                <input
                    type='text'
                    value={args[index]}
                    onChange={(e) => setArgs(args.map((arg, argIndex) => (index == argIndex ? e.target.value : arg)))}
                    className={cn(inputClassname)}
                />

            </div>
        ))}
        <ApproveAndTx
            tx='Write'
            config={
                {
                    abi: abiLntFactory,
                    address: '0x8c895d8AD89fFc193AFEF715645379C07bF169B9',
                    functionName: 'deployContract',
                    args: deployArgs
                } as any
            }
            onTxSuccess={(tx) => {
                const events = parseEventLogs({
                    abi: parseAbi(['event ContractDeployed(address indexed deployer, address indexed contractAddress)']),
                    logs: tx.logs
                })
                const cd = events?.find(item => item.eventName == 'ContractDeployed')
                if (cd) {
                    upInfos?.({ [`${tit}`]: cd.args.contractAddress })
                }
            }}
            disabled={!deployArgs}
            className={cn('!mt-0 flex items-center justify-center gap-4', disableExpand ? 'max-w-[100px]' : 'w-full')}
        />
    </Expandable>
}

export default function Page() {
    const [inputLntVaultErc721, setInputLntErc721] = useState('0x9c3290f3c8a1e2994ce93f53e1a179c4e5d997aa')
    const [inputErc721, setInputErc721] = useState('0x0e98853C1d978e9dB40aE6B13c56E8103D33d9aA')
    const [inputErc20, setInputErc20] = useState('0x2A596F1eF3DC14Cb53DC67290F7851d35A32557e')
    const [infos, setInfos] = useSetState({
        'LntMarket': '0x5565924978aF004BAB0aa004d11F8C660D43DcAC',
        'LntMarketFactory': '0x7De98312C36eB9977CB1277CEd28705048565e49',
        'LntMarketRouter': '0xA59d576650e0f206EdC03060553CdCbB64f1B4a6',
        'LntContractFactory': '0x8c895d8AD89fFc193AFEF715645379C07bF169B9',
        "MockERC721": '0x0e98853C1d978e9dB40aE6B13c56E8103D33d9aA',
        "MockERC20": '0x2A596F1eF3DC14Cb53DC67290F7851d35A32557e',
        'Decimal18': '000000000000000000'
    })

    return <PageWrap>
        <div className='w-full max-w-[1232px] px-4 overflow-x-auto mx-auto'>
            <div className="text-lg whitespace-pre-wrap p-2 bg-primary/20 rounded-xl">
                {JSON.stringify(infos, undefined, 2)}
            </div>
            <SimpleTabs
                listClassName='flex-wrap p-0 mb-5 md:gap-14'
                triggerClassName='text-lg sm:text-xl md:text-2xl py-0 data-[state="active"]:border-b border-b-black dark:border-b-white leading-[0.8] rounded-none whitespace-nowrap'
                contentClassName='gap-5'
                data={[
                    // { tab: 'LntMarket', content: <ContractAll abi={abiLntMarket} address="0x5565924978aF004BAB0aa004d11F8C660D43DcAC" /> },
                    // { tab: 'LntMarketFactory', content: <ContractAll abi={abiLntMarketFactory} address="0x7De98312C36eB9977CB1277CEd28705048565e49" /> },
                    { tab: 'LntMarketRouter', content: <ContractAll abi={abiLntMarketRouter} address="0xA59d576650e0f206EdC03060553CdCbB64f1B4a6" /> },
                    // { tab: 'WETH', content: <ContractAll abi={abiWETH} address="0xDE59aEe3AdBEAF561347beadA174D0ce5023f0e4" /> },
                    {
                        tab: 'LntContractFactory', content: <Fragment>
                            <div className='font-bold text-2xl'>Wrapped Deploy</div>
                            <DeployContractByLntFactory tit="Deploy LntVaultERC721" code={codeLNTVaultERC721} types={[{ type: 'address', name: 'owner' }]} upInfos={setInfos} />
                            <DeployContractByLntFactory tit="Deploy VT" code={codeVT} types={[{ type: 'address', name: 'vault' }, { type: 'string', name: 'name' }, { type: 'string', name: 'symbol' }]} upInfos={setInfos} />
                            <ContractAll abi={abiLntFactory} address="0x8c895d8AD89fFc193AFEF715645379C07bF169B9" />
                        </Fragment>
                    },
                    {
                        tab: 'LntVaultERC721', content: <Fragment>
                            <div className='relative'>
                                <div className='opacity-60 absolute top-1/2 left-2 -translate-y-1/2 text-xs'>LntVaultERC721 Address:</div>
                                <input
                                    type='text'
                                    className={inputClassname}
                                    value={inputLntVaultErc721}
                                    onChange={(e) => setInputLntErc721(e.target.value)}
                                />
                            </div>
                            {isAddress(inputLntVaultErc721) && <ContractAll abi={abiLntErc721} address={inputLntVaultErc721} />}
                        </Fragment>
                    },
                    {
                        tab: 'ERC721', content: <Fragment>
                            <div className='relative'>
                                <div className='opacity-60 absolute top-1/2 left-2 -translate-y-1/2 text-xs'>ERC721 Address:</div>
                                <input
                                    type='text'
                                    className={inputClassname}
                                    value={inputErc721}
                                    onChange={(e) => setInputErc721(e.target.value)}
                                />
                            </div>
                            {isAddress(inputErc721) && <ContractAll abi={abiMockERC721} address={inputErc721} />}
                        </Fragment>
                    },
                    {
                        tab: 'ERC20', content: <Fragment>
                            <div className='relative'>
                                <div className='opacity-60 absolute top-1/2 left-2 -translate-y-1/2 text-xs'>ERC20 Address:</div>
                                <input
                                    type='text'
                                    className={inputClassname}
                                    value={inputErc20}
                                    onChange={(e) => setInputErc20(e.target.value)}
                                />
                            </div>
                            {isAddress(inputErc20) && <ContractAll abi={abiMockERC20} address={inputErc20} />}
                        </Fragment>
                    }
                ]}
            />
        </div>
    </PageWrap>
}