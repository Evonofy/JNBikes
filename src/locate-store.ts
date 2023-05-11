document.addEventListener("DOMContentLoaded", () => {
  const storeElement = {
    label: document.querySelector<HTMLElement>("[data-store-label]")!,
    street: document.querySelector<HTMLElement>("[data-store-street]")!,
    number: document.querySelector<HTMLElement>("[data-store-number]")!,
    bairro: document.querySelector<HTMLElement>("[data-store-bairro]")!,
  }

  type Store = {
    name: string
    street: string
    number: string
    bairro: string
    latitude: string
    longitude: string
  }

  const stores: Store[] = [
    {
      name: "jn",
      street: "Avenida Nova Independência",
      number: "449",
      bairro: "Brooklin",
      latitude: "-23.604157",
      longitude: "-46.6911908",
    },
  ]

  type Position = {
    latitude: string
    longitude: string
  }

  const findNearestStore =
    ({ latitude, longitude }: Position) =>
    (store: Store) => {
      let unit = "K"

      let radlat1 = (Math.PI * Number(latitude)) / 180
      let radlat2 = (Math.PI * Number(store.latitude)) / 180
      let theta = Number(longitude) - Number(store.longitude)
      let radtheta = (Math.PI * theta) / 180
      let distance =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)

      if (distance > 1) {
        distance = 1
      }

      distance = Math.acos(distance)
      distance = (distance * 180) / Math.PI
      distance = distance * 60 * 1.1515

      if (unit == "K") {
        distance = distance * 1.609344
      }

      if (unit == "N") {
        distance = distance * 0.8684
      }

      return {
        ...store,
        distance,
      }
    }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const currentPosition: Position = {
        latitude: String(position.coords.latitude),
        longitude: String(position.coords.longitude),
      }

      const [nearestStore] = stores
        .map(findNearestStore(currentPosition))
        .sort((a, b) => a.distance - b.distance)

      storeElement.label.style.display = "flex"
      storeElement.street.textContent = nearestStore?.street ?? ""
      storeElement.number.textContent = nearestStore?.number ?? ""
      storeElement.bairro.textContent = nearestStore?.bairro ?? ""
    })
  }
})

export {}
