import * as cors from 'cors';
import * as express from 'express';
import {
  getDistinctCategories,
  getProducts,
  getProductById,
  getProductsByCategory
} from './db-auction';

import {
  getDistinctWorldTypes,
  getWorlds,
  getWorldById,
  getWorldsByType
} from './db-worlds';

export const router = express.Router();

router.use(cors());

router.get('/products', async (req: express.Request, res: express.Response) => {
  res.json(await getProducts(req.query));
});

router.get('/products/:productId', async (req: express.Request, res: express.Response) => {
  const productId = parseInt(req.params.productId, 10) || -1;
  res.json(await getProductById(productId));
});

router.get('/categories', async (_, res: express.Response) => {
  res.json(await getDistinctCategories());
});

router.get('/categories/:category', async (req: express.Request, res: express.Response) => {
  res.json(await getProductsByCategory(req.params.category));
});

/////////////worlds/////////////////
router.get('/worlds', async (req: express.Request, res: express.Response) => {
  res.json(await getWorlds(req.query));
});

router.get('/worlds/:worldId', async (req: express.Request, res: express.Response) => {
  const worldId = parseInt(req.params.worldId, 10) || -1;
  res.json(await getWorldById(worldId));
});

router.get('/worldTypes', async (_, res: express.Response) => {
  res.json(await getDistinctWorldTypes());
});

router.get('/worldTypes/:type', async (req: express.Request, res: express.Response) => {
  res.json(await getWorldsByType(req.params.type));
});