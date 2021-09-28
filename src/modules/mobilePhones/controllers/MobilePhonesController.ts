import { Request, Response } from 'express'
import MobilePhonesModel from '../models/MobilePhonesModel';
import ListMobilePhonesUseCase from '../useCases/ListMobilePhonesUseCase';

const startDateReference = new Date('25/12/2018'.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));

// Alfanumérico com no mínimo 2 e no máximo 255 caracteres, desprezando espaço em branco.
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



};

// Essa campo admite apenas os seguintes valores: BLACK, WHITE, GOLD, PINK.
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
};

// Número positivo
const onlyPositivePrice = (data: number, res: Response) => {
    const isPositive = Math.sign(data)
    if (isPositive !== 1) {
        return res.status(400).send({
            message:
                'Invalid price. Price need be a positive number. Please fill correct all the form fields and try again or contact support.',
        });

    } else {
        return data;
    }


};

// Data no formato “dd/MM/yyyy” (31/12/2018). A data de início deve ser posterior ao dia 25/12/2018.
const validStartDate = (data: string, res: Response) => {
    const validDate = new Date(data.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))
    if (!validDate || validDate < startDateReference) {
        return res.status(400).send({
            message:
                'Invalid date. Dates need be after 25/12/2018. Please fill correct all the form fields and try again or contact support.',
        });

    } else {
        return validDate;
    }

};

// Data no formato “dd/MM/yyyy” (31/12/2018). A data de fim deve ser posterior a data de início.
const validEndDate = (toStartDate: string, endDate: string, res: Response) => {
    const validDate = new Date(endDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))
    const startDate = validStartDate(toStartDate, res);
    if (!validDate || validDate < startDate) {
        return res.status(400).send({
            message:
                'Invalid date. End Date need be after start Date. Please fill correct all the form fields and try again or contact support.',
        });

    } else {
        return validDate;
    }

};

// Data no formato “dd/MM/yyyy”
const adequationDate = (data: string) => {

    if (data) {
        const date = new Date(data);
        const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
        const result = `${day}/${month}/${year}`;
        return result;
    }
};

const mobilePhoneFixedDate = (data: Any) => {
    const newMobilePhone = {
        model: data.model,
        color: data.color,
        startDate: adequationDate(data.startDate),
        endDate: adequationDate(data.endDate),
        price: data.price,
        brand: data.brand,
        code: data.code,
        _id: data._id,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    }
    return newMobilePhone;

};
class MobilePhonesController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {

            const model = onlyAlphanumeric(req.body.model, res);
            const price = onlyPositivePrice(req.body.price, res);
            const brand = onlyAlphanumeric(req.body.brand, res);
            const startDate = req.body.startDate ? validStartDate(req.body.startDate, res) : ''
            const endDate = req.body.endDate ? validEndDate(req.body.startDate, req.body.endDate, res) : ''
            const color = onlyColors(req.body.color, res);
            const {
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


        // console.log("🚀 ~ MobilePhonesController1 ~ mobilePhone.startDate", mobilePhone.startDate);
        // const startDate = mobilePhone.startDate;
        // mobilePhone.startDate = null;
        // mobilePhone.startDate = specificDate(startDate);
        // console.log("🚀 ~ MobilePhonesController ~ mobilePhone.startDate", mobilePhone.startDate);
        // mobilePhone.endDate ? mobilePhone.endDate = specificDate(mobilePhone.endDate) : ''
        const adaptMobilePhone = mobilePhoneFixedDate(mobilePhone);
        return res.json(adaptMobilePhone)
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