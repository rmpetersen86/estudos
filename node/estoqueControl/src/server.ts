import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createStorage } from "./routes/create-storage";
import { createPlace } from "./routes/create-place";
import fastifyCors from "@fastify/cors";
import { createItem } from "./routes/create-item";
import { getItems } from "./routes/get-items";

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createStorage)
app.register(createPlace)
app.register(createItem)
app.register(getItems)


app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('Server running...')
})