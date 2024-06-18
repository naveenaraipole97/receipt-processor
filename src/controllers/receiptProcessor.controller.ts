import express, { Request, Response} from 'express'
import { ReceiptProcessorService } from '../services/receiptProcessor.service'
import { IdGenerator } from '../utils/generateId'
import { Receipts } from '../utils/saveScannedReceipts'
const app = express();
const receiptProcessorService = new ReceiptProcessorService();
const idGenerator = new IdGenerator()
const receipts = new Receipts()

app.use(express.json())

app.post("/receipts/process", (req: Request, res: Response) => {
    let points: number = receiptProcessorService.calculatePoints(req['body'])
    let id: string= idGenerator.generateUniqueID()
    receipts.saveScannedReceipts({id: id, points: points})
    res.json({"id": id})
})

app.get("/receipts/:id/points", (req: Request, res: Response) => {
    let queryParams: any = req.query
    res.json({"points": receipts.scannedReceipts[queryParams['id']]})
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})
