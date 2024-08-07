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
import CadastroMatricula from './pages/alterar_matricula/index'
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
        <Route path="/Cadastro Usuario"  element={<CadastroUsuario />} />
        <Route path="/Cadastro Produto"  element={<CadastroProduto />} />
        <Route path="/Cadastro Ofertas"  element={<CadastroOfertas />} />
        <Route path="/Cadastro Matricula"  element={<CadastroMatricula />} />
        <Route path="/Cadastro Treinos"  element={<CadastroTreinos />} />
        <Route path="/Alterar Usuario"  element={<AlterarUsuario />} />
        <Route path="/Alterar Produto"  element={<AlterarProduto />} />
        <Route path="/Alterar Oferta"  element={<AlterarOferta />} />
        <Route path="/Alterar Treino"  element={<AlterarTreino />} />
        <Route path="/Alterar Matricula"  element={<AlterarMatricula />} />
        <Route path="/Excluir Usuario"  element={<ExcluirUsuario />} />
        <Route path="/Excluir Produto"  element={<ExcluirProduto />} />
        <Route path="/Excluir Oferta"  element={<ExcluirOferta />} />
        <Route path="/Excluir Treino"  element={<ExcluirTreino />} />
        <Route path="/Excluir Matricula"  element={<ExcluiraMatricula />} />


        </Routes>
     
     </BrowserRouter>


    )
}