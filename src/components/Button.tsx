import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FunctionComponent,
  memo,
  ReactNode,
} from "react"

type Variants = "primary" | "whatsapp"

export const buttonStyles = ({
  variant,
  shadow = false,
}: {
  variant: Variants
  shadow: boolean | undefined
}) => `
flex w-max cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 font-bold text-neutral-50 transition-colors
${
  variant === "primary"
    ? `bg-primary-base hover:bg-primary-darker ${
        shadow ? "shadow-primary" : ""
      }`
    : `bg-emerald-600 hover:bg-emerald-700 ${shadow ? "shadow-whatsapp" : ""}`
}
`

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode
    variant: Variants
    href?: string
    shadow?: boolean
    external?: boolean
    onClick?: () => void
  }

const ButtonRoot: FunctionComponent<Props> = ({
  children,
  variant,
  href,
  shadow,
  external = false,
  onClick,
  className: elementClassName,
  ...props
}) => {
  const className = buttonStyles({
    shadow,
    variant,
  })

  return href ? (
    <a
      target={external ? "_blank" : "_self"}
      href={href}
      className={`${className} ${elementClassName ?? ""}`}
      {...props}
    >
      {children}
    </a>
  ) : (
    <button
      onClick={onClick}
      className={`${className} ${elementClassName ?? ""}`}
      {...props}
    >
      {children}
    </button>
  )
}

export const Button = memo(ButtonRoot)
