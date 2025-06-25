import React from 'react';
import './Header.css';
import { FaCar, FaUserPlus, FaUserCircle, FaRegIdCard, FaPowerOff } from 'react-icons/fa';
import { MdNotificationsNone } from 'react-icons/md';
import { useState, useEffect, useCallback } from 'react';
import FormGenerico from '../FormGenerico/FormGenerico.jsx';
import Modal from '../Modal/Modal.jsx';
import { useNavigate } from 'react-router-dom';
import { camposPessoa } from '../../data/camposPessoa.js';
import { camposVeiculos as camposVeiculosBase } from '../../data/camposVeiculo.js';
import { camposPermissao as camposPermissaoBase } from '../../data/camposPermissao.js';


import { criarPessoa, listarPessoas } from '../../services/pessoaService.js';
import { criarVeiculo, listarVeiculos, buscarVeiculosPorUsuario } from '../../services/veiculoService.js';
import { criarPermissao } from '../../services/permissaoService.js';


export default function Header({ tela, onNotificationClick }) {
  const [pessoas, setPessoas] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [camposVeiculo, setCamposVeiculo] = useState([]);
  const [camposPermissao, setCamposPermissao] = useState([]);
  const [formDataPermissao, setFormDataPermissao] = useState({});
  const navigate = useNavigate();
  const [modalAberto, setModalAberto] = useState(null);

  // Moved inside the component and memoized with useCallback
  const fetchData = useCallback(async () => {
    try {
      const listaPessoas = await listarPessoas();
      setPessoas(listaPessoas);

      // Atualiza camposVeiculo
      const novosCamposVeiculo = camposVeiculosBase.map(campo => {
        if (campo.nome === 'id_usuario') {
          return {
            ...campo,
            tipo: 'select',
            opcoes: listaPessoas.map(p => ({ label: p.name, valor: p.id })),
            obrigatorio: true
          };
        }
        return campo;
      });
      setCamposVeiculo(novosCamposVeiculo);

      // Atualiza camposPermissao
      const novosCamposPermissao = camposPermissaoBase.map(campo => {
        if (campo.nome === 'pessoa_id') {
          return {
            ...campo,
            tipo: 'select',
            opcoes: listaPessoas.map(p => ({ label: p.name, valor: p.id })),
            obrigatorio: true
          };
        }
        if (campo.nome === 'veiculo_id') {
          return {
            ...campo,
            tipo: 'select',
            opcoes: [],
            obrigatorio: true
          };
        }
        return campo;
      });
      setCamposPermissao(novosCamposPermissao);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }, []);

  useEffect(() => {
      console.log('modalAberto mudou para:', modalAberto);

    if (modalAberto === 'pessoa' || modalAberto === 'permissao' || modalAberto === 'veiculo') {
      fetchData();
    }
  }, [modalAberto, fetchData]);


  const handleSubmitPessoa = async (dados) => {
    try {
      const response = await criarPessoa(dados);
      console.log('Pessoa cadastrada com sucesso:', response);
      await fetchData(); 
      setModalAberto(null);
    } catch (error) {
      console.error('Erro ao cadastrar pessoa:', error);
      alert('Erro ao criar usuário.');
    }
  };
  const handleSubmitVeiculo = async (dados) => {
    try {
      const response = await criarVeiculo(dados);
      alert('Veiculo criado com sucesso!', response);
      await fetchData(); 
      setModalAberto(null);
    } catch (error) {
      alert('Erro ao criar veiculo', error);
    }
  };

  const handlePermissaoChange = async (nome, valor) => {
    setFormDataPermissao(prev => ({ ...prev, [nome]: valor }));

    if (nome === 'pessoa_id') {
      if (!valor) {
        atualizarOpcoesVeiculo([]);
        setFormDataPermissao(prev => ({ ...prev, veiculo_id: '' })); 
        return;
      }
      try {
        const veiculos = await buscarVeiculosPorUsuario(valor);
        atualizarOpcoesVeiculo(veiculos);

        setFormDataPermissao(prev => ({ ...prev, veiculo_id: '' }));
      } catch (error) {
        console.error('Erro ao buscar veículos da pessoa:', error);
        atualizarOpcoesVeiculo([]);
        setFormDataPermissao(prev => ({ ...prev, veiculo_id: '' }));
      }
    }
  };


  const handleSubmitPermissao = async (dados) => {
    try {
      const response = await criarPermissao(dados);
      alert('Permissão criada com sucesso!', response);
      await fetchData(); 
      setModalAberto(null);
    } catch (error) {
      alert('Erro ao criar permissão', error);
    }
  };


  // VER ISSO 
  // eslint-disable-next-line no-unused-vars
  const handlePessoaChange = async (pessoaId) => {
    if (!pessoaId) {
      atualizarOpcoesVeiculo([]);
      return;
    }
    try {
      const veiculos = await buscarVeiculosPorUsuario(pessoaId);
      atualizarOpcoesVeiculo(veiculos);
    } catch (error) {
      console.error('Erro ao buscar veículos da pessoa:', error);
      atualizarOpcoesVeiculo([]);
    }
  };

  const atualizarOpcoesVeiculo = (veiculos) => {
    setCamposPermissao(prevCampos =>
      prevCampos.map(campo => {
        if (campo.nome === 'veiculo_id') {
          return {
            ...campo,
            opcoes: veiculos.map(v => ({ label: `${v.plate} - ${v.model}`, valor: v.id })),
          };
        }
        return campo;
      })
    );
  };



  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="header">
      <div id='space'></div>
      <h2 className="header-title">{tela}</h2>

      <div className="header-icons">

        <button onClick={() => setModalAberto('pessoa')} className="btn-teste-formulario">
          <FaUserPlus />
        </button>
        <button onClick={() => setModalAberto('veiculo')} className="btn-teste-formulario">
          <FaCar />
        </button>


        <button onClick={() => setModalAberto('permissao')} className="btn-teste-formulario">
          <FaRegIdCard />
        </button>

        <button onClick={onNotificationClick}>
          <MdNotificationsNone />
        </button>

        <button onClick={() => console.log("Perfil")}>
          <FaUserCircle />
        </button>
        <button onClick={handleLogout}>
          <FaPowerOff />
        </button>
      </div>

      <Modal isOpen={modalAberto === 'pessoa'} onClose={() => setModalAberto(null)}>
        <FormGenerico
          titulo="Cadastro de Usuário"
          campos={camposPessoa}
          botaoTexto="Adicionar"
          onSubmit={handleSubmitPessoa}
        />
      </Modal>
      <Modal isOpen={modalAberto === 'veiculo'} onClose={() => setModalAberto(null)}>
        <FormGenerico
          titulo="Cadastro de Veiculo"
          campos={camposVeiculo}
          botaoTexto="Adicionar"
          onSubmit={handleSubmitVeiculo}
        />
      </Modal>
      <Modal isOpen={modalAberto === 'permissao'} onClose={() => setModalAberto(null)}>
        <FormGenerico
          titulo="Cadastro de Permissão"
          campos={camposPermissao}
          botaoTexto="Adicionar"
          onSubmit={handleSubmitPermissao}
          onCampoChange={handlePermissaoChange}
          formData={formDataPermissao}
          setFormData={setFormDataPermissao}
        />

      </Modal>



    </div >
  );
}