import React, { useState, useEffect, useCallback, useContext } from 'react';
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
import { criarVeiculo, buscarVeiculosPorUsuario, criarMeuVeiculo } from '../../services/veiculoService.js';
import { criarPermissao } from '../../services/permissaoService.js';
import Toast from '../Toast/Toast.jsx';

import { AuthContext } from '../../context/AuthContext.jsx';

export default function Header({ tela, onNotificationClick, onPerfilClick }) {
  const { usuario } = useContext(AuthContext);
  const [toastMessage, setToastMessage] = useState('');
  const [pessoas, setPessoas] = useState([]);
  const [camposVeiculo, setCamposVeiculo] = useState([]);
  const [camposPermissao, setCamposPermissao] = useState([]);
  const [formDataPermissao, setFormDataPermissao] = useState({});
  const navigate = useNavigate();
  const [modalAberto, setModalAberto] = useState(null);

console.log(pessoas);

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
      setToastMessage('Usuário criado com sucesso! :D');
      console.log(response);
      
      setModalAberto(null);
    } catch (error) {
      setToastMessage('Erro ao criar usuário.')
      console.log(error);
      
    }
  };

  const handleSubmitVeiculo = async (dados) => {
    try {
      const response = await criarVeiculo(dados);
      setToastMessage('Veiculo criado com sucesso! :D', response);
      await fetchData();
      setModalAberto(null);
    } catch (error) {
      setToastMessage('Erro ao criar veiculo D:', error);
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
      console.log(response);
      
      setToastMessage('Permissão criada com sucesso! :D');
      await fetchData();
      setModalAberto(null);
    } catch (error) {
      setToastMessage('Erro ao criar permissão D:')
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

  const camposVeiculoUser = camposVeiculosBase.filter(campo => campo.nome !== 'id_usuario');


  // Decide os campos e o handler baseado no tipo de usuário:
  const camposVeiculoAtivos = usuario?.type === 'administrador'
    ? camposVeiculo
    : camposVeiculoUser;

  const handleSubmitVeiculoAtivo = usuario?.type === 'administrador'
    ? handleSubmitVeiculo
    : async (dados) => {
      try {
        const response = await criarMeuVeiculo(dados);
        setToastMessage('Veículo criado com sucesso!');
        console.log(response);
        
        await fetchData();
        setModalAberto(null);
      } catch (error) {
        setToastMessage('Erro ao criar veículo', error);
      }
    };

  return (
    <div className="header">
      <div id='space'></div>
      <h2 className="header-title">{tela}</h2>
      <div className="header-icons">

        {/* USER */}
        {usuario?.type !== 'administrador' && (
          <button onClick={() => setModalAberto('veiculo')} className="btn-teste-formulario">
            <FaCar />
          </button>
        )}

        {/* ADM */}
        {usuario?.type === 'administrador' && (
          <>
            <button onClick={() => setModalAberto('pessoa')} className="btn-teste-formulario">
              <FaUserPlus />
            </button>

            <button onClick={() => setModalAberto('veiculo')} className="btn-teste-formulario">
              <FaCar />
            </button>

            <button onClick={() => setModalAberto('permissao')} className="btn-teste-formulario">
              <FaRegIdCard />
            </button>
          </>
        )}

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
        {camposVeiculoAtivos.length > 0 && (
          <FormGenerico
            titulo="Cadastro de Veículo"
            campos={camposVeiculoAtivos}
            botaoTexto="Adicionar"
            onSubmit={handleSubmitVeiculoAtivo}
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
