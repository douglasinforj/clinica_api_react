import React, { useState, useEffect } from 'react';
import { getClientes } from '../services/api';
import Navbar from './Navbar';

import { useNavigate } from 'react-router-dom';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [searchCpf, setSearchCpf] = useState('');
  const [searchNome, setSearchNome] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const handleSearch = () => {
    return clientes.filter(cliente =>
      cliente.cpf.includes(searchCpf) && cliente.nome.toLowerCase().includes(searchNome.toLowerCase())
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2>Clientes</h2>
        <div className="mb-3">
          <div className="form-row">
            <div className="col-md-5 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por CPF"
                value={searchCpf}
                onChange={(e) => setSearchCpf(e.target.value)}
              />
            </div>
            <div className="col-md-5 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por Nome"
                value={searchNome}
                onChange={(e) => setSearchNome(e.target.value)}
              />
            </div>
            <div className="col-md-2 mb-3">
              <button className="btn btn-primary btn-block" onClick={() => navigate('/clientes/novo')}>Criar Novo Cliente</button>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                {/*<th>RG</th>*/}
                {/*<th>Telefone</th>*/}
                {/*<th>Email</th>*/}
                {/*<th>Data de Nascimento</th>*/}
                {/*<th>Data de Cadastro</th>*/}
              </tr>
            </thead>
            <tbody>
              {handleSearch().map(cliente => (
                <tr key={cliente.id}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.cpf}</td>
                  {/*<td>{cliente.rg}</td>*/}
                  {/*<td>{cliente.telefone}</td>*/}
                  {/*<td>{cliente.email}</td>*/}
                  {/*<td>{cliente.data_nascimento}</td>*/}
                  {/*<td>{cliente.data_cadastro}</td>*/}
                  <td>
                    <button 
                      className="btn btn-info btn-sm"
                      onClick={() => navigate(`/clientes/${cliente.id}`)}
                    >
                      Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Clientes;
