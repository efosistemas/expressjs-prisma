import { Request, Response } from 'express'
import { BadRequestError } from '../helpers/api-erros'

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export class MensagemController {
	
	async create(req: Request, res: Response) {
		const { descricao, celular } = req.body

		if (!descricao) {
			throw new BadRequestError('Descrição é obrigatória');
		}
		if (!celular) {
			throw new BadRequestError('Celular é obrigatório');
		}

		const mensagem = await prisma.mensagem.create({
			data: {
			  	descricao,
				celular,
				createdAt: new Date(),
			},
		});
		res.json(mensagem);
	}

	async list(req: Request, res: Response) {
		const mensagem = await prisma.mensagem.findMany({ orderBy: { createdAt: "desc" }});
		res.json(mensagem);
	}
}
