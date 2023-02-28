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
}
