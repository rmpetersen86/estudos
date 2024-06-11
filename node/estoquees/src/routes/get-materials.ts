import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getMaterials(app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .get('/materials', async (request,reply) => {    

    const materials = await prisma.material.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        model: true,
        brand: true,
        status: true,
        quantity: true,
        details: true,
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
      }      
    })

    if (materials === null) {
      throw new Error('Materiais não localizados')
    }

    return reply.send({ 
      materials/* : {
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