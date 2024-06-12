import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react"
import { IconButton } from "../components/icon-button"
import { Table } from "../components/table/table"
import { TableHeader } from "../components/table/table-header"
import { TableCell } from "../components/table/table-cell"
import { TableRow } from "../components/table/table-row"
import { useEffect, useState, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import api from "../libs/api"

interface Item {
  id: string | number,
  name: string
  type: string
  model: string
  brand: string
  serial: string
  patrimony: string
  contract: string
  status: string
  place: string
  storage: string
}

export function ItemsList(){
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString())
    if (url.searchParams.has('search')){
      return url.searchParams.get('search') ?? ''
    }
    return ''
  })
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())
    if (url.searchParams.has('page')){
      return Number(url.searchParams.get('page'))
    }
    return 1
  })

  const [total, setTotal] = useState(0)
  const [items, setItems] = useState<Item[]>([])

  const totalPages = Math.ceil(total / 10)

  useEffect(() => {
    getItems()
  },[page, search])

  async function getItems(){
    const { data } = await api.get('/items')    
    setItems(data.items.sort((a: Item, b: Item) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()
      if(nameA < nameB) {
        return -1
      }
      if(nameA > nameB){
        return 1
      }

      return 0
    }))
    setTotal(data.total)
  }

  function setCurrentSearch(search: string){
    const url = new URL(window.location.toString())
    url.searchParams.set('search', search)
    window.history.pushState({}, "", url)
    setSearch(search)
    setCurrentPage(1) 
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString())
    url.searchParams.set('page', String(page))
    window.history.pushState({}, "", url)
    setPage(page)
  }

  function goToNextPage(){    
    setCurrentPage(page + 1)
  }

  function goToPreviousPage(){
    setCurrentPage(page - 1)
  }

  function goToLastPage(){
    setCurrentPage(totalPages)
  }

  function goToFirstPage(){
    setCurrentPage(1)
  }

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>){
    setCurrentSearch(event.target.value)
    //setPage(1)
  }

  let navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Items</h1>
        <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
          <Search className="size-4 text-blue-800"/>
          <input 
            className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm ring-0 focus:ring-0"  
            placeholder="Buscar Item" 
            value={search}
            onChange={onSearchInputChanged}
          />          
        </div>
        <IconButton onClick={() => navigate("/item/register")}>          
            Cadastrar Item
        </IconButton>        
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{width: 48}}>
              <input className="size-4 bg-black/20 rounded border-white/10" type="checkbox" disabled />
            </TableHeader>
            <TableHeader>Item</TableHeader>
            <TableHeader>Tipo</TableHeader>
            <TableHeader>Identificação</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Localização</TableHeader>
            <TableHeader>Tipo de Item</TableHeader>
            <TableHeader style={{width: 64}}>Detalhes</TableHeader>
          </tr>
        </thead>
        <tbody>
          {items.slice((page -1) * 10, page * 10).map((item) => {
            return(
              <TableRow key={item.id} className="border-b border-white/10 hover:bg-white/5">
                <TableCell>
                  <input className="size-4 bg-black/20 rounded border-white/10 hover:bg-teal-500" type="checkbox" />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap1">
                    <span className="font-semibold text-white">{item.type}</span>
                    <span>{item.model}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap1">
                    <span className="font-semibold text-white">{item.serial && "S/N: " + item.serial}</span>
                    <span>{item.patrimony && "Pat: " + item.patrimony} {item.contract && "C: " + item.contract}</span>
                  </div></TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap1">
                    <span className="font-semibold text-white">{item.storage}</span>
                    <span>{item.place}</span>
                  </div>
                </TableCell>
                <TableCell>{(item.id.toString().length === 36) ? 'Equipamento' : 'Material'}</TableCell>
                <TableCell>                  
                  <IconButton transparent>                    
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>Mostrando {items.length} de {total} itens</TableCell>
            <TableCell className="py-3 px-4 text-sm text-zinc-300 text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Página 1 de {totalPages}
                </span>              
              <div className="flex gap-1.5">
                <IconButton onClick={goToFirstPage} disabled={page === 1}>
                  <ChevronsLeft className="size-4" />
                </IconButton>
                <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                  <ChevronLeft className="size-4" />
                </IconButton>
                <IconButton onClick={goToNextPage} disabled={page ===totalPages}>
                  <ChevronRight className="size-4" />
                </IconButton>
                <IconButton onClick={goToLastPage} disabled={page ===totalPages}>
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