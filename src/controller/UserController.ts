import { Request, Response } from 'express'

import { PrismaClient } from "@prisma/client";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();


export class UserController {
	
	async create(req: Request, res: Response) {
		const { name, email, password } = req.body

		if (!name) {
			return res.status(400).json({ message: 'Nome é obrigatório' })
		}
		if (!email) {
			return res.status(400).json({ message: 'Email é obrigatório' })
		}
		if (!password) {
			return res.status(400).json({ message: 'Senha é obrigatória' })
		}

		try {
			const user = await prisma.user.create({
				data: {
				  name,
				  email,
				  password,
				  createdAt: new Date(),
				},
			  });
			  res.json(user);
		} catch (error) {
			return res.status(500).json({ message: 'Internal Server Error' })
		}
	}

	async list(req: Request, res: Response) {
		try {
			const user = await prisma.user.findMany({
				orderBy: { createdAt: "desc" },
			});
			
			res.json(user);
		} catch (error) {
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}

	async login(req: Request, res: Response) {
		const { email, password } = req.body

		const user = await prisma.user.findFirst({
			where: {
			  email: email,
			},
		  });

		const token = jwt.sign({ id: user?.id }, process.env.JWT_PASS ?? '', {
			expiresIn: '8h',
		})


		return res.json({
			user: user,
//			token: token,
		})
	}

}
