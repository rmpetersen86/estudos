import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";


export async function createPlace(app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .post('/storages/:storageId/places', {
    schema: {
      body: z.object({
        name: z.string().min(4),
        location: z.string(),
        details: z.string().nullable(),        
      }),
      params: z.object({
        storageId: z.coerce.number().int()
      }),
      response: {
        201: z.object({
          placeId: z.string(),
        })
      },
    },
  }, async (request, reply) => {
    const {
      name,
      location,
      details,      
    } = request.body

    const {storageId} = request.params

    const place = await prisma.place.create({
      data: {
        name,
        location,
        details,
        storageId
      },
    })
  
    return reply.status(201).send({ placeId: place.id})
  })  
}