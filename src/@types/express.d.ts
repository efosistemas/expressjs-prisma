import { User } from '../../prisma'

declare global {
	namespace Express {
		export interface Request {
			user: Partial<User>
		}
	}
}
