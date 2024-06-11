import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";


export async function createMaterial(app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .post('/places/:placeId/materials', {
    schema: {
      body: z.object({
        name: z.string(),
        type: z.string(),
        model: z.string(),
        brand: z.string(),
        status: z.string(),
        quantity: z.number().int(),
        details: z.string().nullable(),
        movementId: z.string().nullish()
      }),
      params: z.object({
        placeId: z.string().uuid(),
      }),
      response: {
        201: z.object({
          materialId: z.number(),
        })
      },
    },
  }, async (request, reply) => {
    const {
      name,
      type,
      model,
      brand,
      status,
      quantity,
      details,
      movementId
    } = request.body

    const { placeId } = request.params    

    const material = await prisma.material.create({
      data: {
        name,
        type,
        model,
        brand,
        status,
        quantity,
        details,
        placeId,
        movementId
      },
    })
  
    return reply.status(201).send({ materialId: material.id})    
  })  
}