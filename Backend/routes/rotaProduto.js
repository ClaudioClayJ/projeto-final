const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.nome.length < 5) newErrors.nome = "O nome deve ter pelo menos 5 letras.";
    if (formData.telefone.length < 9) newErrors.telefone = "O telefone deve ter pelo menos 9 caracteres.";
    if (formData.cpf.length !== 11) newErrors.cpf = "O CPF deve ter 11 caracteres.";
    if (formData.rg.length < 7) newErrors.rg = "O RG deve ter pelo menos 7 caracteres.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        try {
            const response = await fetch('http://localhost:3001/api/matriculas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    plano: selectedPlan.nome,
                    valorPlano: selectedPlan.valor,
                    descricaoPlano: selectedPlan.descricao,
                }),
            });

            if (response.ok) {
                navigate('/success');
            } else {
                console.error('Erro ao enviar os dados:', await response.json());
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }
};
