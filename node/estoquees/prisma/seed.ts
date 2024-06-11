import { prisma } from '../src/lib/prisma'

async function seed() {
  
  const storages = [
    {
      id: 1,
      name: 'Fora de estoque',
      location: 'diversos',
      details: 'itens fora do estoque da DGI'
    },
    {
      id: 2,
      name: 'Almoxarifado DGI',
      location: 'Atrás do CVT Quintino',
      details: 'Pegar a chave no claviculário'
    }
  ]

  const places = [
    {
      id: '48eb2f30-6f75-44e0-a555-f54714ae7ffc',
      name: 'ETE Republica',
      location: 'campus quintino',
      details: 'entrar em contato com o João',
      storageId: 1
    },
    {
      id: 'c19906a6-80d9-424d-9aec-fd4200d3fd92',
      name: 'Sala do 2 andar',
      location: 'segundo andar do Almoxarifado DGI',
      details: 'Pegar a chave no claviculário',
      storageId: 2
    }
  ]

  const materials = [
    {
      name: "Cabo",
      type: "VGA",
      model: "1.5m",
      brand: "Generico",
      status: "nenhum",
      quantity: 15,
      details: "",
      placeId: 'c19906a6-80d9-424d-9aec-fd4200d3fd92'
    },
    {
      name: "Cabo",
      type: "Força",
      model: "1.5m antigo 10A",
      brand: "Generico",
      status: "nenhum",
      quantity: 32,
      details: "",
      placeId: 'c19906a6-80d9-424d-9aec-fd4200d3fd92'
    },
    {
      name: "Cabo",
      type: "Força",
      model: "1.8m 10A",
      brand: "Generico",
      status: "nenhum",
      quantity: 18,
      details: "",
      placeId: 'c19906a6-80d9-424d-9aec-fd4200d3fd92'
    }
  ]

  const equipments = [
    {
      name: "Desktop",
      type: "Core i5 4Gb 500gb",
      model: "POS14223",
      brand: "Positivo",
      serial: "654321",
      status: "Não verificado",
      patrimony: "55521544",  
      details: "Gabinete amassado",
      placeId: "c19906a6-80d9-424d-9aec-fd4200d3fd92"
    },
    {
      name: "Notebook",
      type: "Core i5 4Gb 500gb",
      model: "POS14223",
      brand: "Positivo",
      serial: "654323",
      status: "Não verificado",
      patrimony: "55521548",  
      details: "Carcaça quebrada",
      placeId: "c19906a6-80d9-424d-9aec-fd4200d3fd92"
    },
    {
      name: "Monitor",
      type: "LCD 19",
      model: "LG1234",
      brand: "LG",
      serial: "154323",
      status: "Não verificado",
      patrimony: "",  
      details: "Funcionando",
      placeId: "c19906a6-80d9-424d-9aec-fd4200d3fd92"
    },

  ]

  
  await prisma.storage.createMany({
    data: storages
  })

  await prisma.place.createMany({
    data: places
  })

  await prisma.material.createMany({
    data: materials
  })

  await prisma.equipment.createMany({
    data: equipments
  })
  
}
seed().then(() => {
  console.log('The database has been seeded!')
  prisma.$disconnect()
})