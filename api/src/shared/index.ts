export interface TokenPayload {
    userId: string;
}

export interface VerifyTokenResult {
    error: Error | undefined;
    isExpired: boolean;
    data: TokenPayload | undefined;
}
