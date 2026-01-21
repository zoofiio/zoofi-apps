import { NextResponse } from "next/server"

export function toJson(obj: any) {
    return JSON.stringify(obj, (_key, value: any) => {
        return typeof value == 'bigint' ? `__bn__${value.toString()}` : value
    })
}

export function fromJson(json: string) {
    return JSON.parse(json, (_k, value: any) => {
        return typeof value == 'string' && value.startsWith("__bn__") ? BigInt(value.slice(6)) : value
    })
}


export function toJsonRES(obj: any) {
    return new NextResponse(toJson(obj), { status: 200, headers: { 'Content-Type': 'application/json', } })
}