declare namespace Express {
    interface Request {
        admin: {
            username: string;
            id: number;
        };
        user: {
            username: string;
            id: number;
        };
    }
}
