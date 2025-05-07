export interface Account {
    _id?: string,
    logo?: string;
    cardType?: CardType;
    bankName: string;
    limit: number;
    balance: number;
    name?: string;
}

export enum CardType {
    VISA = 'Visa',
    MASTERCARD = 'MasterCard',
    AMEX = 'American Express',
    CHEQUING = 'Chequing',
    SAVINGS = 'Savings'
}