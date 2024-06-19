import { ReceiptItem } from '../interfaces/receipt.interface'

export class ReceiptProcessorService{
    //Function to count alpha numeric characters in the input
    countAlphanumericCharacters(input: string): number {
        const alphanumericRegex = /^[a-z0-9]+$/i;
        let count = 0;
        for (const char of input) {
            if (alphanumericRegex.test(char)) {
                count++;
            }
        }
        return count;
    }

    //Function to check if input is a round dollar amount
    isRoundDollarAmount(amount: string): boolean {
        return Number.isInteger(parseFloat(amount));
    }

    //Function to check if input is a multiple of quarter
    isMultipleOfQuarter(amount: string): boolean {
        return parseFloat(amount) % 0.25 === 0;
    }

    //Function to calculate points based on number of items
    pointsForItemsNumber(itemsLength: number): number {
        return Math.floor(itemsLength / 2) * 5;
    }

    //Function to calculate points based on item description for all items
    pointsForItemsDescription(items: ReceiptItem[]): number {
        let points = 0;
        items.forEach(item => {
            if(item["shortDescription"] && item["price"]){
                if(item["shortDescription"].trim().length % 3 === 0){
                    points += Math.ceil(parseFloat(item["price"]) * 0.2);
                }
            }
        })
        return points;
    }

    //Function to calculate points based on purchase date
    pointsForPurchaseDate(dateString: string): number{
        const dateObject = new Date(dateString);
        if(isNaN(dateObject.getTime())) return 0;
        const date = dateObject.toISOString().split('T')[0];
        const day = parseInt(date.split('-')[2]);
        if(day%2===1) return 6;
        return 0;
    }

    //Function to check if time is after 2 PM (14:00) and before 4 PM (16:00)
    isTimeBetween2And4pm(timeStr: string): boolean {
        const [hoursStr, minutesStr] = timeStr.split(':');
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);
    
        if (hours > 14 && hours < 16) {
            return true;
        } else if (hours === 14 && minutes > 0) {
            return true;
        } else if (hours === 15 && minutes < 60) {
            return true;
        } else {
            return false;
        }
    }    

    //Function to calculate points based on purchase time
    pointsForPurchaseTime(timeStr: string): number{
        if(this.isTimeBetween2And4pm(timeStr)) return 10
        return 0
    }

    //Function to calculate overall points for the receipt
    calculatePoints(req: any): number{
       let points = 0;
       if(req["retailer"]) points += this.countAlphanumericCharacters(req["retailer"])
       if(req["total"] && this.isRoundDollarAmount(req["total"])) points+=50
       if(req["total"] && this.isMultipleOfQuarter(req["total"])) points+=25
       if(req["items"] && Array.isArray(req["items"])){
            points += this.pointsForItemsNumber(req["items"].length)
            points += this.pointsForItemsDescription(req["items"])
       }
       if(req["purchaseDate"]){
            points+=this.pointsForPurchaseDate(req["purchaseDate"])
       }
       if(req["purchaseTime"]){
            points+=this.pointsForPurchaseTime(req["purchaseTime"])
       }
       return points
    }
}