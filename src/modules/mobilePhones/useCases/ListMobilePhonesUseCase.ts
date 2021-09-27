import { Request } from 'express';
import MobilePhonesModel from '../models/MobilePhonesModel';
import { PaginateResult } from 'mongoose';

class ListMobilePhonesUseCase {
    async execute(req: Request): Promise<PaginateResult<typeof MobilePhonesModel>> {
        const { page, limit } = req.query;
        const filters: any = {};
        const options: any = {};
        page ? options.page = page : options.page = 1
        limit ? options.limit = limit : options.limit = 1
        if (req.query.search) {
            if (!filters.$or) filters.$or = [];
            // @ts-ignore
            const searchKeys = req.query.search?.split(' ');
            searchKeys.forEach((key: any) => {
                filters.$or.push({ model: new RegExp(key, 'i') });
                filters.$or.push({ price: new RegExp(key, 'i') });
                filters.$or.push({ brand: new RegExp(key, 'i') });
                filters.$or.push({ color: new RegExp(key, 'i') });
            });
        }

        const mobilePhones = MobilePhonesModel.paginate(filters, options)
        return mobilePhones;

    }
}

export default new ListMobilePhonesUseCase()