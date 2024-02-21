import { Router } from 'express'
import { MensagemController } from './controller/MensagemController'

const routes = Router()

routes.post('/mensagem', new MensagemController().create)
routes.get('/Mensagens', new MensagemController().list)

export default routes
