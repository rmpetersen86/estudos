import { useEffect, useState } from "react";
import { IconButton } from "../components/icon-button";
import api from "../libs/api";
import { useNavigate } from "react-router-dom";

export function PlaceRegister() {
  const [name, setName] = useState("")
  const [location, setLocation ] = useState("")
  const [details, setDetails] = useState("")
  const [storages, setStorages] = useState<Storage[]>([])
  const [storage, setStorage] = useState("")

  useEffect(() => {
    getStorages()
  },[])

  async function getStorages(){
    const { data } = await api.get('/storages')    
    setStorages(data.storages)    
  }

  const navigate = useNavigate()  
  
  async function handleSubmit() {
    let data = new FormData()
    data.append('name', name.trim());
    data.append('location', location.trim())
    data.append('details', details.trim())
    data.append('storage', storage)

    try {
      await api.post(`/storages/${storage}/places`, data, {headers: {'Content-Type': 'application/json'}})      
      .then(() => alert(`Local cadastrado com sucesso!`))
      .then(() => navigate('/place/list'))      
    }catch(error){
      alert('Falha no cadastro do local!')
      console.error(error)
    }
  }

  function dataValidate() {
    if (name === ''){
      alert('Preencha o nome do local')
      return
    }else if (location === '') {
      alert('Preencha a  localização')
      return
    }else if(storage === undefined){
      alert('Selecione um estoque!')
        return
      }      
      handleSubmit()
    }
    

  return (
    <div className="flex flex-col gap-4">
      <p>Cadstro de Locais</p>
      <form className="flex flex-col gap-4 items-start">
      <p className="flex flex-col gap-2">
        <span>Estoque</span>
          <select
            onChange={event => setStorage(event.target.value)}
            value={storage}       
            className="text-black"            
          >
            <option value=''>Selecione um estoque</option>
            {storages.map(item => {
              return(
                <option className="text-gray-700" value={item.id}>{item.name}</option>
              )
            })}
          </select>          
        </p>
        <p className="flex flex-col gap-2">
          <span>Nome do local</span>
          <input             
            className="text-gray-700"
            placeholder="Nome do Local"
            type="text"
            name="name"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </p>
        <p className="flex flex-col gap-2">
          <span>Localização</span>
          <input 
            className="text-gray-700"
            placeholder="Localização"
            type="text"
            name="name"
            value={location}
            onChange={event => setLocation(event.target.value)}
          />          
        </p>
        <p className="flex flex-col gap-2">
          <span>
            Detalhes
          </span>
          <input 
            className="text-gray-700"
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