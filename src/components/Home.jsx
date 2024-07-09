import React from 'react';
import Navbar from './Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    return (
        <div className="text-center">
            <Navbar />
            <br></br>
            <img src='/images/logo.png' alt='Logo' className='img-fluid mb-4' style={{ maxWidth: '200px', marginTop: '50px' }} />
            <h1 class="mt-4">EXAMCLIN</h1>
            <p class="lead">Utilize o menu acima para navegar pelas opções de cadastro de clientes e marcação de exames.</p>
        </div>
    );
};

export default Home;