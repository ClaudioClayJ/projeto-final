import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Logon from './pages/logon'
import Dashboard from './pages/dashboard'
import Matricula from './pages/matricula'
import Produtos from './pages/produtos/index'


export default function Rotas(){
    return(
     <BrowserRouter>
        <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/Matricula"  element={<Matricula />} />
        <Route path="/Produtos"  element={<Produtos />} />


        </Routes>
     
     </BrowserRouter>


    )
}