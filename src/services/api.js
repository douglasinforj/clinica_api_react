import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000', 
})

export const login = async (username, password) => {
    const response = await api.post('/api/token', {
        username,
        password,
    });
    return response.data;
}


//--------------------------Tratando Cliente-------------------------------

export const getClientes = async () => {
    try {
      const response = await api.get('/clientes/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error;
    }
  };

export const createCliente = async (cliente) => {
  try {

    const formData = new FormData();
    for (const key in cliente) {
      formData.append(key, cliente[key]);
  }

    const response = await api.post('/clientes/', cliente, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Inclua o token de autenticação
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Erro 401: Não autorizado. Verifique seu token de autenticação.');
    } else if (error.response && error.response.status === 404) {
      console.error('Erro 404: Endpoint não encontrado. Verifique a URL da API.');
    } else {
      console.error('Erro ao criar cliente:', error);
    }
    throw error;
  }
};




export const getClienteDetalhes = async (id) =>{
  const token = localStorage.getItem('token');
  const response = await api.get(`/clientes/${id}/`,{
    headers:{
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}



export const updateClienteFoto = async (clienteId, formData) => {
  const token = localStorage.getItem('token');
  console.log('Token:', token); // Log do token
  for (var pair of formData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); // Log de cada par chave-valor no FormData
  }
  try {
    const response = await api.patch(`/clientes/${clienteId}/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Resposta da API:', response.data); // Log da resposta
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar foto do cliente:', error.response || error.message); // Log detalhado
    throw error;
  }
};



export const updateCliente = async (id, dadosCliente) => {
  const token = localStorage.getItem('token');
  try {
      
      const response = await api.put(`/clientes/${id}/`, dadosCliente, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
              
          },
      });
      return response.data;
  } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw error;
  }
};


export const deleteCliente = async (clienteId) => {
  const token = localStorage.getItem('token');
  const response = await api.delete(`/clientes/${clienteId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//----------------------Tratando Exames-------------------


export const getExamesDoCliente = async (clienteId) => {
  const token = localStorage.getItem('token');
  const response = await api.get(`/exames-marcados/?cliente=${clienteId}`,{
    headers: {
      Authorization:`Bearer ${token}`,
    },
  });
  return response.data;
}


export const createExameDoCliente = async (formData) => {   //Cria novo exame Para o cliente
  const token = localStorage.getItem('token');
  try {
    const response = await api.post(`/exames-marcados/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar exame:', error.response);
    throw error;
  }
};
  
export const fetchExames = async () => {                //Percorre dados da tabela Exames
  const token = localStorage.getItem('token');
  try {
    const response = await api.get('/exames/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar exames:', error.response);
    throw error;
  }
};

export const fetchExamesPorCliente = async (clienteId) => {   //Busca os exames marcados dos Cliente para exibir em seus detalhes
  const token = localStorage.getItem('token');
  try {
    const response = await api.get(`/exames-marcados/?cliente=${clienteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar exames do cliente:', error.response);
    throw error;
  }
};





export default api