export type TransactionType = 'incoming' | 'outgoing';
export interface Transaction {
    tid: string;
    amount: number;
    description: string;
    date: Date;
    type: TransactionType;
}