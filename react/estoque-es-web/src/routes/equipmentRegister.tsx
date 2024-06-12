import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../libs/api"
import { IconButton } from "../components/icon-button"
import { Place } from "./placesList"


export function EquipmentRegister() {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [model, setModel] = useState("")
  const [brand, setBrand] = useState("")
  const [status, setStatus] = useState("")
  const [quantity, setQuantity] = useState("")
  const [details, setDetails] = useState("")    
  const [places, setPlaces] = useState<Place[]>([])
  const [place, setPlace] = useState("")
  const [storages, setStorages] = useState<Storage[]>([])
  const [storage, setStorage] = useState("")  
  const [selectPlace, setSelectPlace] = useState(false)

  useEffect(() => {
    getStorages()
  },[])

  async function getStorages(){    
    const { data } = await api.get('/storages')    
    setStorages(data.storages)  
  }
  
  async function handleGetPlaces(storageId: any){
    if(storageId === ''){
      return
    } 
    setPlaces([])
    setPlace("")
    setSelectPlace(false)
    try{
      const { data } = await api.get(`/storages/${storageId}/places`)
    setPlaces(data.places)
    setSelectPlace(true)
    }catch(error: any){      
      alert('Falha: '+ error.response?.data.message || error)      
    }
    return    
  }

  const navigate = useNavigate()  
  
  async function handleSubmit() {
    let data = new FormData()
    data.append('name', name.trim())
    data.append('type', type.trim())
    data.append('model', model.trim())
    data.append('brand', brand.trim())
    data.append('status', status.trim())
    data.append('quantity', quantity.trim())
    data.append('details', details.trim())    

    try {
      await api.post(`/places/${place}/materials`, data, {headers: {'Content-Type': 'application/json'}})      
      .then(() => alert(`Material cadastrado com sucesso!`))
      .then(() => navigate('/items/list'))  
    }catch(error){
      alert('Falha no cadastro do material!')
      console.error(error)
    }
  }

  function dataValidate() {
    if (name === ''){
      alert('Preencha o nome do local')
      return
    }else if (type === '') {
      alert('Preencha o tipo')
      return
    }else if (model === '') {
      alert('Preencha o modelo')
      return
    }else if (brand === '') {
      alert('Preencha a marca')
      return
    }else if (status === '') {
      alert('Preencha o status')
      return
    }else if (quantity === '') {
      alert('Preencha a quantidade')
      return
    }else if(storage === undefined){
      alert('Selecione um estoque!')
      return
    }
      handleSubmit()
    }
    

  return (
    <div className="flex flex-col gap-4 items-center">
      <p>Cadstro de Equipamento</p>

      <form className="flex flex-col gap-4 items-center w-10/12 p-4 border border-gray-500 rounded-lg">

      <div className="flex gap-4">
      <p className="flex flex-col gap-2">
        <span>Estoque</span>
          <select
            onChange={event => {setStorage(event.target.value), handleGetPlaces(event.target.value)}}
            value={storage}       
            className="text-black rounded w-64"
          >
            <option key='x' value=''>Selecione um estoque</option>
            {storages.map(item => {
              return(
                <option key={item.id} id={item.id} className="text-gray-700" value={item.id}>{item.name}</option>
              )
            })}
          </select>          
        </p>
        <p className="flex flex-col gap-2">
        <span>Local</span>
          <select
            onChange={event => setPlace(event.target.value)}
            value={place}       
            className="text-black rounded w-64"
            disabled={!selectPlace}
          >
            <option key='y' value=''>{!selectPlace ? 'Selecione um estoque primeiro' : 'Selecione um local'}</option>
            {places.map(item => {
              return(
                <option key={item.id} className="text-gray-700" value={item.id}>{item.name}</option>
              )
            })}
          </select>          
        </p>
        </div>
        <div className="flex gap-4">
        <p className="flex flex-col gap-2">
          <span>Nome</span>
          <input             
            className="text-black rounded w-64"
            placeholder="Desktop, Notebook, etc..."
            type="text"
            name="name"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </p>
        <p className="flex flex-col gap-2">
          <span>Tipo</span>
          <input 
            className="text-black rounded w-64"
            placeholder="confguração, tamanho, etc..."
            type="text"
            name="name"
            value={type}
            onChange={event => setType(event.target.value)}
          />          
        </p>
        </div>
        <div className="flex gap-4">
        <p className="flex flex-col gap-2">
          <span>Modelo</span>
          <input 
            className="text-black rounded w-64"
            placeholder="Modelo"
            type="text"
            name="name"
            value={model}
            onChange={event => setModel(event.target.value)}
          />          
        </p>
        <p className="flex flex-col gap-2">
          <span>Marca</span>
          <input 
            className="text-black rounded w-64"
            placeholder="Marca"
            type="text"
            name="name"
            value={brand}
            onChange={event => setBrand(event.target.value)}
          />          
        </p>
        </div>
        <div className="flex gap-4">
        <p className="flex flex-col gap-2">
          <span>Status</span>
          <input 
            className="text-black rounded w-64"
            placeholder="Status"
            type="text"
            name="name"
            value={status}
            onChange={event => setStatus(event.target.value)}
          />          
        </p>
        <p className="flex flex-col gap-2">
          <span>Serial</span>
          <input 
            className="text-black rounded w-64"
            placeholder="Numero de série"
            type="text"
            name="name"
            value={quantity}
            onChange={event => setQuantity(event.target.value)}
          />          
        </p>
        </div>
        <div className="flex gap-4">
        <p className="flex flex-col gap-2">
          <span>Patrimônio</span>
          <input 
            className="text-black rounded w-64"
            placeholder="Status"
            type="text"
            name="name"
            value={status}
            onChange={event => setStatus(event.target.value)}
          />          
        </p>
        <p className="flex flex-col gap-2">
          <span>Contrato</span>
          <input 
            className="text-black rounded w-64"
            placeholder="Numero de série"
            type="text"
            name="name"
            value={quantity}
            onChange={event => setQuantity(event.target.value)}
          />          
        </p>
        </div>
        <p className="flex flex-col gap-2">
          <span>
            Detalhes
          </span>
          <input 
            className="text-black rounded w-64"
            placeholder="Detalhes"
            type="text"
            name="name"
            value={details}
            onChange={event => setDetails(event.target.value)}
          />          
        </p>
        <IconButton type="button" onClick={() => dataValidate()}>
          Cadastrar
        </IconButton>
      </form>
    </div>
  )
}