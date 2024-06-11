import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getStorage(app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .get('/storages/:storageId', {
    schema: {
      params: z.object({
        storageId: z.coerce.number().int()
      })
    }
  }, async (request,reply) => {
    const { storageId } = request.params

    const storage = await prisma.storage.findUnique({
      where: {
        id: storageId
      }
    })

    if (storage === null) {
      throw new Error('Estoque não localizado')
    }

    return reply.send({ storage })
  })
}

export async function getStorages(app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .get('/storages', async (request,reply) => {    

    const [storages, total] = await Promise.all([
    prisma.storage.findMany({}),
    prisma.storage.count({})   
    ])    
    if (storages === null) {
      throw new Error('Estoque não localizado')
    }   

    return reply.send({ storages, total })
  })
}

export async function getStoragePlaces(app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider>()
  .get('/storages/:storageId/places', {
    schema: {
      params: z.object({
        storageId: z.coerce.number().int()
      }),
      /* response: {
        200: {
          place: z.object({
          id: z.string().uuid(),
          name: z.string(),
          location: z.string(),
          details: z.string().nullable(),
          materiaslAmount: z.number().int().nullable()
          })
        }
      } */
    }
  }, async (request,reply) => {
    const { storageId } = request.params   

    const places = await prisma.place.findMany({
      select: {
        id: true,
        name: true,
        location: true,
        details: true,        
      },
      where: {
        storageId
      }
    })

    if (places.length === 0) {      
      throw new Error('Este estoque não tem locais cadastrados')
    }
    try{
      return reply.send({ 
        places: places.map((place) => {
          return {
            id: place.id,
            name: place.name,
            location: place.location,
            details: place.details,            
          }
        })         
      })
    }catch(error: any){      
      throw new Error('Erro de sistema', error)      
    }    
  })
}