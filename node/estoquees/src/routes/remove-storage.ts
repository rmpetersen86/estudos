import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function removeStorage(app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .delete('/storages/:storageId', {
    schema: {
      params: z.object({
        storageId: z.coerce.number().int()
      })
    }
  }, async (request,reply) => {
    const { storageId } = request.params

    const storage = await prisma.storage.findUnique({
      where: {
        id: storageId
      }
    })

    if (storage === null) {
      throw new Error('Estoque não localizado')
    }

    await prisma.storage.delete({
      where: {
        id: storage.id
      }
    })

    return reply.status(201).send({message: 'ok'})
  })
}