import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react"
import { IconButton } from "../components/icon-button"
import { Table } from "../components/table/table"
import { TableHeader } from "../components/table/table-header"
import { TableCell } from "../components/table/table-cell"
import { TableRow } from "../components/table/table-row"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../libs/api"

export interface Place {
  id: string,
  name: string
  location: string
  storage: string
  details: string
  itemsAmount: number
}

export function PlaceList(){
  //const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [places, setPlaces] = useState<Place[]>([])
  const totalPages = Math.ceil(total / 10)  

  useEffect(() => {
    getPlaces()
  },[page])

  async function getPlaces(){
    const { data } = await api.get('/places')    
    setPlaces(data.places)
    setTotal(data.total)
  }

  async function removePlace(place: Place){
    if(place.itemsAmount !== 0){
      alert('O local não está vazio')
      return
    }
    if (confirm('Remover o Local: '+ place.name+' ?')){
      await api.delete(`/places/${place.id}`)
      .then(() => alert('O local '+place.name+' foi removido'))
      .then(() => navigate('/place/list'))
      return
    }
    return
  }

  let navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Items</h1>
        <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
          <Search className="size-4 text-blue-800"/>
          <input className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm ring-0 focus:ring-0"  placeholder="Buscar Item" />          
        </div>
        <IconButton onClick={() => navigate("/place/register")}>
            Cadastrar Local
        </IconButton>        
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{width: 48}}>
              <input className="size-4 bg-black/20 rounded border-white/10" type="checkbox" disabled />
            </TableHeader>
            <TableHeader>Local</TableHeader>
            <TableHeader>Localização</TableHeader>
            <TableHeader>Estoque</TableHeader>
            <TableHeader>Detalhes</TableHeader>            
            <TableHeader style={{width: 64}}>Detalhes</TableHeader>
          </tr>
        </thead>
        <tbody>
          {places.slice((page -1) * 10, page * 10).map((item) => {
            return(
              <TableRow key={item.id} className="border-b border-white/10 hover:bg-white/5">
                <TableCell>
                  <input className="size-4 bg-black/20 rounded border-white/10 hover:bg-teal-500" type="checkbox" />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                <div className="flex flex-col gap1">
                    <span className="font-semibold text-white">{item.location}</span>
                    <span>Items aramazenados: {item.itemsAmount}</span>
                  </div>
                </TableCell>
                <TableCell>{item.storage}</TableCell>
                <TableCell>{item.details}</TableCell>            
                <TableCell>                  
                  <IconButton transparent>                    
                    <MoreHorizontal className="size-4" onClick={() => removePlace(item)} />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>Mostrando {places.length} de {total} itens</TableCell>
            <TableCell className="py-3 px-4 text-sm text-zinc-300 text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Página 1 de {totalPages}
                </span>              
              <div className="flex gap-1.5">
                <IconButton>
                  <ChevronsLeft className="size-4" />
                </IconButton>
                <IconButton>
                  <ChevronLeft className="size-4" />
                </IconButton>
                <IconButton>
                  <ChevronRight className="size-4" />
                </IconButton>
                <IconButton>
                  <ChevronsRight className="size-4" />
                </IconButton>
              </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}