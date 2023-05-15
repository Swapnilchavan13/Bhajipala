import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './Pages/Login';
import { Navbar } from './Pages/Navbar';
import { Products } from './Pages/Products';
import { Cart } from './Pages/Cart';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
          <Route index element={<Login />} />
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
      </Routes>

    </div>
  );
}

export default App;
