export interface ReceiptDetails {
    id: string, 
    points: number
}

export interface ReceiptItem {
    shortDescription: string,
    price: string
}

export interface Receipt {
    retailer: string,
    purchaseDate: string,
    purchaseTime: string,
    items: []
    total: string
}