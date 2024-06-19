export class ReceiptValidationService {
    // Function to validate if a string is a valid date in YYYY-MM-DD format 
    isValidDate(dateString: string): boolean {
        
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
       
        if (!dateRegex.test(dateString)) {
            return false;
        }

        const parts = dateString.split("-");
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);

        if (year < 1000 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) {
            return false;
        }

        const date = new Date(year, month - 1, day);

        return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    };

    // Function to validate if a string is a valid time in HH:MM format
    isValidTime(timeStr: string){
        const timeRegex = /^\d{2}:\d{2}$/;
        if (!timeStr || typeof timeStr !== 'string' || !timeRegex.test(timeStr)) {
            return false
        }
        const [hours, minutes] = timeStr.split(':').map(Number);
         
        if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
            return false
        }
        return true
    }
    
    // Function to validate if receipt is valid
    isValidReceipt(receipt: any): boolean {
        if (typeof receipt !== 'object') return false;
    
        if (!receipt['retailer'] || typeof receipt['retailer'] !== 'string' || !/^[\w\s\-&]+$/.test(receipt['retailer'])) return false;
    
        if (!receipt['purchaseDate'] || typeof receipt['purchaseDate'] !== 'string' || !this.isValidDate(receipt['purchaseDate'])) return false;
    
        if (!receipt['purchaseTime'] || typeof receipt['purchaseTime'] !== 'string' || !this.isValidTime(receipt['purchaseTime'])) return false;
    
        if (!receipt['items'] || !Array.isArray(receipt['items']) || receipt['items'].length === 0) return false;
    
        for (const item of receipt['items']) {
            const { shortDescription, price } = item;
            if (!shortDescription || typeof shortDescription !== 'string' || !/^[\w\s\-]+$/.test(shortDescription)) return false;
            if (!price || typeof price !== 'string' || !/^\d+\.\d{2}$/.test(price)) return false;
        }
        if (!receipt['total'] || typeof receipt['total'] !== 'string' || !/^\d+\.\d{2}$/.test(receipt['total'])) return false;

        return true;
    }
    
}