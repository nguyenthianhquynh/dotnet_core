export type Shipments = Shipment[]

export interface Shipment {
    shortName: string
    deliveryTime: string
    description: string
    price: number
    id: number
}