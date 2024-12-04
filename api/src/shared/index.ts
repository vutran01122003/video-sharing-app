export interface TokenPayload {
    userId: string;
}

export interface VerifyTokenResult {
    error: Error | undefined;
    isExpired: boolean;
    data: TokenPayload | undefined;
}

export interface UserFilterData {
    user_name?: Object | undefined;
    _id?: Object | undefined;
}
