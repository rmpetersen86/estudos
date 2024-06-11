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