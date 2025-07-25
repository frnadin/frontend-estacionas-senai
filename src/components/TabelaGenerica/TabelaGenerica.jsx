import React, { useState, useMemo } from 'react';
import './TabelaGenerica.css';
import { FaInfoCircle, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function TabelaGenerica({
    dados,
    colunas,
    filtros,
    titulo = "",
    editandoId,
    dadosEditados,
    setDadosEditados,
    onIniciarEdicao,
    onCancelarEdicao,
    onSalvarEdicao,
    onRemover,
    onDetalhes,
}) {
    const [busca, setBusca] = useState("");

    const acessarValorAninhado = (obj, caminho) => {
        return caminho.split('.').reduce((acc, parte) => acc?.[parte], obj);
    };


    const handleChangeEdit = (chave, valor) => {
        setDadosEditados(prev => ({
            ...prev,
            [chave]: valor,
        }));
    };

    const dadosFiltrados = useMemo(() => {
        const buscaLower = busca.toLowerCase();
        return dados.filter((item) =>
            filtros.some((filtro) => {
                const valor = acessarValorAninhado(item, filtro);
                return valor && valor.toString().toLowerCase().includes(buscaLower);
            })
        );
    }, [busca, dados, filtros]);



 return (
    <div className="tabela-container">
      <h1>{titulo}</h1>
      <input
        type="text"
        placeholder="Buscar..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="input-busca"
      />
      <div className="tabela-wrapper">
        <table className="tabela">
          <thead>
            <tr>
              {colunas.map((coluna, idx) => (
                <th key={idx}>{coluna.rotulo}</th>
              ))}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {dadosFiltrados.map((item) => (
              <tr key={item.id}>
                {colunas.map((coluna) => (
                  <td key={coluna.chave}>
                    {editandoId === item.id ? (
                      <input
                        type="text"
                        value={dadosEditados[coluna.chave] || ''}
                        onChange={(e) =>
                          handleChangeEdit(coluna.chave, e.target.value)
                        }
                      />
                    ) : (
                      (() => {
                        const valor = acessarValorAninhado(item, coluna.chave);

                        if (
                          typeof valor === 'string' &&
                          !isNaN(Date.parse(valor)) &&
                          valor.includes('T')
                        ) {
                          const data = new Date(valor);
                          return data.toLocaleDateString('pt-BR');
                        }
                        if (coluna.chave === 'autorizado') {
                          return valor ? (
                            <FaCheckCircle
                              color="green"
                              style={{ display: 'block', margin: '0 auto' }}
                            />
                          ) : (
                            <FaTimesCircle
                              color="red"
                              style={{ display: 'block', margin: '0 auto' }}
                            />
                          );
                        }

                        return valor;
                      })()
                    )}
                  </td>
                ))}
                <td>
                  <div className="menu-acoes">
                    {editandoId === item.id ? (
                      <>
                        <button onClick={onSalvarEdicao} title="Salvar">
                          <FaCheckCircle size={18} color="green" />
                        </button>
                        <button onClick={onCancelarEdicao} title="Cancelar">
                          <FaTimesCircle size={18} color="red" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => onDetalhes?.(item)}
                          title="Detalhes"
                        >
                          <FaInfoCircle size={18} />
                        </button>
                        <button
                          onClick={() => onIniciarEdicao(item)}
                          title="Editar"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button onClick={() => onRemover?.(item)} title="Remover">
                          <FaTrash size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}