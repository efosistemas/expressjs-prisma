import { Request, Response } from 'express'
import { BadRequestError } from '../helpers/api-erros'

import { PrismaClient } from "@prisma/client";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();


export class UserController {
	
	async create(req: Request, res: Response) {
		const { name, email, password } = req.body

		if (!email) {
			throw new BadRequestError('O email é obrigatório');
		}
		if (!password) {
			throw new BadRequestError('A senha é obrigatória');
		}

		const userExists = await prisma.user.findFirst({where: {email: email}});

		if (userExists) {
			throw new BadRequestError('Email já cadastrado');
		}

		const hashPassword = await bcrypt.hash(password, 10)

		const newUser = await prisma.user.create({
			data: {
			  name,
			  email,
			  password: hashPassword,
			  createdAt: new Date(),
			},
		  });

	  	const { password: _, ...user } = newUser
	  	res.json(user);
	}

	async list(req: Request, res: Response) {
		const user = await prisma.user.findMany({
			select: {
				password: false,
				name: true,
				email: true
			},
			orderBy: [
				{
					createdAt: 'desc',
				},
			]
			});
			res.json(user);
	}

	async login(req: Request, res: Response) {
		const { email, password } = req.body

		const user = await prisma.user.findFirst({ where: { email: email }});

		if (!user) {
			throw new BadRequestError('Email/Senha inválidos');
		}

		const verifyPass = await bcrypt.compare(password, user.password)

		if (!verifyPass) {
			throw new BadRequestError('Email/Senha inválidos');
		}

		const token = jwt.sign({ id: user?.id }, process.env.JWT_PASS ?? '', {
			expiresIn: '8h',
		})

		const { password: _, ...userLogin } = user

		return res.json({
			user: userLogin,
			token: token,
		})
	}
	
	async getProfile(req: Request, res: Response) {
		return res.json(req.user)
	}

}
