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

    }
}

export default new ListMobilePhonesUseCase()