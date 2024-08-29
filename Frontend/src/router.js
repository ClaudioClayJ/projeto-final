import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Páginas e Componentes
import Dashboard from './pages/dashboard';
import Produtos from './pages/produtos/index';
import Ofertas from './pages/ofertas/index';
import Localizacao from './pages/localizacao/index';
import Treinos from './pages/treinos/index';
import Matricula from './pages/matricula/index';
import Estoque from './pages/estoque/index';
import Login from './pages/logon/index';
import CadastroUsuario from './pages/cadastro_usuario/index';
import CadastroProduto from './pages/cadastro_produto/index';
import CadastroOfertas from './pages/cadastro_ofertas/index';
import CadastroMatricula from './pages/cadastro_matricula/index';
import CadastroTreinos from './pages/cadastro_treino/index';
import CadastroEntrada from './pages/cadastro_entrada/index';
import CadastroSaida from './pages/cadastro_saida/index';
import AlterarUsuario from './pages/alterar_usuario/index';
import AlterarProduto from './pages/alterar-produto/index';
import AlterarOferta from './pages/alterar_ofertas/index';
import AlterarTreino from './pages/alterar_treino/index';
import AlterarMatricula from './pages/alterar_matricula/index';
import AlterarEntrada from './pages/alterar_entrada/index';
import AlterarSaida from './pages/alterar_saida/index';
import ListaUsuarios from './pages/lista_usuario/index';
import ListaProdutos from './pages/lista_produto/index';
import ListaOfertas from './pages/lista_ofertas/index';
import ListaTreinos from './pages/lista_treinos/index';
import ListaMatriculas from './pages/lista_matriculas/index';
import ListaEntradas from './pages/lista_entrada/index';
import ListaSaidas from './pages/lista_saida/index';

// Componente de Rotas
export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rotas Principais */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/Produtos" element={<Produtos />} />
                <Route path="/Ofertas" element={<Ofertas />} />
                <Route path="/Localizacao" element={<Localizacao />} />
                <Route path="/Treinos" element={<Treinos />} />
                <Route path="/Matricula" element={<Matricula />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/EStoque" element={<Estoque />} />

                {/* Rotas de Cadastro */}
                <Route path="/CadastroUsuario" element={<CadastroUsuario />} />
                <Route path="/CadastroProduto" element={<CadastroProduto />} />
                <Route path="/CadastroOfertas" element={<CadastroOfertas />} />
                <Route path="/CadastroMatricula" element={<CadastroMatricula />} />
                <Route path="/CadastroTreinos" element={<CadastroTreinos />} />
                <Route path="/CadastroEntrada" element={<CadastroEntrada />} />
                <Route path="/CadastroSaida" element={<CadastroSaida />} />

                {/* Rotas de Alteração com ID */}
                <Route path="/AlterarUsuario/:id" element={<AlterarUsuario />} />
                <Route path="/AlterarProduto/:id" element={<AlterarProduto />} />
                <Route path="/AlterarOferta/:id" element={<AlterarOferta />} />
                <Route path="/AlterarTreino/:id" element={<AlterarTreino />} />
                <Route path="/AlterarMatricula/:id" element={<AlterarMatricula />} />
                <Route path="/AlterarEntrada/:id" element={<AlterarEntrada />} />
                <Route path="/AlterarSaida/:id" element={<AlterarSaida />} />

                {/* Rotas de Exclusão (comentadas, removê-las se não necessárias) */}
                {/* <Route path="/ExcluirUsuario/:id" element={<ExcluirUsuario />} />
                <Route path="/ExcluirProduto/:id" element={<ExcluirProduto />} />
                <Route path="/ExcluirOferta/:id" element={<ExcluirOferta />} />
                <Route path="/ExcluirTreino/:id" element={<ExcluirTreino />} />
                <Route path="/ExcluirMatricula/:id" element={<ExcluirMatricula />} />
                <Route path="/ExcluirEntrada/:id" element={<ExcluirEntrada />} />
                <Route path="/ExcluirSaida/:id" element={<ExcluirSaida />} /> */}

                {/* Rotas de Listagem */}
                <Route path="/ListaUsuarios" element={<ListaUsuarios />} />
                <Route path="/ListaProdutos" element={<ListaProdutos />} />
                <Route path="/ListaOfertas" element={<ListaOfertas />} />
                <Route path="/ListaTreinos" element={<ListaTreinos />} />
                <Route path="/ListaMatriculas" element={<ListaMatriculas />} />
                <Route path="/ListaEntradas" element={<ListaEntradas />} />
                <Route path="/ListaSaidas" element={<ListaSaidas />} />
            </Routes>
        </BrowserRouter>
    );
}
