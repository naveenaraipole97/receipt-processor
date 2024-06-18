import { ReceiptItem } from '../interfaces/receipt.interface'

export class ReceiptProcessorService{
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
    isRoundDollarAmount(amount: string): boolean {
        return Number.isInteger(parseFloat(amount));
    }
    isMultipleOfQuarter(amount: string): boolean {
        return parseFloat(amount) % 0.25 === 0;
    }
    pointsForItemsNumber(itemsLength: number): number {
        return Math.floor(itemsLength / 2) * 5;
    }
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
    pointsForPurchaseDate(dateString: string): number{
        const dateObject = new Date(dateString);
        if(isNaN(dateObject.getTime())) return 0;
        const date = dateObject.toISOString().split('T')[0];
        const day = parseInt(date.split('-')[2]);
        if(day%2===1) return 6;
        return 0;
    }
    isTimeBetween2And4pm(timeStr: string): boolean {
        // Extract hours and minutes from the time string
        const [hoursStr, minutesStr] = timeStr.split(':');
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);
    
        // Check if the time is after 2 PM (14:00) and before 4 PM (16:00)
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
    pointsForPurchaseTime(timeStr: string): number{
        if(this.isTimeBetween2And4pm(timeStr)) return 10
        return 0
    }
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