import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { DataType } from "../types/types"
import { Item } from "../types/types"

export const useGetProducts = () => {
  const { data: womenData, isLoading: isWomenDataLoading, isError: isWomenDataError } : DataType = useQuery(['women-products'], async () => {
    return await axios
      .get("https://fakestoreapi.com/products/category/women's clothing")
      .then((res: { data: Item[] }) => res.data)
  })
  
  const { data : menData, isLoading: isMenDataLoading, isError: isMenDataError} : DataType = useQuery(['men-products'], async () => {
    return await axios
      .get("https://fakestoreapi.com/products/category/men's clothing")
      .then((res: { data: Item[] }) => res.data)
  }) 

  return (
    { womenData, menData, isWomenDataLoading, isMenDataLoading, isWomenDataError, isMenDataError }
  )
}
