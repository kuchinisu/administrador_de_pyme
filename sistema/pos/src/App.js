
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
import ProductosTiposM from "containers/pages/ProductosTiposM";
import Landing from "containers/pages/Landing";
import Humanos from "containers/pages/Humanos";
import EmpleadC from "containers/pages/EmpleadC";

function App() {
  return ( 
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="*" element={<Error404/>} />
          <Route path="/" element={<Landing/>} />
          <Route path="/administracion/cajera" element={<Caja/>} />
          <Route path="/administracion/cajera/pagado_realizado" element={<Pagado/>} />
          <Route path="administracion/dashboard" element={<DashBoard/>}/>
          <Route path="administracion/inventario" element={<Inventario/>}/>
          <Route path="administracion/rh" element={<Humanos/>}/>
          <Route path="administracion/inventario/productos_de/:categoria/:marca/:producto" element={<ProductoDEMarca/>}/>
          <Route path="administracion/inventario/productos_de/:categoria/:marca" element={<ProductosTiposM/>}/>
          <Route path="administracion/rh/empl/:codigo" element={<EmpleadC/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
