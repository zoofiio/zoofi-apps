import { cn } from '@/lib/utils'
import * as Dialog from '@radix-ui/react-dialog'
import { Dispatch, Ref, SetStateAction } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'

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
        <div className='w-screen h-screen fixed top-0 left-0 inset-0 z-101 bg-black/60' />
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
            'fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[640px] -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#333333] rounded-2xl overflow-hidden shadow-2xl z-101',
            className,
          )}
        >
          {children}
          {!disableClose && <Dialog.Close
            className={cn('absolute right-4 top-4 cursor-point text-xl', closeClassName)}
          >
            <IoIosCloseCircleOutline />
          </Dialog.Close>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
