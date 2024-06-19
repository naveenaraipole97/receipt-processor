import { ReceiptDetails } from '../interfaces/receipt.interface'

export class Receipts{
    scannedReceipts: any = {}
    saveScannedReceipts(receiptDetails: ReceiptDetails){
        this.scannedReceipts[receiptDetails['id']]=receiptDetails['points']
    }
}