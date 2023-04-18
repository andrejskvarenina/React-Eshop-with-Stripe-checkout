import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import { Navbar } from './components/navbar/navbar'
import { Home } from './pages/home';
import { AllProducts } from './pages/all-products';
import { WomenCollection } from './pages/women-collection';
import { MenCollection } from './pages/men-collection';
import { Cart } from './components/cart/cart';
import { ProductPage } from './pages/product-page/product-page';
import SimpleSnackbar from './components/snackbar';


function App() {
  
  return (      
    <div className='App'>
      <Router>      
        <Navbar/>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/collections/all' element={<AllProducts />}/>
            <Route path='/collections/men' element={<MenCollection />}/>
            <Route path='/collections/women' element={<WomenCollection />}/>
            <Route path='/product/:id' element={<ProductPage />} />
          </Routes>
      </Router>
      <Cart/>
      <SimpleSnackbar />     
    </div>
  )
}

export default App
