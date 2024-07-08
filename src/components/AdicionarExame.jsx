import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createExameDoCliente, fetchExames } from '../services/api';

const AdicionarExame = () => {
    const { id } = useParams(); // ID do cliente
    const navigate = useNavigate();

    const [novoExame, setNovoExame] = useState({
        exame: '', // ID do exame selecionado
        data_exame: '',
        data_entrega: '',
        comentarios_resultados: '',
        preco: '',
        documentos_exames: null, // Campo para arquivos
    });

    const [exames, setExames] = useState([]); // Lista de exames disponíveis

    useEffect(() => {
        const fetchData = async () => {
            const examesData = await fetchExames();
            setExames(examesData);
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoExame((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setNovoExame((prevState) => ({
            ...prevState,
            documentos_exames: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Criar um FormData para enviar os dados do exame junto com o arquivo
        const formData = new FormData();
        formData.append('cliente', id);
        formData.append('exame', novoExame.exame);
        formData.append('data_exame', novoExame.data_exame);
        formData.append('data_entrega', novoExame.data_entrega);
        formData.append('comentarios_resultados', novoExame.comentarios_resultados);
        formData.append('preco', novoExame.preco);
        if (novoExame.documentos_exames) {
            formData.append('documentos_exames', novoExame.documentos_exames);
        }

        try {
            await createExameDoCliente(formData);
            console.log('Exame criado com sucesso.');
            navigate(`/clientes/${id}`); // Redireciona de volta para os detalhes do cliente após criar o exame
        } catch (error) {
            console.error('Erro ao criar exame:', error.response.data);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center">Adicionar Novo Exame</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exame">Selecione o Exame:</label>
                            <select
                                className="form-control"
                                id="exame"
                                name="exame"
                                value={novoExame.exame}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Selecione um exame</option>
                                {exames.map(exame => (
                                    <option key={exame.id} value={exame.id}>{exame.nome}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="data_exame">Data do Exame:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="data_exame"
                                name="data_exame"
                                value={novoExame.data_exame}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="data_entrega">Data de Entrega:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="data_entrega"
                                name="data_entrega"
                                value={novoExame.data_entrega}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="comentarios_resultados">Comentários/Resultados:</label>
                            <textarea
                                className="form-control"
                                id="comentarios_resultados"
                                name="comentarios_resultados"
                                value={novoExame.comentarios_resultados}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="preco">Preço:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="preco"
                                name="preco"
                                value={novoExame.preco}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="documentos_exames">Documentos de Exames:</label>
                            <input
                                type="file"
                                className="form-control"
                                id="documentos_exames"
                                name="documentos_exames"
                                onChange={handleFileChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Salvar Exame</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdicionarExame;
