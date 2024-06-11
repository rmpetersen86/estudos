import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getPlace(app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .get('/places/:placeId', {
    schema: {
      params: z.object({
        placeId: z.string().uuid()
      }),
      response: {
        200: {
          place: z.object({
          id: z.string().uuid(),
          name: z.string(),
          location: z.string(),
          details: z.string().nullable(),
          materiaslAmount: z.number().int().nullable()
          })
        }
      }
    }
  }, async (request,reply) => {
    const { placeId } = request.params

    const place = await prisma.place.findUnique({
      select: {
        id: true,
        name: true,
        location: true,
        details: true,
        _count: {
          select: {
            materials: true
          }
        }
      },
      where: {
        id: placeId
      }
    })

    if (place === null) {
      throw new Error('Local não localizado')
    }
    try{
      return reply.send({ 
        place: {
          id: place.id,
          name: place.name,
          location: place.location,
          details: place.details,
          materiaslAmount: place._count.materials
        }
      })
    }catch(error: any){
      throw new Error('Erro de sistema', error)
    }    
  })
}

export async function getPlaces(app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .get('/places', async (request,reply) => {    

    const [places, total] = await Promise.all([
    prisma.place.findMany({
      select: {
        id: true,
        name: true,
        location: true,
        details: true,
        storage: true,
        _count: {
          select: {
            materials: true,
            equipment: true
          }
        }
      }
    }),
    prisma.place.count({})
  ])

    if (places === null) {
      throw new Error('Locais não localizados')
    }
    try{
      return reply.send({ 
        places: places.map(place => {          
          return {
            id: place.id,
            name: place.name,
            location: place.location,
            details: place.details,
            storage: place.storage.name,
            itemsAmount: place._count.materials + place._count.equipment          
          }
        }),
        total
      })
    }catch(error: any){
      throw new Error('Erro de sistema', error)
    }    
  })
}