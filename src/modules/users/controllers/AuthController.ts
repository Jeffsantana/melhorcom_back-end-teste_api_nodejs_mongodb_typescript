import { Request, Response } from 'express'
import { sign, verify } from 'jsonwebtoken'
import { compare } from 'bcrypt';
import User from '../models/UsersModel';

require('dotenv').config();

const isEmailValid = (emailAdress: String) => {
    const EMAIL_REGEXP = /\S+@\S+\.\S+/;
    return !EMAIL_REGEXP.test(emailAdress);
}

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (params = {}) => {
    return sign({ params }, SECRET_KEY, {
        expiresIn: '7d',
    });
}
class AuthController {
    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } })
                .select('+password');

            if (isEmailValid(email)) {
                return res.status(400).send({ message: 'E-mail invalido!' });
            }

            if (!user.active) {
                return res.status(400).send({ message: 'Usuário inativo!' });
            }

            if (!(await compare(password, user.password))) {
                return res.status(401).send({ message: 'Usuário ou Senha inválidos!' });
            }

            user.password = undefined;

            return res.json({
                user,
                token: user.offline_access
                    ? generateToken({ _id: user._id })
                    : generateToken({ _id: user._id }),
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: 'Login Error, contact support!' });
        }
    }
    public async validate(req: Request, res: Response): Promise<Response> {
        try {
            const { token } = req.body;

            const check = verify(token, SECRET_KEY);

            if (!check) {
                return res.status(401).send({ auth: false, status: 'Token invalido!' });
            }

            const user = await User.findOne({ _id: check.params._id });

            if (!user) {
                return res
                    .status(401)
                    .send({ auth: false, status: 'Usuário não encontrado!' });
            }

            if (!user.active) {
                return res.status(401).send({ auth: false, status: 'Usuário inativo!' });
            }

            return res.send({ auth: true, status: 'Token valido!' });
        } catch (error) {
            return res
                .status(400)
                .send({ auth: false, status: 'Token mal formatado!' });
        }

    }


}

export default new AuthController();