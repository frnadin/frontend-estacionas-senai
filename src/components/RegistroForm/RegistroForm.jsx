import React, { useEffect, useState, useContext } from 'react';
import { criarRegistro } from '../../services/registroService';
import { listarPessoas } from '../../services/pessoaService';
import { buscarVeiculosPorUsuario, buscarVeiculosDaPessoa } from '../../services/veiculoService';
import './RegistroForm.css'
import Toast from '../Toast/Toast';
import { AuthContext } from '../../context/AuthContext';
export default function RegistroForm({ onRegistroCriado }) {
  const { usuario } = useContext(AuthContext);


  console.log('usuario no RegistroForm:', usuario);

  const [toastMessage, setToastMessage] = useState('');

  const [formData, setFormData] = useState({
    pessoa_id: '',
    veiculo_id: '',
    tipo: 'entrada',
  });

  const [pessoas, setPessoas] = useState([]);
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    const ehPessoaFisica = ['aluno', 'professor', 'funcionario'].includes(usuario?.type);
    if (ehPessoaFisica && usuario?.id) {
      setFormData(prev => ({
        ...prev,
        pessoa_id: usuario.id
      }));
    }
  }, [usuario]);

useEffect(() => {
  if (usuario?.id) {
    buscarVeiculosDaPessoa(usuario.id).then(dados => {
      console.log("Teste direto buscarVeiculosDaPessoa:", dados);
    });
  }
}, [usuario]);

  useEffect(() => {
    const ehPessoaFisica = ['aluno', 'professor', 'funcionario'].includes(usuario?.type);
    if (!ehPessoaFisica) {
      const carregarPessoas = async () => {
        try {
          const dados = await listarPessoas();
          setPessoas(dados);
        } catch (error) {
          console.error("Erro ao carregar pessoas", error);
        }
      };
      carregarPessoas();
    }
  }, [usuario]);
  
  useEffect(() => {
    const carregarVeiculos = async () => {
      if (!usuario) {
        setVeiculos([]);
        return;
      }

      const ehPessoaFisica = ['aluno', 'professor', 'funcionario'].includes(usuario.type);

      try {
        if (ehPessoaFisica) {
          if (usuario.id) {
            const dados = await buscarVeiculosDaPessoa(usuario.id);
            setVeiculos(dados);
          } else {
            setVeiculos([]);
          }
        } else {
          
          // Admin ou outros: carrega veículos da pessoa selecionada no select
          if (formData.pessoa_id) {
            const dados = await buscarVeiculosPorUsuario(formData.pessoa_id);
            setVeiculos(dados);
          } else {
            setVeiculos([]);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar veículos da pessoa", error);
        setVeiculos([]);
      }
    };

    carregarVeiculos();
  }, [usuario, formData.pessoa_id]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'pessoa_id' ? { veiculo_id: '' } : {})
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await criarRegistro(formData);
      setToastMessage('Registro criado com sucesso!');
      const ehPessoaFisica = ['aluno', 'professor', 'funcionario'].includes(usuario?.type);
      setFormData({
        pessoa_id: ehPessoaFisica ? usuario.id : '',
        veiculo_id: '',
        tipo: 'entrada',
      });
      setVeiculos([]);
      if (onRegistroCriado) onRegistroCriado();
    } catch (error) {
      const mensagemErro = error.response?.data?.error || "Erro ao criar registro.";
      console.error("Erro ao criar registro", error);
      setToastMessage(mensagemErro);
    }
  };

  const isPessoaFisica = ['aluno', 'professor', 'funcionario'].includes(usuario?.type);
  if (!usuario) {
    return <p>Carregando usuário...</p>;
  }
  return (


    <form onSubmit={handleSubmit} className="registro-form" style={{ margin: '0 auto' }}>
      <h2 className="form-title">Criar Registro</h2>

      <div className="form-group">
        <label>Pessoa:</label>
        <select
          name="pessoa_id"
          value={formData.pessoa_id}
          onChange={handleChange}
          required
          disabled={isPessoaFisica}
        >
          <option value="">Selecione uma pessoa</option>
          {isPessoaFisica && usuario?.id ? (
            <option value={usuario.id}>{usuario.name}</option>
          ) : (
            pessoas.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))
          )}
        </select>
      </div>

      <div className="form-group">
        <label>Veículo:</label>
        <select name="veiculo_id" value={formData.veiculo_id} onChange={handleChange} required disabled={!formData.pessoa_id}>
          <option value="">Selecione um veículo</option>
          {veiculos.map(v => (
            <option key={v.id} value={v.id}>{v.plate} - {v.model}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Tipo:</label>
        <select name="tipo" value={formData.tipo} onChange={handleChange}>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
      </div>

      <div className="form-group form-group-botao">
        <button type="submit" className="botao-submit">Registrar</button>
      </div>

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage('')}
        />
      )}
    </form>
  );
}
