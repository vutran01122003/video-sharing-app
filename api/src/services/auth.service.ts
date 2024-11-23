import jwt, { JwtPayload, TokenExpiredError, verify } from "jsonwebtoken";
import fs from "fs";
import { TokenPayload, VerifyTokenResult } from "../shared";

class AuthService {
    static async signToken(userId: string): Promise<string> {
        try {
            const privateKey: string = fs.readFileSync(__dirname + "../../../keys/privateKey.pem", {
                encoding: "utf-8"
            });

            const token: string = await jwt.sign({ userId }, privateKey, {
                algorithm: "RS512",
                expiresIn: "2h"
            });

            return token;
        } catch (error) {
            throw error;
        }
    }

    static async verifyToken(token: string): Promise<VerifyTokenResult> {
        return new Promise((resolve, reject) => {
            try {
                const privateKey: string = fs.readFileSync(__dirname + "../../../keys/publickey.crt", {
                    encoding: "utf-8"
                });

                jwt.verify(token, privateKey, (err, data): void => {
                    if (err)
                        resolve({
                            isExpired: err instanceof TokenExpiredError,
                            error: err,
                            data: undefined
                        });

                    resolve({
                        isExpired: false,
                        error: undefined,
                        data: data as TokenPayload
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default AuthService;
