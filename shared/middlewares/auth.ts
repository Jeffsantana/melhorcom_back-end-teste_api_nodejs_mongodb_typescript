import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken'
import UsersModel from "../../src/modules/users/models/UsersModel";
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

export const Auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        const authHeader = authorization || req.query.token;

        if (!authHeader) {
            return res.status(403).send({ error: 'No token provided' });
        }
        const parts = authHeader.split(' ');

        if (!parts.length === 2) {
            return res.status(401).send({ error: 'Token error' });
        }
        const [bearer, token] = parts;

        if (!/^Bearer$/i.test(bearer)) {
            return res.status(401).send({ error: 'Token malformatted' });
        }
        verify(token, SECRET_KEY, async (error, decoded) => {
            if (error) return res.status(401).send({ error: 'Token invalid' });

            const user = UsersModel.findById(decoded.params._id)
            req.user = user;

        });

    } catch (error) {
        res.status(401).send();
        return;
    }

    next();
};