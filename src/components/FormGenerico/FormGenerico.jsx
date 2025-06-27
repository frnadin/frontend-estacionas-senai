import { useState, useEffect } from 'react';
import './FormGenerico.css';

function FormGenerico({
    campos,
    onSubmit,
    titulo = "",
    botaoTexto = "Salvar",
    onCampoChange,
    formData: propFormData,
    setFormData: propSetFormData
}) {
    const [formDataInterno, setFormDataInterno] = useState({});

    const formData = propFormData !== undefined ? propFormData : formDataInterno;
    const setFormData = propSetFormData !== undefined ? propSetFormData : setFormDataInterno;

    useEffect(() => {
        if (propFormData === undefined) {
            setFormDataInterno({});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [campos]);

    const handleChange = (e, nome, tipo) => {
        const valor = tipo === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [nome]: valor
        });

        if (onCampoChange) {
            onCampoChange(nome, valor);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className='form-container'>
            {titulo && <h2>{titulo}</h2>}

            <form onSubmit={handleSubmit} className="form-content">
                <div className="form-generico">
                    {campos.map((campo, index) => (
                        <div key={index} className="form-group">
                            <label htmlFor={campo.nome}>{campo.rotulo}</label>

                            {campo.tipo === 'select' ? (
                                <select
                                    id={campo.nome}
                                    name={campo.nome}
                                    value={formData[campo.nome] || ''}
                                    onChange={(e) => handleChange(e, campo.nome, 'select')}
                                    required={campo.obrigatorio}
                                >
                                    <option value="">Selecione...</option>
                                    {campo.opcoes.map((op, idx) => (
                                        <option key={idx} value={op.valor}>{op.label}</option>
                                    ))}
                                </select>
                            ) : campo.tipo === 'checkbox' ? (
                                <input
                                    type="checkbox"
                                    id={campo.nome}
                                    name={campo.nome}
                                    checked={formData[campo.nome] || false}
                                    onChange={(e) => handleChange(e, campo.nome, 'checkbox')}
                                />
                            ) : (
                                <input
                                    type={campo.tipo}
                                    id={campo.nome}
                                    name={campo.nome}
                                    value={formData[campo.nome] || ''}
                                    onChange={(e) => handleChange(e, campo.nome, campo.tipo)}
                                    required={campo.obrigatorio}
                                    placeholder={campo.placeholder || '-'} 

                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn">{botaoTexto}</button>
                </div>
            </form>
        </div>
    );
}

export default FormGenerico;
