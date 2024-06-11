import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createStorage } from "./routes/create-storage";
import { createPlace } from "./routes/create-place";
import { createMaterial } from "./routes/create-material";
import { getStorage, getStoragePlaces, getStorages } from "./routes/get-storage";
import { getPlace, getPlaces } from "./routes/get-place";
import { getMaterial } from "./routes/get-material";
import { createEquipment } from "./routes/create-equipment";
import { getEquipment } from "./routes/get-equipment";
import { getMaterials } from "./routes/get-materials";
import { getEquipments } from "./routes/get-equipments";
import { createMovement } from "./routes/create-movement";
import fastifyCors from "@fastify/cors";
import { getItems } from "./routes/get-items";
import { removeStorage } from "./routes/remove-storage";
import { removePlace } from "./routes/remove-place";

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createStorage)
app.register(createPlace)
app.register(createMaterial)
app.register(createEquipment)
app.register(getStorage)
app.register(getStorages)
app.register(getStoragePlaces)
app.register(getPlace)
app.register(getPlaces)
app.register(getMaterial)
app.register(getMaterials)
app.register(getEquipments)
app.register(getEquipment)
app.register(getItems)
app.register(createMovement)
app.register(removeStorage)
app.register(removePlace)


app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('Server running...')
})