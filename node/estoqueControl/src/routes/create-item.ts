import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";


export async function createItem(app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .post('/places/:placeId/items', {
    schema: {
      body: z.object({
        name: z.string(),
        type: z.string(),
        model: z.string(),
        brand: z.string(),
        ammount: z.coerce.number().int(),
        details: z.string().nullable()  
      }),
      params: z.object({
        placeId: z.string().uuid(),
      }),
      response: {
        201: z.object({
          itemId: z.number(),
        })
      },
    },
  }, async (request, reply) => {
    const {
      name,
      type,
      model,
      brand,
      ammount,
      details,      
    } = request.body

    const { placeId } = request.params    

    const item = await prisma.item.create({
      data: {
        name,
        type,
        model,
        brand,
        ammount,
        details,
        placeId        
      },
    })
  
    return reply.status(201).send({ itemId: item.id})    
  })  
}