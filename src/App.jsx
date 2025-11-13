import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Animation from "./pages/Animation";
import Components from "./pages/Components";
import Todos from "./pages/Todos";
import Products from "./pages/Products";
import Carts from "./pages/Carts";
import Login from "./pages/Login";
import NotPageFound from "./pages/NotPageFound";

import "./App.css";


function App() {
  const [token, setToken] = useState('')
  const [role, setRole] = useState('')

  const [cartItems, setCartItems] = useState([]);
  const [pq, setPq] = useState(0)

  if (token === '') {
    return <Login setToken={setToken} setRole={setRole} />
  } else {
    return (
      <BrowserRouter basename="/work12-Multipages-Deploy/">
        <Routes>
          <Route element={<AppLayout pq={pq} cartItems={cartItems} setToken={setToken} />}>
            <Route path="home" element={<Home />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="animation" element={<Animation />} />
            <Route path="components" element={<Components />} />
            <Route path="todos" element={<Todos />} />
            <Route path="products" element={<Products setPq={setPq} cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="carts" element={<Carts cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="*" element={<NotPageFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }

}

export default App;
