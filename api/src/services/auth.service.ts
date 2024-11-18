import jwt from "jsonwebtoken";
import fs from "fs";

class AuthService {
    static async signToken(userId: string): Promise<string> {
        try {
            const privateKey: string = fs.readFileSync(__dirname + "../../../keys/privateKey.pem", {
                encoding: "utf-8"
            });

            const token: string = await jwt.sign(
                {
                    _id: userId
                },
                privateKey,
                {
                    algorithm: "RS512",
                    expiresIn: "2h"
                }
            );

            return token;
        } catch (error) {
            throw error;
        }
    }

    static async verifyToken(token: string) {
        try {
            const privateKey: string = fs.readFileSync(__dirname + "../../../keys/publickey.crt", {
                encoding: "utf-8"
            });
            const decode = await jwt.verify(token, privateKey);

            return decode;
        } catch (error) {
            throw error;
        }
    }
}

export default AuthService;
