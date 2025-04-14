import { Router } from 'express'

import Traktor from './Traktor'

const router = Router()

router.use('/Traktor', Traktor)

export default router 