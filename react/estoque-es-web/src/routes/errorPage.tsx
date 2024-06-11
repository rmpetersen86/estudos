import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error: any = useRouteError()
  console.error(error)

  return(
    <div className="flex flex-1 flex-col items-center justify-center text-center gap-6">
      <h1 className="text-6xl">Opa!</h1>
      <p className="text-2xl">Desculpe, ocorreu um erro inesperado...</p>
      <p>
        <i className="text-red-500 text-2xl">{error.statusText || error.message}</i>
      </p>
    </div>
  )
}