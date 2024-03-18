
import Error404 from "containers/Err/Error404";
import Home from "containers/pages/Home";
import { Provider } from "react-redux";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store";
import Caja from "containers/pages/Caja";
import Pagado from "containers/pages/Pagado"
import DashBoard from "containers/pages/DashBoard";
import Inventario from "containers/pages/Inventario";
import ProductoDEMarca from "containers/pages/ProductoDeMarca"

function App() {
  return ( 
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="*" element={<Error404/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/administracion/cajera" element={<Caja/>} />
          <Route path="/administracion/cajera/pagado_realizado" element={<Pagado/>} />
          <Route path="administracion/dashboard" element={<DashBoard/>}/>
          <Route path="administracion/inventario" element={<Inventario/>}/>
          <Route path="administracion/inventario/productos_de/:categoria/:marca" element={<ProductoDEMarca/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
