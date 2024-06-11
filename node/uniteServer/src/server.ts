import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createStorage } from "./routes/create-storage";
import { createPlace } from "./routes/create-place";
import { createMaterial } from "./routes/create-material";
import { getStorage } from "./routes/get-storage";
import { getPlace } from "./routes/get-place";
import { getMaterial } from "./routes/get-material";
import { createEquipment } from "./routes/create-equipment";
import { createMovement } from "./routes/create-movement";
import { getEquipment } from "./routes/get-equipment";
import { getMaterials } from "./routes/get-materials";
import { getEquipments } from "./routes/get-equipments";

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createStorage)
app.register(createPlace)
app.register(createMaterial)
app.register(createEquipment)
app.register(createMovement)
app.register(getStorage)
app.register(getPlace)
app.register(getMaterial)
app.register(getMaterials)
app.register(getEquipments)
app.register(getEquipment)

app.listen({ port: 3333 }).then(() => {
  console.log('Server running...')
})