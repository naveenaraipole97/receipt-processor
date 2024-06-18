import { Receipt } from '../interfaces/receipt.interface'

export class Receipts{
    scannedReceipts: any = {}
    saveScannedReceipts(receiptDetails: Receipt){
        this.scannedReceipts[receiptDetails['id']]=receiptDetails['points']
    }
}