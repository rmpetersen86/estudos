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
        select: {
          id: true,
          name: true,
          type: true,
          model: true,
          brand: true,
          status: true,
          serial: true,
          patrimony: true,
          contract: true,
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
      prisma.material.findMany({
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
            }
          }
        },       
        take: 10,
        skip: pageIndex * 10
      }),
      prisma.equipment.count({}),
      prisma.material.count({})
    ]) 

    if (equipments === null && materials === null) {
      throw new Error('Itens não localizados')
    }

    return reply.send({ 
      items : [
        ...equipments.map((equipment) => {
        return {
        id: equipment.id,
        name: equipment.name,
        type: equipment.type,
        model: equipment.model,
        brand: equipment.brand,
        status: equipment.status,
        serial: equipment.serial,
        patrimony: equipment.patrimony,
        contract: equipment.contract,
        details: equipment.details,
        place: equipment.place?.name,
        storage: equipment.place?.storage.name
        }
      }), 
      ...materials.map((material) => {
        return {
          id: material.id,
          name: material.name,
          type: material.type,
          model: material.model,
          brand: material.brand,
          status: material.status,          
          details: material.details,
          place: material.place?.name,
          storage: material.place?.storage.name
          }
      })],
      total: (totalEquipmens + totalMaterials)
     })
  })
}