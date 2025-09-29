// import { animate, createSpring, JSAnimation, stagger } from 'animejs'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const staggerdelay = 70
const animduration = 400
// export function useInitAnimRoot(classname: string = 'animitem') {
//   const root = useRef<HTMLDivElement>(null)
//   const id = useRef<number>(0)
//   const lastAnim = useRef<JSAnimation>()
//   useEffect(() => {
//     console.info('useInitAnimRoot::', Boolean(root.current))
//     if (!root.current) return () => {}
//     let lastTargets: Element[] = []
//     const onChange = (data?: MutationRecord[]) => {
//       const added = !data || data.find((item) => item.type === 'childList' && item.addedNodes.length)
//       // console.info('AnimChange:', added)
//       if (added && root.current) {
//         const nTargets = root.current.getElementsByClassName(classname)
//         const targets: Element[] = []
//         for (const element of nTargets) {
//           if (!lastTargets.find((item) => element.isSameNode(item))) targets.push(element)
//         }
//         lastTargets = [...nTargets]
//         if (targets.length) {
//           lastAnim.current = animate(targets, {
//             id: 'anim' + id.current,
//             opacity: { from: 0, to: 1 },
//             translateY: { from: 100, to: 0 },
//             scale: { from: 0.8, to: 1 },
//             // rotate: { from: 30 },
//             // skewX: { from: 30 },
//             delay: stagger(staggerdelay),
//             ease: createSpring({ stiffness: 70 }),
//             duration: stagger(staggerdelay, { start: animduration }),
//           })
//           lastAnim.current.onPause = (ja) => {
//             ja.complete()
//           }
//           id.current++
//         }
//       }
//     }
//     const mo = new MutationObserver(onChange)
//     onChange()
//     mo.observe(root.current, { subtree: true, childList: true })
//     return () => mo.disconnect()
//   }, [root.current])
//   return root
// }

export function useInitAnimRoot(classname: string = 'animitem') {
  const root = useRef<HTMLDivElement>(null)
  const id = useRef<number>(0)
  useEffect(() => {
    console.info('useInitAnimRoot::', Boolean(root.current))
    if (!root.current) return () => {}
    let lastTargets: Element[] = []
    const onChange = (data?: MutationRecord[]) => {
      const added = !data || data.find((item) => item.type === 'childList' && item.addedNodes.length)
      // console.info('AnimChange:', added)
      if (added && root.current) {
        const nTargets = root.current.getElementsByClassName(classname)
        const targets: Element[] = []
        for (const element of nTargets) {
          if (!lastTargets.find((item) => element.isSameNode(item))) targets.push(element)
        }
        lastTargets = [...nTargets]
        if (targets.length) {
          gsap.fromTo(
            targets,
            {
              y: 100,
              scale: 0.8,
              opacity: 0,
            },
            {
              y: 0,
              scale: 1,
              opacity: 1,

              stagger: 0.1,
              duration: 0.6,
              ease: 'back.out(1.4)',
              lazy: true,
            },
          )
          //   animate(targets, {
          //     id: 'anim' + id.current,
          //     opacity: { from: 0, to: 1 },
          //     translateY: { from: 100, to: 0 },
          //     scale: { from: 0.8, to: 1 },
          //   })
          //   gsap
          id.current++
        }
      }
    }
    const mo = new MutationObserver(onChange)
    onChange()
    mo.observe(root.current, { subtree: true, childList: true })
    return () => mo.disconnect()
  }, [root.current])
  return root
}
