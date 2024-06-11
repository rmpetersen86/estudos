import { Header } from "./routes/header";
import { ErrorPage } from "./routes/errorPage";
import { ItemsList } from "./routes/itemsList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ItemRegister } from "./routes/itemRegister";
import { StorageList } from "./routes/storagesList";
import { StorageRegister } from "./routes/storageRegister";
import { PlaceList } from "./routes/placesList";
import { PlaceRegister } from "./routes/placeRegister";
import { MaterialRegister } from "./routes/materialRegister";
import { EquipmentRegister } from "./routes/equipmentRegister";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,                
        element: <ItemsList />
      },
      {
        path: "items/list",
        element: <ItemsList />
      },
      {
        path: "storage/list",
        element: <StorageList />
      },
      {
        path: "place/list",
        element: <PlaceList />
      },      
      {
        path: "item/register",
        element: <ItemRegister />,
        children: [
          {
            index: true,
            element: <MaterialRegister />
          },
          {
            path: "item/register/material",
            element: <MaterialRegister />
          },
          {
            path: "item/register/equipment",
            element: <EquipmentRegister />
          },
          {
            path: "*",
            element: <ErrorPage />
          }
        ] 
      },
      {
        path: "storage/register",
        element: <StorageRegister />
      },
      {
        path: "place/register",
        element: <PlaceRegister />,        
      },
      {
        path: "*",
        element: <ErrorPage />
      }      
    ]
  }  
])

export function App() {
  return (
    <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
      <RouterProvider router={router} />
    </div>
  )
}
