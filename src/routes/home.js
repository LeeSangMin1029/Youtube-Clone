import { Router } from 'express';

import * as homeController from '../controller/home-controller';

const route = Router();
route.get('/', homeController.renderMain);

export default route;
