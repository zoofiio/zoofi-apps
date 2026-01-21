'use client'
import { cn } from '@/lib/utils'
import * as Dialog from '@radix-ui/react-dialog'
import { Dispatch, Ref, SetStateAction } from 'react'
import { FaX } from 'react-icons/fa6'

export function SimpleDialog({
  trigger,
  children,
  className,
  style,
  closeClassName,
  disableOutClose,
  disableClose,
  triggerProps,
  triggerRef,
  open,
  defaultOpen,
  ref,
  ...props
}: {
  ref?: Ref<{ setOpen: Dispatch<SetStateAction<boolean>> }>
  trigger?: React.ReactNode
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  closeClassName?: string
  disableOutClose?: boolean
  disableClose?: boolean
  triggerProps?: Dialog.DialogTriggerProps
  triggerRef?: Ref<HTMLButtonElement>
} & Dialog.DialogProps) {
  // const [mopen, setOpen] = useState(defaultOpen ?? false)
  // useImperativeHandle(ref, () => ({
  //   setOpen
  // }), [])
  return (
    <Dialog.Root open={open} defaultOpen={defaultOpen} {...props}>
      {Boolean(trigger) && <Dialog.Trigger asChild ref={triggerRef} {...(triggerProps || {})}>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <div className='w-screen h-screen fixed top-0 left-0 inset-0 z-110 bg-black/60' />
        <Dialog.Content
          onEscapeKeyDown={(e) => {
            disableClose && e.stopPropagation()
            disableClose && e.preventDefault()
          }}
          onInteractOutside={(e) => {
            console.info('e:', e)
            disableOutClose && e.stopPropagation()
            disableOutClose && e.preventDefault()
          }}
          style={style}
          className={cn(
            'fixed trans-center card p-0 max-h-[85vh] w-[90vw] max-w-135 rounded-2xl overflow-hidden shadow-2xl z-110',
            className,
          )}
        >
          {children}
          {!disableClose && <Dialog.Close
            className={cn('absolute right-4 top-3 cursor-pointer text-base bg-main p-2.5 m-shadow-around hover:shadow-primary/60 rounded-full', closeClassName)}
          >
            <FaX />
          </Dialog.Close>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
