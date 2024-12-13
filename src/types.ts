export interface Transaction {
  hash: string;
  amount: number;
  timestamp: number;
  position: [number, number, number];
}

interface TransactionInput {
  prev_out: {
    addr: string;
    value: number;
  };
}

interface TransactionOutput {
  addr: string;
  value: number;
}

export interface TransactionDetails extends Transaction {
  inputs?: TransactionInput[];
  outputs?: TransactionOutput[];
  size?: number;
  weight?: number;
  fee?: number;
  relayed_by?: string;
}