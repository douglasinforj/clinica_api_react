import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getClienteDetalhes, updateClienteFoto, getExamesDoCliente } from '../services/api';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ClientesDetalhes.css';  // Importa o arquivo de estilos personalizados

const ClienteDetalhes = () => {
    const { id } = useParams();
    const [cliente, setCliente] = useState(null);
    const [foto, setFoto] = useState(null);
    const [exames, setExames] = useState([]);

    useEffect(() => {
        const fetchClienteDetalhes = async () => {
            const data = await getClienteDetalhes(id);
            setCliente(data);
        };

        const fetchExames = async () => {
            const data = await getExamesDoCliente(id);
            setExames(data);
        };

        fetchClienteDetalhes();
        fetchExames();
    }, [id]);

    const handleFotoChange = (e) => {
        setFoto(e.target.files[0]);
    };

    const handleFotoSubmit = async (e) => {
        e.preventDefault();

        if (!foto) {
            console.error('Nenhuma foto selecionada.');
            return;
        }

        const formData = new FormData();
        formData.append('foto', foto);

        try {
            await updateClienteFoto(id, formData);
            const updatedCliente = await getClienteDetalhes(id);
            setCliente(updatedCliente);
            console.log('Foto atualizada com sucesso.');
        } catch (error) {
            console.error('Erro ao atualizar a foto do cliente:', error.response || error.message);
        }
    };

    if (!cliente) {
        return <div className="container mt-5">Carregando...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h2>Detalhes do Cliente</h2>
                <div className="row">
                    <div className="col-md-4 text-center">
                        <img src={cliente.foto} alt="Foto do Cliente" className="img-thumbnail foto-cliente" />
                        <form onSubmit={handleFotoSubmit} className="mt-3">
                            <input type="file" onChange={handleFotoChange} className="form-control-file" />
                            <button type="submit" className="btn btn-primary mt-2">Atualizar Foto</button>
                        </form>
                    </div>
                    <div className="col-md-8">
                        <h3>Informações do Cliente</h3>
                        <p><strong>Nome:</strong> {cliente.nome}</p>
                        <p><strong>CPF:</strong> {cliente.cpf}</p>
                        <p><strong>RG:</strong> {cliente.rg}</p>
                        <p><strong>Telefone:</strong> {cliente.telefone}</p>
                        <p><strong>Email:</strong> {cliente.email}</p>
                        <p><strong>Data de Nascimento:</strong> {cliente.data_nascimento}</p>
                        <p><strong>Data de Cadastro:</strong> {cliente.data_cadastro}</p>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <h3>Exames do Cliente</h3>
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th>Nome do Exame</th>
                                    <th>Data do Exame</th>
                                    <th>Data de Entrega</th>
                                    <th>Comentários</th>
                                    <th>Preço</th>
                                </tr>
                            </thead>
                            <tbody>
                                {exames.map(exame => (
                                    <tr key={exame.id}>
                                        <td>{exame.exame.nome}</td>
                                        <td>{exame.data_exame}</td>
                                        <td>{exame.data_entrega}</td>
                                        <td>{exame.comentarios_resultados}</td>
                                        <td>{exame.preco}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClienteDetalhes;
