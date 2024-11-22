import { JwtPayload } from "jsonwebtoken";

export interface VerifyInput {
    error: Error | undefined;
    userId: string | undefined;
    isExpired: boolean;
}
