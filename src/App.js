import './App.css';
import DisplayProducts from './home';
import { Header, Footer, RouteNotFound } from './components';
import { Routes, Route, Outlet } from 'react-router-dom';
import { GetProduct } from './product';
import { ContactForm } from './contact';
import { Cart } from './cart';
import { Checkout } from './checkout';

function Layout() {
  return (
    <div>
      <Header />
        <div className='contentContainer'>
          <Outlet />
        </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <div className='pageContainer'>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DisplayProducts />} />
            <Route path="/contact" element ={<ContactForm />} />
            <Route path="/shopping-cart" element={<Cart />} />
            <Route path="/product/:id" element={<GetProduct />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path="*" element={<RouteNotFound />} />
          </Route>
        </Routes>
    </div>
    

    
  );
}

export default App;