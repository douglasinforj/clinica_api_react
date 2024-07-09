import React, { useState, useEffect } from 'react';
import { getAllExamesMarcados } from '../services/api';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ExamesAgendados.css';

const ExamesAgendados = () => {
  const [exames, setExames] = useState([]);
  const [filteredExames, setFilteredExames] = useState([]);
  const [nome, setNome] = useState('');
  

  useEffect(() => {
    const fetchExames = async () => {
      try {
        const data = await getAllExamesMarcados();
        setExames(data);
        setFilteredExames(data);
      } catch (error) {
        console.error('Erro ao buscar exames marcados:', error);
      }
    };

    fetchExames();
  }, []);

  const handleSearch = () => {
    const filtered = exames.filter(exame => {
      const clienteNome = exame.cliente_nome ? exame.cliente_nome.toLowerCase() : '';
      
      return clienteNome.includes(nome.toLowerCase());
    });
    setFilteredExames(filtered);
  };

  const handleNomeChange = (e) => {
    setNome(e.target.value);
    handleSearch();
  };



  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center">Todos os Exames Agendados</h2>
        <form className="form-inline mb-4">
          <div className="form-group mr-3">
            <label htmlFor="nome" className="mr-2">Nome:</label>
            <input 
              type="text" 
              className="form-control" 
              id="nome" 
              value={nome} 
              onChange={handleNomeChange} 
            />
          </div>
          
        </form>
        <table className="table table-bordered mt-4">
          <thead className="thead-light">
            <tr>
              <th>Nome do Cliente</th>
              <th>Nome do Exame</th>
              <th>Data do Exame</th>
              <th>Data de Entrega</th>
              <th>Comentários</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {filteredExames.map(exame => (
              <tr key={exame.id}>
                <td>{exame.cliente_nome}</td>
                <td>{exame.exame_nome}</td>
                <td>{exame.data_exame}</td>
                <td>{exame.date_entrega_exame}</td>
                <td>{exame.comentarios_resultados}</td>
                <td>{exame.preco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamesAgendados;
