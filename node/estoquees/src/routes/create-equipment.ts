import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";


export async function createEquipment(app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .post('/places/:placeId/equipments', {
    schema: {
      body: z.object({
        name: z.string(),
        type: z.string(),
        model: z.string(),
        brand: z.string(),
        serial: z.string(),
        status: z.string(),
        patrimony: z.string().nullable(),
        contract: z.string().nullish(),        
        details: z.string().nullable(),
        movementId: z.string().nullish()
      }),
      params: z.object({
        placeId: z.string().uuid(),
      }),
      response: {
        201: z.object({
          equipmentId: z.string().uuid(),
        })
      },
    },
  }, async (request, reply) => {
    const {
      name,
      type,
      model,
      brand,
      serial,
      status,
      patrimony,
      contract,      
      details,
      movementId
    } = request.body

    const { placeId } = request.params    

    const equipment = await prisma.equipment.create({
      data: {
        name,
        type,
        model,
        brand,
        serial,        
        status,
        patrimony,
        contract,  
        details,
        placeId        
      },
    })
  
    return reply.status(201).send({ equipmentId: equipment.id})    
  })  
}