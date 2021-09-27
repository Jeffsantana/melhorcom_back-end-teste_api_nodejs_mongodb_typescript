import express, { NextFunction, Request, Response } from 'express'
import routes from './src/routes'
import { AppError } from './shared/AppError';
import database from './src/config/mongoose'

const app = express();

app.use(express.json())

app.use(routes)
database.mongoConnect()

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        });

    };

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    });
})

export { app }
