import { Request, Response } from 'express'
import MobilePhonesModel from '../models/MobilePhonesModel';
import ListMobilePhonesUseCase from '../useCases/ListMobilePhonesUseCase';

const onlyAlphanumeric = (data: String, res: Response) => {
    // Alfanumérico com no mínimo 2 e no máximo 255 caracteres, desprezando espaço em branco.
    const verify = new RegExp(/^([a-zA-Z0-9 _-]+)$/)
    // Remover os espaços em branco e depois contar
    const withOutWhiteSpaces = data.replace(/\s/g, '')
    const success = verify.exec(data);
    if (!success) {
        return res.status(400).send({
            message:
                'Only Alphanumeric fields are accepted. Please fill correct all the form fields and try again or contact support.',
        });
    }
    if (withOutWhiteSpaces.length > 255) {
        return res.status(400).send({
            message:
                'Only expressions under 255 characters are accepted. Please fill correct all the form fields and try again or contact support.',
        });
    } else {
        return success[0]
    }



}

const onlyColors = (data: String, res: Response) => {
    switch (data) {
        case 'BLACK':
            return data.toUpperCase()
            break;
        case 'WHITE':
            return data.toUpperCase()
            break;
        case 'GOLD':
            return data.toUpperCase()
            break;
        case 'PINK':
            return data.toUpperCase()
            break;
        default:
            return res.status(400).send({
                message:
                    'Invalid expression. Only Colors accepted is: BLACK, WHITE, GOLD or PINK. Please fill correct all the form fields and try again or contact support.',
            });

    }
}
class MobilePhonesController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const model = onlyAlphanumeric(req.body.model, res);
            const color = onlyColors(req.body.color, res);
            const startDate = req.body.startDate ? new Date(req.body.startDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")) : ''
            const endDate = req.body.endDate ? new Date(req.body.endDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")) : ''
            const {
                price,
                brand,
                code,
            } = req.body;

            if (!code) {
                return res.status(400).send({
                    message:
                        'Missing form data. Please fill all the form fields and try again or contact support.',
                });
            }
            if (await MobilePhonesModel.findOne({ code })) {
                return res
                    .status(400)
                    .send({ message: 'this code already registered.' });
            }
            const mobilePhone = await MobilePhonesModel.create({
                model,
                color,
                startDate,
                price,
                brand,
                endDate,
                code,
            });

            return res.status(201).json(mobilePhone);
        } catch (err) {
            return res.status(400).send({
                message: 'Error when creating mobilePhone. Please try again or contact support.',
            });
        }
    };

    public async read(req: Request, res: Response): Promise<Response> {
        const mobilePhone = await MobilePhonesModel.findOne({ _id: req.params.id });
        if (!mobilePhone) {
            return res.status(400).send({
                message:
                    'Mobile phone not found. Try again or contact support.',
            });
        }
        return res.json(mobilePhone)
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const model = onlyAlphanumeric(req.body.model, res);
            const color = onlyColors(req.body.color, res);
            const startDate = req.body.startDate ? new Date(req.body.startDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")) : ''
            const endDate = req.body.endDate ? new Date(req.body.endDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")) : ''
            const {
                price,
                brand,
                code,
            } = req.body;

            if (!code) {
                return res.status(400).send({
                    message:
                        'Missing form data. Please fill all the form fields and try again or contact support.',
                });
            }
            if (await MobilePhonesModel.findOne({ _id: { $ne: req.params.id }, code })) {
                return res
                    .status(400)
                    .send({ message: 'This code already registered.' });
            }
            const mobilePhone = await MobilePhonesModel.findOneAndUpdate(
                { _id: req.params.id },
                {
                    model,
                    price,
                    brand,
                    startDate,
                    endDate,
                    color,
                    code
                },
                { new: true }
            );

            return res.status(204).send();

        } catch (err) {
            return res.status(400).send({
                message: 'Error when updating Mobile Phone. Please try again or contact support.',
            });
        }
    };

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const mobilePhone = await MobilePhonesModel.findByIdAndDelete(req.params.id);
            return res.send(mobilePhone);
        } catch (err) {
            return res.status(400).send({
                message: 'Error deleting Mobile Phone. Please try again or contact support.',
            });
        }
    };

    public async list(req: Request, res: Response): Promise<Response> {
        const mobilePhones = await ListMobilePhonesUseCase.execute(req)
        return res.json(mobilePhones)
    };

}

export default new MobilePhonesController()