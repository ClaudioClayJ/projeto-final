import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Produtos from './pages/produtos/index'
import Ofertas from './pages/ofertas/index'
import Localizacao from './pages/localizacao/index'
import Treinos from './pages/treinos/index'
import Matricula from './pages/matricula'
import Logon from './pages/logon'


export default function Rotas(){
    return(
     <BrowserRouter>
        <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/Produtos"  element={<Produtos />} />
        <Route path="/Ofertas"  element={<Ofertas />} />
        <Route path="/Localizacao"  element={<Localizacao />} />
        <Route path="/Treinos"  element={<Treinos />} />
        <Route path="/Matricula"  element={<Matricula />} />
        <Route path="/Logon"  element={<Logon />} />


        </Routes>
     
     </BrowserRouter>


    )
}