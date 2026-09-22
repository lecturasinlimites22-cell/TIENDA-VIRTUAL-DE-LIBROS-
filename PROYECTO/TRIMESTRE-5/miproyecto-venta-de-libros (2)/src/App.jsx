import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "./pages/inicio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio key="home" initialScreen="home" />} />
        <Route path="/productos" element={<Inicio key="catalog" initialScreen="catalog" />} />
        <Route path="/catalogo" element={<Inicio key="catalog" initialScreen="catalog" />} />
        <Route path="/materiales" element={<Inicio key="services" initialScreen="services" />} />
        <Route path="/login" element={<Inicio key="login" initialScreen="login" initialAuthMode="login" />} />
        <Route path="/registro" element={<Inicio key="registro" initialScreen="login" initialAuthMode="registro" />} />
        <Route path="/contactos" element={<Inicio key="contactos" initialScreen="support" />} />
        <Route path="/contacto" element={<Inicio key="contacto" initialScreen="support" />} />
        <Route path="/terminos" element={<Inicio key="terminos" initialScreen="terms" />} />
        <Route path="/pedidos" element={<Inicio key="home" initialScreen="home" />} />
        <Route path="/perfil" element={<Inicio key="perfil" initialScreen="profile" />} />
        <Route path="/favoritos" element={<Inicio key="favoritos" initialScreen="favorites" />} />
        <Route path="/carrito" element={<Inicio key="cart" initialScreen="cart" />} />
        <Route path="/pagos" element={<Inicio key="pagos" initialScreen="payments" />} />
        <Route path="*" element={<Inicio key="login-fallback" initialScreen="login" initialAuthMode="login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
