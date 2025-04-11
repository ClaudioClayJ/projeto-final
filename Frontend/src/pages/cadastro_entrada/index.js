import React, { useEffect, useState } from 'react';

const CadastroEntrada = () => {
    const [produtos, setProdutos] = useState([]);
    const [id_produto, setId_Produto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor_unitario, setValor_Unitario] = useState('');
    const [data_entrada, setData_Entrada] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/produtos');
                const data = await response.json();
                setProdutos(data.produtos);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProdutos();
    }, []);

    const handleCadastro = async (e) => {
        e.preventDefault();

        const entradaData = {
            id_produto,
            quantidade: parseFloat(quantidade),
            valor_unitario: parseFloat(valor_unitario),
            data_entrada
        };

        try {
            const response = await fetch("http://localhost:3001/api/entradas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(entradaData)
            });

            if (response.ok) {
                alert("Entrada cadastrada com sucesso!");
                setId_Produto('');
                setQuantidade('');
                setValor_Unitario('');
                setData_Entrada('');
            } else {
                const errorData = await response.json();
                alert(`Erro: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Erro ao cadastrar entrada:", error);
            alert("Erro ao cadastrar. Tente novamente.");
        }
    };

    return (
        <div>
            <h2>Cadastro de Entrada</h2>
            {loading ? (
                <p>Carregando produtos...</p>
            ) : (
                <form onSubmit={handleCadastro}>
                    <label>Produto:</label>
                    <select value={id_produto} onChange={e => setId_Produto(e.target.value)} required>
                        <option value="">Selecione</option>
                        {produtos.map(produto => (
                            <option key={produto.id} value={produto.id}>
                                {produto.nome}
                            </option>
                        ))}
                    </select>

                    <label>Quantidade:</label>
                    <input type="number" value={quantidade} onChange={e => setQuantidade(e.target.value)} required />

                    <label>Valor Unitário:</label>
                    <input type="number" step="0.01" value={valor_unitario} onChange={e => setValor_Unitario(e.target.value)} required />

                    <label>Data da Entrada:</label>
                    <input type="date" value={data_entrada} onChange={e => setData_Entrada(e.target.value)} required />

                    <button type="submit">Cadastrar Entrada</button>
                </form>
            )}
        </div>
    );
};

export default CadastroEntrada;
