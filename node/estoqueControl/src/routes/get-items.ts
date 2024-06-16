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

    const [items, total] = await Promise.all([
      prisma.item.findMany({        
        select: {
          id: true,
          name: true,
          type: true,
          model: true,
          brand: true,
          details: true,
          place: {
            select: {
              name: true,
              storage: {
                select: {
                  name: true
                }
              }
            }
          }
        },        
        take: 10,
        skip: pageIndex * 10
      }),
      prisma.item.count({})
    ]) 

    if (items === null) {
      throw new Error('Itens não localizados')
    }

    return reply.send({ 
      items : [
        ...items.map((item) => {
        return {
        id: item.id,
        name: item.name,
        type: item.type,
        model: item.model,
        brand: item.brand,
        details: item.details,
        place: item.place?.name,
        storage: item.place?.storage.name
        }
        })
      ],
      total: total
     })
  })
}