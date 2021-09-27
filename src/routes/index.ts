import { Router } from 'express'
import MobilePhoneRoutes from '../modules/mobilePhones/routes';
import UserRoutes from '../modules/users/routes';
const routes = Router();

routes.use(UserRoutes)
routes.use(MobilePhoneRoutes);

routes.get('/', (req, res) => {
    return res.send('Hello World routes');
})


export default routes;