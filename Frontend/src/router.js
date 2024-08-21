import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Produtos from './pages/produtos/index';
import Ofertas from './pages/ofertas/index';
import Localizacao from './pages/localizacao/index';
import Treinos from './pages/treinos/index';
import Matricula from './pages/matricula';
import Login from './pages/logon';
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

// // Componentes de Exclusão
// import ExcluirUsuario from './pages/excluir_usuario/index';
// import ExcluirProduto from './pages/excluir_produto/index';
// import ExcluirOferta from './pages/excluir_oferta/index';
// import ExcluirTreino from './pages/excluir_treino/index';
// import ExcluirMatricula from './pages/excluir_matricula/index';
// import ExcluirEntrada from './pages/excluir_entrada/index';
// import ExcluirSaida from './pages/excluir_saida/index';

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/Produtos" element={<Produtos />} />
                <Route path="/Ofertas" element={<Ofertas />} />
                <Route path="/Localizacao" element={<Localizacao />} />
                <Route path="/Treinos" element={<Treinos />} />
                <Route path="/Matricula" element={<Matricula />} />
                <Route path="/Login" element={<Login />} />

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

                {/* Rotas de Exclusão com ID
                <Route path="/ExcluirUsuario/:id" element={<ExcluirUsuario />} />
                <Route path="/ExcluirProduto/:id" element={<ExcluirProduto />} />
                <Route path="/ExcluirOferta/:id" element={<ExcluirOferta />} />
                <Route path="/ExcluirTreino/:id" element={<ExcluirTreino />} />
                <Route path="/ExcluirMatricula/:id" element={<ExcluirMatricula />} />
                <Route path="/ExcluirEntrada/:id" element={<ExcluirEntrada />} />
                <Route path="/ExcluirSaida/:id" element={<ExcluirSaida />} /> */}
            </Routes>
        </BrowserRouter>
    );
}
