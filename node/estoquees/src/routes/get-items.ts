import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getItems(app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .get('/items', {
    schema: {
      querystring: z.object({        
        pageIndex: z.string().nullable().default('0').transform(Number),
      })
    }
  }, async (request,reply) => {

    const { pageIndex } = request.query

    const [equipments, materials, totalEquipmens, totalMaterials] = await Promise.all([
      prisma.equipment.findMany({        
        take: 10,
        skip: pageIndex * 10
      }),
      prisma.material.findMany({        
        take: 10,
        skip: pageIndex * 10
      }),
      prisma.equipment.count({}),
      prisma.material.count({})
    ]) 

    if (equipments === null) {
      throw new Error('Equipamentos não localizados')
    }

    return reply.send({ 
      items : [...equipments, ...materials],
      total: (totalEquipmens + totalMaterials)
     })
  })
}