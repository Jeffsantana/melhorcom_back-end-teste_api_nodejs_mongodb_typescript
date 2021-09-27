import { hash } from 'bcrypt';
import { Request, Response } from 'express'
import User from '../models/UsersModel';
import ListUsersUseCase from '../useCases/ListUsersUseCase';

class UserController {
    public async read(req: Request, res: Response): Promise<Response> {
        const user = await User.findOne({ _id: req.params.id });
        return res.json(user)
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, roles, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).send({
                    message:
                        'Missing form data. Please fill all the form fields and try again or contact support.',
                });
            }
            if (await User.findOne({ email })) {
                return res
                    .status(400)
                    .send({ message: 'Email already registered.' });
            }
            const user = await User.create(req.body);
            user.password = undefined
            return res.status(201).json(user);
        } catch (err) {
            return res.status(400).send({
                message: 'Error when creating user. Please try again or contact support.',
            });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, active, phone_number } = req.body;

            if (!name || !email) {
                return res.status(400).send({
                    message:
                        'Missing form data. Please fill all the form fields and try again or contact support.',
                });
            }
            if (await User.findOne({ _id: { $ne: req.params.id }, email })) {
                return res
                    .status(400)
                    .send({ message: 'Email already registered.' });
            }
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                {
                    active,
                    name,
                    email,
                    phone_number,
                },
                { new: true }
            );

            return res.status(204).send();



        } catch (err) {
            return res.status(400).send({
                message: 'Error when updating user. Please try again or contact support.',
            });
        }
    }

    public async upgrade(req: Request, res: Response): Promise<Response> {
        try {
            const _id = req.params.id;
            const { email } = req.body;
            const userUpgrade = {
                active: req.body.active,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password?.length ? await hash(req.body.password, 10) : undefined,
                profile: req.body.profile,
                phone_number: req.body.phone_number,
            };


            if (await User.findOne({ _id: { $ne: req.params.id }, email })) {
                return res
                    .status(400)
                    .send({ message: 'Email already registered.' });
            }
            const user = await User.findOneAndUpdate(
                { _id },
                {
                    $set: userUpgrade
                },
                { upsert: true, new: true }
            );

            return res.status(204).send();



        } catch (err) {
            return res.status(400).send({
                message: 'Error when updating user. Please try again or contact support.',
            });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            return res.send(user);
        } catch (err) {
            return res.status(400).send({
                message: 'Error deleting user. Please try again or contact support.',
            });
        }
    }

    public async list(req: Request, res: Response): Promise<Response> {
        const users = await ListUsersUseCase.execute(req)
        return res.json(users)
    }


}

export default new UserController()