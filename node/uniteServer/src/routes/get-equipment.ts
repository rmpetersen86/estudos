import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getEquipment(app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .get('/equipments/:equipmentId', {
    schema: {
      params: z.object({
        equipmentId: z.string()
      })
    }
  }, async (request,reply) => {
    const { equipmentId } = request.params

    const equipment = await prisma.equipment.findUnique({
      /* select: {        
        place: {
          select: {
            name: true,
            storage: {
              select: {
                name: true
              }
            }
          },

        }
      }, */
      where: {
        id: equipmentId
      }
    })

    if (equipment === null) {
      throw new Error('Material não localizado')
    }

    return reply.send({ 
      equipment/* : {
        id: material.id,
        name: material.id,
        type: material.id,
        model: material.model,
        brand: material.brand,
        status: material.status,
        quantity: material.quantity,
        details: material.details,
        place: material.place.name,
        storage: material.place.storage.name
      } */
     })
  })
}