import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getClienteDetalhes, updateClienteFoto, deleteCliente, getExamesDoCliente, updateCliente } from '../services/api';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ClientesDetalhes.css';

const ClienteDetalhes = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [cliente, setCliente] = useState(null);
    const [foto, setFoto] = useState(null);
    const [exames, setExames] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [dadosAtualizados, setDadosAtualizados] = useState(false);

    useEffect(() => {
        const fetchClienteDetalhes = async () => {
            try {
                const data = await getClienteDetalhes(id);
                setCliente(data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do cliente:', error);
            }
        };

        const fetchExames = async () => {
            try {
                const data = await getExamesDoCliente(id);
                setExames(data);
            } catch (error) {
                console.error('Erro ao buscar exames do cliente:', error);
            }
        };

        fetchClienteDetalhes();
        fetchExames();
    }, [id, dadosAtualizados]);

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

    const handleDeleteCliente = async () => {
        if (window.confirm('Tem certeza que deseja deletar este cliente?')) {
            try {
                await deleteCliente(id);
                navigate('/clientes'); // Redireciona para a lista de clientes após a exclusão
            } catch (error) {
                console.error('Erro ao deletar o cliente:', error.response || error.message);
            }
        }
    };

    const handleUpdateCliente = async (e) => {
        e.preventDefault();

        const novosDados = {
            nome: e.target.nome.value,
            cpf: e.target.cpf.value,
            rg: e.target.rg.value,
            telefone: e.target.telefone.value,
            email: e.target.email.value,
            data_nascimento: e.target.data_nascimento.value,
            data_cadastro: e.target.data_cadastro.value,
        };

        try {
            await updateCliente(id, novosDados);
            console.log('Dados do cliente atualizados com sucesso.');
            setDadosAtualizados(!dadosAtualizados);
            setIsEditing(false); // Volta ao modo de visualização após atualizar
        } catch (error) {
            console.error('Erro ao atualizar dados do cliente:', error);
        }
    };

    const handleEditClick = () => {
        console.log('Entrando no modo de edição');
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        console.log('Cancelando a edição');
        setIsEditing(false);
    };

    if (!cliente) {
        return <div className="container mt-5">Carregando...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2 className="text-center">Detalhes do Cliente</h2>
                        <div className="text-center">
                            <img src={cliente.foto} alt="Foto do Cliente" className="img-thumbnail" style={{ width: '150px', height: '150px' }} />
                        </div>
                        <form onSubmit={handleFotoSubmit} className="mt-3 text-center">
                            <input type="file" onChange={handleFotoChange} className="form-control-file" />
                            <button type="submit" className="btn btn-primary mt-2">Atualizar Foto</button>
                        </form>
                        <form onSubmit={handleUpdateCliente} className="mt-3">
                            <div className="form-group">
                                <label htmlFor="nome">Nome:</label>
                                <input type="text" className="form-control" id="nome" defaultValue={cliente.nome} required disabled={!isEditing} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cpf">CPF:</label>
                                <input type="text" className="form-control" id="cpf" defaultValue={cliente.cpf} required disabled={!isEditing} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="rg">RG:</label>
                                <input type="text" className="form-control" id="rg" defaultValue={cliente.rg} required disabled={!isEditing} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="telefone">Telefone:</label>
                                <input type="text" className="form-control" id="telefone" defaultValue={cliente.telefone} required disabled={!isEditing} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" className="form-control" id="email" defaultValue={cliente.email} required disabled={!isEditing} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="data_nascimento">Data de Nascimento:</label>
                                <input type="date" className="form-control" id="data_nascimento" defaultValue={cliente.data_nascimento} required disabled={!isEditing} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="data_cadastro">Data de Cadastro:</label>
                                <input type="date" className="form-control" id="data_cadastro" defaultValue={cliente.data_cadastro} required disabled={!isEditing} />
                            </div>
                            {isEditing ? (
                                <>
                                    <button type="submit" className="btn btn-primary w-100">Salvar</button>
                                    <button type="button" className="btn btn-secondary w-100 mt-2" onClick={handleCancelEdit}>Cancelar</button>
                                </>
                            ) : (
                                <button type="button" className="btn btn-secondary w-100" onClick={handleEditClick}>Editar</button>
                            )}
                        </form>
                        <button className="btn btn-danger w-100 mt-3" onClick={handleDeleteCliente}>Deletar Cliente</button>
                        <Link to={`/clientes/${id}/add-exame`} className="btn btn-success w-100 mt-3">Adicionar Exame</Link>
                        <div className="mt-4">
                            <h3 className="text-center">Exames do Cliente</h3>
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
                                            <td>{exame.exame_nome}</td>
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
        </div>
    );
};

export default ClienteDetalhes;
