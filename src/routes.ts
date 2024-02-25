import { Router } from 'express'
import { UserController } from './controller/UserController'
import { MensagemController } from './controller/MensagemController'
import { authMiddleware } from './middlewares/authMiddleware'

const routes = Router()

routes.post('/user', new UserController().create)
routes.post('/login', new UserController().login)

routes.use(authMiddleware)
routes.get('/profile', new UserController().getProfile)

routes.get('/users', new UserController().list)
routes.post('/mensagem', new MensagemController().create)
routes.get('/Mensagens', new MensagemController().list)

export default routes
