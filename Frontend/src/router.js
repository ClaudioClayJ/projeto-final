import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Produtos from './pages/produtos/index'
import Ofertas from './pages/ofertas/index'
import Localizacao from './pages/localizacao/index'
import Treinos from './pages/treinos/index'
import Matricula from './pages/matricula'
import Login from './pages/logon'
import CadastroUsuario from './pages/cadastro_usuario/index'
import CadastroProduto from './pages/cadastro_produto/index'
import CadastroOfertas from './pages/cadastro_ofertas/index'
import CadastroMatricula from './pages/cadastro_matricula/index'
import CadastroTreinos from './pages/cadastro_treino/index'
import CadastroEntrada from './pages/cadastro_entrada/index'
import CadastroSaida from './pages/cadastro_saida/index'
import AlterarUsuario from './pages/alterar_usuario/index'
import AlterarProduto from './pages/alterar-produto/index'
import AlterarOferta from './pages/alterar_ofertas/index'
import AlterarTreino from './pages/alterar_treino/index'
import AlterarMatricula from './pages/alterar_matricula/index'
import AlterarEntrada from './pages/alterar_entrada/index'
import AlterarSaida from './pages/alterar_saida/index'



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
        <Route path="/Login"  element={<Login />} />
        <Route path="/CadastroUsuario"  element={<CadastroUsuario />} />
        <Route path="/CadastroProduto"  element={<CadastroProduto />} />
        <Route path="/CadastroOfertas"  element={<CadastroOfertas />} />
        <Route path="/CadastroMatricula"  element={<CadastroMatricula />} />
        <Route path="/CadastroTreinos"  element={<CadastroTreinos />} />
        <Route path="/CadastroEntrada"  element={<CadastroEntrada />} />
        <Route path="/CadastroSaida"  element={<CadastroSaida />} />
        <Route path="/AlterarUsuario"  element={<AlterarUsuario />} />
        <Route path="/AlterarProduto"  element={<AlterarProduto />} />
        <Route path="/AlterarOferta"  element={<AlterarOferta />} />
        <Route path="/AlterarTreino"  element={<AlterarTreino />} />
        <Route path="/AlterarMatricula"  element={<AlterarMatricula />} />
        <Route path="/AlterarEntrada"  element={<AlterarEntrada />} />
        <Route path="/AlterarSaida"  element={<AlterarSaida />} />
        


        </Routes>
     
     </BrowserRouter>


    )
}