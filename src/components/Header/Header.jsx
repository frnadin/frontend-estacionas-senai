import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Header.css';
import { FaCar, FaUserPlus, FaUserCircle, FaRegIdCard, FaPowerOff } from 'react-icons/fa';
import { MdNotificationsNone } from 'react-icons/md';
import FormGenerico from '../FormGenerico/FormGenerico.jsx';
import Modal from '../Modal/Modal.jsx';
import UserMenu from '../UserMenu/UserMenu.jsx';
import { useNavigate } from 'react-router-dom';

import { camposPessoa } from '../../data/camposPessoa.js';
import { camposVeiculos as camposVeiculosBase } from '../../data/camposVeiculo.js';
import { camposPermissao as camposPermissaoBase } from '../../data/camposPermissao.js';

import { criarPessoa, listarPessoas } from '../../services/pessoaService.js';
import { criarVeiculo, listarVeiculos, buscarVeiculosPorUsuario } from '../../services/veiculoService.js';
import { criarPermissao } from '../../services/permissaoService.js';
import Toast from '../Toast/Toast.jsx';


export default function Header({ tela, onNotificationClick, onPerfilClick }) {
  const [toastMessage, setToastMessage] = useState('');
  const [pessoas, setPessoas] = useState([]); 
  const [veiculos, setVeiculos] = useState([]);
  const [camposVeiculo, setCamposVeiculo] = useState([]);
  const [camposPermissao, setCamposPermissao] = useState([]);
  const [formDataPermissao, setFormDataPermissao] = useState({});
  const navigate = useNavigate();
  const [modalAberto, setModalAberto] = useState(null);
 

  const fetchData = useCallback(async () => {
    try {
      const listaPessoas = await listarPessoas();
      setPessoas(listaPessoas);

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
    if (modalAberto === 'pessoa' || modalAberto === 'permissao' || modalAberto === 'veiculo') {
      fetchData();
    }
  }, [modalAberto, fetchData]);

  const handleSubmitPessoa = async (dados) => {
    try {
      const response = await criarPessoa(dados);
      await fetchData();
      setToastMessage('Usuário criado com sucesso', response);
      setModalAberto(null);
    } catch (error) {
      alert('Erro ao criar usuário.', error);
    }
  };

  const handleSubmitVeiculo = async (dados) => {
    try {
      const response = await criarVeiculo(dados);
      setToastMessage('Veiculo criado com sucesso!', response);
      await fetchData();
      setModalAberto(null);
    } catch (error) {
      setToastMessage('Erro ao criar veiculo', error);
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
        console.log(error);
        atualizarOpcoesVeiculo([]);
        setFormDataPermissao(prev => ({ ...prev, veiculo_id: '' }));
      }
    }
  };

  const handleSubmitPermissao = async (dados) => {
    try {
      const response = await criarPermissao(dados);
      setToastMessage('Usuário criado com sucesso!');
      await fetchData();
      setModalAberto(null);
    } catch (error) {
      setToastMessage('Erro ao criar permissão')
       console.log(error)
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

<button onClick={onPerfilClick}>
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
        {camposVeiculo.length > 0 && (
          <FormGenerico
            titulo="Cadastro de Veiculo"
            campos={camposVeiculo}
            botaoTexto="Adicionar"
            onSubmit={handleSubmitVeiculo}
          />
        )}
      </Modal>

      <Modal isOpen={modalAberto === 'permissao'} onClose={() => setModalAberto(null)}>

        {camposPermissao.length > 0 && (
          <FormGenerico
            titulo="Cadastro de Permissão"
            campos={camposPermissao}
            botaoTexto="Adicionar"
            onSubmit={handleSubmitPermissao}
            onCampoChange={handlePermissaoChange}
            formData={formDataPermissao}
            setFormData={setFormDataPermissao}
          />
        )}

      </Modal>
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage('')}
        />
      )}

    </div >
  );

}
