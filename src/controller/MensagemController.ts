import { Request, Response } from 'express'

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export class MensagemController {
	
	async create(req: Request, res: Response) {
		const { descricao, celular } = req.body

		if (!descricao) {
			return res.status(400).json({ message: 'Descrição é obrigatória' })
		}
		if (!celular) {
			return res.status(400).json({ message: 'Celular é obrigatório' })
		}

		try {
			const mensagem = await prisma.mensagem.create({
				data: {
				  descricao,
				  celular,
				  createdAt: new Date(),
				},
			  });
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		}
	}

	async list(req: Request, res: Response) {
		try {
			const mensagem = await prisma.mensagem.findMany({
				orderBy: { createdAt: "desc" },
			});
			
			res.json(mensagem);
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}
}
