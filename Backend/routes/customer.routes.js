import { Router } from 'express'

import { 
  getCustomers, 
  searchCustomers 
} from '../controllers/customers/index.js' 

const router = Router()

router.get('/customers', getCustomers)

router.get('/customers/search', searchCustomers) 

export default router