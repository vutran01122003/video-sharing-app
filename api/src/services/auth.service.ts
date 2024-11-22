import jwt, { TokenExpiredError, verify } from "jsonwebtoken";
import fs from "fs";
import { VerifyInput } from "../shared";

class AuthService {
    static async signToken(userId: string): Promise<string> {
        try {
            const privateKey: string = fs.readFileSync(__dirname + "../../../keys/privateKey.pem", {
                encoding: "utf-8"
            });

            const token: string = await jwt.sign(userId, privateKey, {
                algorithm: "RS512",
                expiresIn: "2h"
            });

            return token;
        } catch (error) {
            throw error;
        }
    }

    static async verifyToken(token: string): Promise<VerifyInput> {
        return new Promise((resolve, reject) => {
            try {
                const privateKey: string = fs.readFileSync(__dirname + "../../../keys/publickey.crt", {
                    encoding: "utf-8"
                });

                jwt.verify(token, privateKey, (err, userId): void => {
                    if (err)
                        resolve({
                            isExpired: err instanceof TokenExpiredError,
                            error: err,
                            userId: undefined
                        });

                    resolve({
                        isExpired: false,
                        error: undefined,
                        userId: userId as string
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default AuthService;
