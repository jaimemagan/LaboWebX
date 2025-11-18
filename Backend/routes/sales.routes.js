
import { Router } from 'express'

import { 
  createSale, 
  getSales, 
  getSalesReport 
} from '../controllers/sales/index.js' 

const router = Router()

router.post('/sales', createSale)
router.get('/sales', getSales)


router.get('/sales/report', getSalesReport) 

export default router