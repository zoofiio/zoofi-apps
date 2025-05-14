'use client'
  ;
import { useRouter } from "next/navigation";
import { useEffect } from "react";

(BigInt.prototype as any).toJSON = function () {
  return this.toString()
}


export default function Home() {
  const r = useRouter()
  useEffect(() => {
    r.replace('/lnt')
  }, [])
  return <></>
}
