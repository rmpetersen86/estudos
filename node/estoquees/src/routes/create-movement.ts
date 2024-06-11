import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function createMovement(app: FastifyInstance){ 
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/movements', {
      schema: {
        body: z.object({
          type: z.string(),          
          origin: z.string(),
          destiny: z.string(),
          responsible: z.string(),
          contact: z.string(),
          equipments: z.string().array().nullish(),
          materials: z.string().array().nullish()
        }),
        /* response: {
          201: z.object({
            movementId: z.string().uuid()
          })
        },       */
      }      
    }, async (request, reply) => {
      
      const {
        type,                
        origin,      
        destiny,     
        responsible, 
        contact,
        equipments,
        materials,
      } = request.body

      console.log({
        type,
          origin,
          destiny,
          responsible,
          contact,
          equipments,
          materials
      })

      /* const movement = await prisma.movement.create({
        data: {
          type,
          origin,
          destiny,
          responsible,
          contact,          
        }
      })       */

      //return reply.status(201).send({ movementId: movement.id})
      return reply.status(200).send({message: "ok"})
    })
}