import { create } from 'zustand'

export const useOpenSendCalls = create<{ enableSendCalls: boolean }>(() => ({ enableSendCalls: true }))

export const useEnableSendCalls = () => useOpenSendCalls((s) => s.enableSendCalls)
export const setEnableSendCalls = (enableSendCalls: boolean) => useOpenSendCalls.setState({ enableSendCalls })