import express, { Request, Response} from 'express'
import { ReceiptProcessorService } from '../services/receiptProcessor.service'
const app = express();
const receiptProcessorService = new ReceiptProcessorService();

app.use(express.json())

app.post("/receipts/process", (req: Request, res: Response) => {
    let points = receiptProcessorService.calculatePoints(req)
    res.json({"id": "example-receipt-id", "points": points})
})

app.get("/receipts/:id/points", (req: Request, res: Response) => {
    res.json({"points": 32})
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})
