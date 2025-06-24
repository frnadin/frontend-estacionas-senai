import { useState } from 'react';

import './FormGenerico.css';

function FormGenerico({ campos, onSubmit, titulo = "", botaoTexto = "Salvar" }) {
    const [formData, setFormData] = useState({});

    const handleChange = (e, nome) => {
        setFormData({
            ...formData,
            [nome]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="form-generico">
            {titulo && <h2>{titulo}</h2>}
            {campos.map((campo, index) => (
                <div
                    key={index}
                    className={`form-group`}
                >
                    <label htmlFor={campo.nome}>{campo.rotulo}</label>
                    <input
                        type={campo.tipo}
                        id={campo.nome}
                        name={campo.nome}
                        value={formData[campo.nome] || ''}
                        onChange={(e) => handleChange(e, campo.nome)}
                        required={campo.obrigatorio}
                    />
                </div>
            ))}

            <button type="submit">{botaoTexto}</button>
        </form>
    );

}
export default FormGenerico;