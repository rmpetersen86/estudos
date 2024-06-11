import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getMaterial(app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .get('/materials/:materialId', {
    schema: {
      params: z.object({
        materialId: z.coerce.number().int()
      })
    }
  }, async (request,reply) => {
    const { materialId } = request.params

    const material = await prisma.material.findUnique({
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
      },
      where: {
        id: materialId
      }
    })

    if (material === null) {
      throw new Error('Material não localizado')
    }

    return reply.send({ 
      material: {
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
      }
     })
  })
}