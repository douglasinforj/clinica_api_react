import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCliente } from '../services/api';
import Navbar from './Navbar';

const NovoCliente = () => {
  const [cliente, setCliente] = useState({
    nome: '',
    rg: '',
    cpf: '',
    telefone: '',
    email: '',
    data_nascimento: '',
    foto: null, // Adiciona o campo foto
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'foto') {
      setCliente({ ...cliente, [e.target.name]: e.target.files[0] });
    } else {
      setCliente({ ...cliente, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in cliente) {
      formData.append(key, cliente[key]);
    }

    try {
      await createCliente(formData);
      navigate('/clientes');
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      // Adicione qualquer tratamento de erro adicional aqui
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-4">Novo Cliente</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              name="nome"
              value={cliente.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rg">RG:</label>
            <input
              type="text"
              className="form-control"
              id="rg"
              name="rg"
              value={cliente.rg}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              className="form-control"
              id="cpf"
              name="cpf"
              value={cliente.cpf}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="text"
              className="form-control"
              id="telefone"
              name="telefone"
              value={cliente.telefone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={cliente.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="data_nascimento">Data de Nascimento:</label>
            <input
              type="date"
              className="form-control"
              id="data_nascimento"
              name="data_nascimento"
              value={cliente.data_nascimento}
              onChange={handleChange}
              required
            />
          </div>
          <br></br>
          <div className="form-group">
            <label htmlFor="foto">Foto:</label>
            <input
              type="file"
              className="form-control-file"
              id="foto"
              name="foto"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          <br></br>
          <button type="submit" className="btn btn-primary btn-block">Salvar</button>
        </form>
      </div>
    </div>
  );
};

export default NovoCliente;
