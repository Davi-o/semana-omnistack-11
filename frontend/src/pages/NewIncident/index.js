import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const ongId = localStorage.getItem('ongId');

        const data = {
            title,
            description,
            value
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });

            alert('Caso cadastrado com sucesso.');

            history.push('/profile');
        } catch (e) {
            alert('Erro ao cadastrar caso, tente novamente.')
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">

                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar um héroi para resolver isso
                    </p>
                    <Link className="back-link" to="/profile">
                        < FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Título do Caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <textarea
                        placeholder="Descricao"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}