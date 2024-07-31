import {BrowserRouter,Route,Routes} from 'react-router-dom'


import Logon from './pages/logon'
import Dashboard from './pages/dashboard'


export default function Rotas(){
    return(
     <BrowserRouter>
        <Routes>
        <Route path="/" exact element={<Logon />} />
        <Route path="/dashboard"  element={<Dashboard />} />


        </Routes>
     
     </BrowserRouter>


    )
}