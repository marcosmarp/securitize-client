export interface ApiError {
    error: string;
    message: string;
    statusCode: number;
}

export interface AuditableEntity {
    id: string;
}

export interface Wallet extends AuditableEntity {
    address: string;
    favorite: boolean;
    balance: number;
    isOld: boolean;
    balanceInUsd: number;
    balanceInEur: number;
}

export interface ExchangeRate extends AuditableEntity {
    source: string;
    rate: number;
}
