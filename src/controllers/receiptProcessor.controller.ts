import express, { Application, Request, Response} from 'express'
import { ReceiptProcessorService } from '../services/receiptProcessor.service'
import { IdGenerator } from '../utils/generateId'
import { Receipts } from '../utils/saveScannedReceipts'
import { Receipt } from '../interfaces/receipt.interface'
import { ReceiptValidationService } from '../services/validateReceipt.service'

const app: Application = express();
const receiptProcessorService = new ReceiptProcessorService();
const receiptValidationService = new ReceiptValidationService();
const idGenerator = new IdGenerator()
const receipts = new Receipts()

app.use(express.json())

app.post("/receipts/process", (req: Request, res: Response) => {
    const requestBody: Receipt = req.body;

    // Check if request body exists and is valid
    if (!requestBody || !receiptValidationService.isValidReceipt(requestBody)) {
        return res.status(400).json({ 'description': 'The receipt is invalid' });
    }
    
    // Calculate points for the receipt and generate a unique ID
    const points: number = receiptProcessorService.calculatePoints(requestBody);
    const id: string = idGenerator.generateUniqueID();

    //Save the ID and points in a in memory map
    receipts.saveScannedReceipts({id: id, points: points});
    
    res.status(200).json({ "id": id });
});

app.get("/receipts/:id/points", (req: Request, res: Response) => {
    // Extract the request parameters
    let requestParams: any = req.params;

    // Check if the receipt ID exists in the scannedReceipts map
    if (!receipts.scannedReceipts[requestParams['id']]) {
        return res.status(404).json({ 'description': 'No receipt found for that id' });
    }

    res.status(200).json({ "points": receipts.scannedReceipts[requestParams['id']] });
});

app.listen(3000, () => {
    console.log("Server running on port 3000")
})

export default app;
