import { useState } from "react";
import { IconButton } from "../components/icon-button";
import api from "../libs/api";
import { useNavigate } from "react-router-dom";

export function StorageRegister() {
  const [name, setName] = useState("")
  const [location, setLocation ] = useState("")
  const [details, setDetails] = useState("")

  const navigate = useNavigate()  
  
  async function handleSubmit() {
    let data = new FormData()
    data.append('name', name.trim());
    data.append('location', location.trim())
    data.append('details', details.trim())

    try {
      await api.post('/storages', data, {headers: {'Content-Type': 'application/json'}})      
      .then(() => alert(`Estoque cadastrado com sucesso!`))
      .then(() => navigate('/storage/list'))      
    }catch(error){
      alert('Falha no cadastro do estoque!')
      console.error(error)
    }
  }

  function dataValidate() {
    if (name === ''){
      alert('Preencha o nome do estoque')
      return
    }else if (location === '') {
      alert('Preencha a  localização')
      return
    }
    handleSubmit()
  }
  return (
    <div className="flex flex-col gap-4">
      <p>Cadstro de Estoques</p>
      <form className="flex flex-col gap-4 items-start">
        <p className="flex flex-col gap-2">
          <span>Nome do estoque</span>
          <input             
            className="text-gray-700"
            placeholder="Nome do Estoque"
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