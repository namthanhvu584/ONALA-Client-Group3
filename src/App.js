import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import BestSeller from './Pages/BestSeller';
import ONALA from './Pages/ONALA';
import Sale from './Pages/Sale';
import Recommend from './Pages/Recommend';
import Register from './Pages/Register';
import Login from './Pages/Login';

import Home from './Pages/Home';

import UserInfo from './Components/UserInfo';
import OrderList from './Components/OrderList';
import OrderInfo from './Pages/OrderInfo'
import UserManagement from './Pages/UserManagement';
import Combo from './Pages/Combo';
import Hamburger from './Pages/Hamburger';
import Chicken from './Pages/Chicken';
import Drink from './Pages/Drink';
import Cake from './Pages/Cake';
import FingerFood from './Pages/FingerFood';
import ChiTietSanPham from './Pages/ProductDetail';
import OrderDetail from './Pages/OrderDetail';
import Cart from './Pages/Cart';
import OrderInfo1 from './Pages/OrderInfo1';
import CartEmpty from './Components/CartEmpty'
function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='/' element={<Home/>} />
            <Route path='/bestseller' element={<BestSeller/>} />
            
            <Route path='/recommend' element={<Recommend/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/userManagement' element={<UserManagement />}>
              <Route path='info' element = {<UserInfo/>}/>
              <Route path='purchase' element= {<OrderList/>}/>
                
              
            </Route>
            
            
            <Route path='/combo' element={<Combo/>} />
            <Route path='/order/:order_id' element={<OrderDetail/>} />
            <Route path='/food/:id' element={<ChiTietSanPham/>} />
            <Route path='/hamburger' element={<Hamburger />} />
            <Route path='/chicken' element={<Chicken />} />
            <Route path='/drink' element={<Drink />} />
            <Route path='/cart' element={<Cart />} />
           
            <Route path='/cake' element={<Cake/>} />
            <Route path='/fingerfood' element={<FingerFood/>} />
            <Route path='/onala' element={<ONALA/>} />
            <Route path='sale' element={<Sale/>} />
            <Route path= 'register' element = {<Register/>}/>
            <Route path='/cartempty' element={<CartEmpty/>} />
            <Route path='orderinfo' element= {<OrderInfo/>}/>
            <Route path='orderinfo1' element= {<OrderInfo1/>}/>
          </Route>
         
           
        
        

      </Routes>
    </>
  );
}
 

export default App;