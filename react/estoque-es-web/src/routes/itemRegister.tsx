import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export function ItemRegister() {
  return (
    <div className="flex flex-col flex-1 gap-4">
      <p>Cadstro de Itens</p>
      <nav className="flex gap-4">
        <Link to="item/register/material" className="bg-zinc-300/10 rounded p-2 hover:bg-zinc-600">Material</Link>
        <Link to="item/register/equipment" className="bg-zinc-300/10 rounded p-2 hover:bg-zinc-600">Equipamento</Link>
      </nav>
      <Outlet />
    </div>
  )
}