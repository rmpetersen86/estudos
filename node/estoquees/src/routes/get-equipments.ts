import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z, { number } from "zod";
import { prisma } from "../lib/prisma";

export async function getEquipments(app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .get('/equipments', {
    schema: {
      querystring: z.object({
        query: z.string().nullish(),
        pageIndex: z.string().nullable().default('0').transform(Number),
      })
    }
  }, async (request,reply) => {

    const { pageIndex, query } = request.query

    const [equipments, total] = await Promise.all([
      prisma.equipment.findMany({
        select: {
          id: true,
          name: true,
          type: true,
          model: true,
          brand: true,
          status: true,
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
        where: query? {
          patrimony: {
            contains: query
          }
        } 
        : {},
        take: 10,
        skip: pageIndex * 10
      }),
      prisma.equipment.count({
        where: query ? {
          patrimony: {
            contains: query
          }
        } : {}
        })      
    ]) 

    if (equipments === null) {
      throw new Error('Equipamentos não localizados')
    }

    return reply.send({ 
      equipments: equipments.map(equipment => {
        return {
          id: equipment.id,
        name: equipment.name,
        type: equipment.type,
        model: equipment.model,
        brand: equipment.brand,
        status: equipment.status,        
        details: equipment.details,
        place: equipment.place?.name,
        storage: equipment.place?.storage.name
        }
      }),
      total,
     })
  })
}