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
import AlterarUsuario from './pages/alterar_usuario/index'
import AlterarProduto from './pages/alterar-produto/index'
import AlterarOferta from './pages/alterar_ofertas/index'
import AlterarTreino from './pages/alterar_treino/index'
import AlterarMatricula from './pages/alterar_matricula/index'
import ExcluirUsuario from './pages/excluir_usuario/index'
import ExcluirProduto from './pages/excluir_produto/index'
import ExcluirOferta from './pages/excluir_ofertas/index'
import ExcluirTreino from './pages/excluir_treino/index'
import ExcluiraMatricula from './pages/excluir_matricula/index'


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
        <Route path="/AlterarUsuario"  element={<AlterarUsuario />} />
        <Route path="/AlterarProduto"  element={<AlterarProduto />} />
        <Route path="/AlterarOferta"  element={<AlterarOferta />} />
        <Route path="/AlterarTreino"  element={<AlterarTreino />} />
        <Route path="/AlterarMatricula"  element={<AlterarMatricula />} />
        <Route path="/ExcluirUsuario"  element={<ExcluirUsuario />} />
        <Route path="/ExcluirProduto"  element={<ExcluirProduto />} />
        <Route path="/ExcluirOferta"  element={<ExcluirOferta />} />
        <Route path="/ExcluirTreino"  element={<ExcluirTreino />} />
        <Route path="/ExcluirMatricula"  element={<ExcluiraMatricula />} />


        </Routes>
     
     </BrowserRouter>


    )
}