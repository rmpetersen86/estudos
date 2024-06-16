import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";


export async function createStorage(app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .post('/storages', {
    schema: {
      body: z.object({
        name: z.string(),
        location: z.string(),
        details: z.string().nullable()
      }),
      response: {
        201: z.object({
          storageId: z.number(),
          message: z.string()
        })
      },
    },
  }, async (request, reply) => {
    const {
      name,
      location,
      details,
    } = request.body

    const storage = await prisma.storage.create({
      data: {
        name,
        location,
        details,
      },
    })
  
    return reply.status(201).send({ storageId: storage.id, message: 'ok' })
  })  
}