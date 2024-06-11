import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function removePlace(app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .delete('/places/:placeId', {
    schema: {
      params: z.object({
        placeId: z.string().uuid()
      })
    }
  }, async (request,reply) => {
    const { placeId } = request.params

    const place = await prisma.place.findUnique({
      where: {
        id: placeId
      }
    })

    if (place === null) {
      throw new Error('Local não foi encontrado')
    }

    await prisma.place.delete({
      where: {
        id: place.id
      }
    })

    return reply.status(201).send({message: 'ok'})
  })
}