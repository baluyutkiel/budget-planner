export interface Account {
    logo?: string;
    cardType?: CardType;
    bankName: string;
    limit?: number;
    balance: number;
}

export enum CardType {
    VISA = 'Visa',
    MASTERCARD = 'MasterCard',
    AMEX = 'American Express',
    DEBIT = 'Debit'
}