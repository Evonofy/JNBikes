import { FunctionComponent, memo, ReactNode } from "react"

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

const ButtonRoot: FunctionComponent<{
  children: ReactNode
  variant: Variants
  href?: string
  shadow?: boolean
  external?: boolean
  onClick?: () => void
}> = ({ children, variant, href, shadow, external = false, onClick }) => {
  const className = buttonStyles({
    shadow,
    variant,
  })

  return href ? (
    <a target={external ? "_blank" : "_self"} href={href} className={className}>
      {children}
    </a>
  ) : (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export const Button = memo(ButtonRoot)
