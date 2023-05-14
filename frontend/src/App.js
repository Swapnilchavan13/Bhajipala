import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './Pages/Login';
import { Navbar } from './Pages/Navbar';
import { Signup } from './Pages/Signup';
import { Products } from './Pages/Products';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="products" element={<Products />} />
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>

    </div>
  );
}

export default App;
