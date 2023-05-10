import { FunctionComponent, memo, useState } from "react"
import { buttonStyles } from "./Button"

import Fix from "@/images/services/fix.png"
import Tire from "@/images/services/tire.png"
import Accessories from "@/images/services/accessories.png"
import General from "@/images/services/general.png"

const buttonClass = buttonStyles({
  variant: "primary",
  shadow: true,
})

const services = [
  {
    image: Fix,
    name: "Serviços Gerais",
    slug: "general",
    description: "Pinturas, Reparos E Trocas",
  },
  {
    image: Tire,
    name: "Bicicletas",
    slug: "bikes",
    description: "Procure Sua Bicicleta Ideal",
  },
  {
    image: Accessories,
    name: "Acessórios",
    slug: "accessories",
    description: "Retrovisores E Pedais",
  },
  {
    image: General,
    name: "Outros",
    slug: "others",
    description: "Suporte E Devoluções",
  },
] as const

type Services = (typeof services)[number] extends { slug: infer Name }
  ? Name
  : never

const Card: FunctionComponent<{
  image: ImageMetadata
  slug: string
  name: string
  description: string
  selected: boolean
  onClick: () => void
}> = memo(({ name, description, image, onClick, selected }) => {
  return (
    <button
      type="button"
      className={`flex h-full w-full flex-col items-center justify-center gap-2 rounded border ${
        selected
          ? "border-primary-base"
          : "border-slate-300 hover:brightness-95"
      } px-3 py-6 transition-all duration-300 `}
      style={{
        background: selected
          ? "linear-gradient(180deg, #FCEFEF 0%, #FCF0F0 100%)"
          : "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.1) 100%)",
      }}
      onClick={onClick}
    >
      <img width={35} height={35} src={image.src} alt={`Icone de ${name}`} />

      <p className="text-base font-bold text-slate-800">
        <strong>{name}</strong>
      </p>

      <small className="text-sm text-slate-500">{description}</small>
    </button>
  )
})

export const Form: FunctionComponent = () => {
  const [step, setStep] = useState(0)
  const [service, setService] = useState<Services | null>(null)

  return (
    <div className="flex flex-col gap-4">
      {step === 0 && (
        <ul className="flex w-full flex-wrap items-stretch justify-center gap-4">
          {services.map(({ name, description, image, slug }) => (
            <li className="w-[calc(50%-8px)]" key={slug}>
              <Card
                name={name}
                description={description}
                image={image}
                slug={slug}
                selected={slug === service}
                onClick={() => {
                  if (service === slug) {
                    setService(null)
                  } else {
                    setService(slug)
                  }
                }}
              />
            </li>
          ))}
        </ul>
      )}

      <button
        disabled={!Boolean(service)}
        className={`${buttonClass} disabled:opacity-50`}
        onClick={() => setStep((step) => step + 1)}
      >
        Prosseguir
      </button>
    </div>
  )
}
