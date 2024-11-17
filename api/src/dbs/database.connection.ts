import mongoose, { type Connection } from "mongoose";

class Database {
    connection!: Connection;
    static instance: Database;

    constructor() {
        this.connect();
    }

    public getInstance(): Database {
        if (Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }

    public connect(): void {
        this.connection = mongoose.createConnection("mongodb://localhost:27017/video_sharing_app");

        this.connection.on("connected", () => {
            console.log("MongoDB connected");
        });

        this.connection.on("error", (error) => {
            console.log(error);
        });
    }

    public getConnection(): Connection {
        return this.connection;
    }

    public disconnect(): void {
        if (this.connection) this.connection.close();
    }
}

export default new Database();
