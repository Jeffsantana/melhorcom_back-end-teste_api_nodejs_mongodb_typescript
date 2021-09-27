import { Router } from 'express'
import UserRoutes from '../modules/users/routes';
const routes = Router();

routes.use(UserRoutes)

routes.get('/', (req, res) => {
    return res.send('Hello World routes');
})


export default routes;