import { Router } from 'express';
const route = Router();

import * as homeController from '../controller/home-controller';

route.get('/', homeController.home);

export default route;
