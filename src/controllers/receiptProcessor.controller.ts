import express, { Application, Request, Response, NextFunction} from 'express'
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

// Middleware to handle JSON parsing errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).json({ 'description': `Invalid JSON payload, ${err.message}`});
    }
    next();
});

/**
 * POST /receipts/process
 * Processes a receipt and returns a unique ID.
 * 
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Response} The response object with the status and the unique ID
 */
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
    
    return res.status(200).json({ "id": id });
});

/**
 * GET /receipts/:id/points
 * Retrieves the points for a given receipt ID.
 * 
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Response} The response object with the status and points
 */
app.get("/receipts/:id/points", (req: Request, res: Response) => {
    // Extract the request parameters
    let requestParams: any = req.params;

    // Check if the receipt ID exists in the scannedReceipts map
    if (!receipts.scannedReceipts[requestParams['id']]) {
        return res.status(404).json({ 'description': 'No receipt found for that id' });
    }

    return res.status(200).json({ "points": receipts.scannedReceipts[requestParams['id']] });
});

/**
 * ALL /receipts/process
 * Handles unsupported HTTP methods for /receipts/process.
 * 
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Response} The response object with the status and error message
 */
app.all("/receipts/process", (req: Request, res: Response) => {
    return res.status(405).json({'description': 'Method not allowed'})
})

/**
 * ALL /receipts/:id/points
 * Handles unsupported HTTP methods for /receipts/:id/points.
 * 
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Response} The response object with the status and error message
 */
app.all("/receipts/:id/points", (req: Request, res: Response) => {
    return res.status(405).json({'description': 'Method not allowed'})
})



app.listen(3000, () => {
    console.log("Server running on port 3000")
})

export default app;
