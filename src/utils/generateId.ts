import { v4 as uuidv4 } from 'uuid';

export class IdGenerator{
    generateUniqueID(): string {
        return uuidv4();
    }
}