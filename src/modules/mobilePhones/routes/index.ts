import { Router } from 'express'
import MobilePhonesController from '../controllers/MobilePhonesController'

const MobilePhoneRoutes = Router()

MobilePhoneRoutes.post('/phone', MobilePhonesController.create);
MobilePhoneRoutes.get('/phone/:id', MobilePhonesController.read);
MobilePhoneRoutes.put('/phone/:id', MobilePhonesController.update);
MobilePhoneRoutes.delete('/phone/:id', MobilePhonesController.delete);


export default MobilePhoneRoutes;
