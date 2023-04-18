import { StorePage } from '../components/store-page/store-page'
import { useGetProducts } from '../hooks/useGetProducts'

export const AllProducts = () => {

  const { womenData, menData, isWomenDataLoading, isMenDataLoading, isWomenDataError, isMenDataError } = useGetProducts()

  if (isMenDataLoading || isWomenDataLoading) {
    return <h1>Loading...</h1>
  }

  if(isMenDataError || isWomenDataError || !womenData || !menData) {
    return <h1>error</h1>
  }

  const data = [...womenData, ...menData]

  return (
    <StorePage items={data}/>
  )
}