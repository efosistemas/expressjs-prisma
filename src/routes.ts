import { Router } from 'express'
import { UserController } from './controller/UserController'
import { MensagemController } from './controller/MensagemController'

const routes = Router()

routes.post('/user', new UserController().create)
routes.get('/users', new UserController().list)

routes.post('/mensagem', new MensagemController().create)
routes.get('/Mensagens', new MensagemController().list)

export default routes
