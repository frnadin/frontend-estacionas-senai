import React from 'react';
import './Header.css';
import { FaCar, FaUserPlus, FaUserCircle, FaRegIdCard, FaPowerOff } from 'react-icons/fa';
import { MdNotificationsNone } from 'react-icons/md';
import { useState, useEffect } from 'react';
import FormGenerico from '../FormGenerico/FormGenerico.jsx';
import Modal from '../Modal/Modal.jsx';
import { useNavigate } from 'react-router-dom';
import { camposPessoa } from '../../data/camposPessoa.js';
import { camposCarro as camposCarroBase } from '../../data/camposCarro.js';
import { camposPermissao as camposPermissaoBase } from '../../data/camposPermissao.js';


import { criarPessoa, listarPessoas } from '../../services/pessoaService.js';
import { criarVeiculo, listarVeiculos, buscarVeiculosPorUsuario } from '../../services/veiculoService.js';
import { criarPermissao } from '../../services/permissaoService.js';


export default function Header({ tela, onNotificationClick }) {

  const [pessoas, setPessoas] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [camposCarro, setCamposCarro] = useState([]);
  const [camposPermissao, setCamposPermissao] = useState([]);
  const [formDataPermissao, setFormDataPermissao] = useState({});


  const navigate = useNavigate();
  const [modalAberto, setModalAberto] = useState(null);


async function fetchData(setPessoas, setCamposCarro, setCamposPermissao) {
  try {
    const listaPessoas = await listarPessoas();

    setPessoas(listaPessoas);

    // Atualiza camposCarro
    const novosCamposCarro = camposCarroBase.map(campo => {
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
    setCamposCarro(novosCamposCarro);

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
}

useEffect(() => {
  if (modalAberto === 'pessoa' || modalAberto === 'permissao') {
    fetchData(setPessoas, setCamposCarro, setCamposPermissao);
  }
}, [modalAberto]);

  

  const handleSubmitPessoa = async (dados) => {
    try {
      const response = await criarPessoa(dados);
      console.log('Pessoa cadastrada com sucesso:', response);
      setModalAberto(null);
    } catch (error) {
      console.error('Erro ao cadastrar pessoa:', error);
      alert('Erro ao criar usuário.');
    }
  };
  const handleSubmitCarro = async (dados) => {
    try {
      const response = await criarVeiculo(dados);
      alert('Carro criado com sucesso!', response);
      setModalAberto(null);
    } catch (error) {
      alert('Erro ao criar carro', error);
    }
  };

  const handlePermissaoChange = async (nome, valor) => {
    setFormDataPermissao(prev => ({ ...prev, [nome]: valor }));

    if (nome === 'pessoa_id') {
      if (!valor) {
        atualizarOpcoesVeiculo([]);
        setFormDataPermissao(prev => ({ ...prev, veiculo_id: '' })); // limpa seleção veículo
        return;
      }
      try {
        const veiculos = await buscarVeiculosPorUsuario(valor);
        atualizarOpcoesVeiculo(veiculos);

        // Limpa seleção veiculo_id para forçar escolher um novo veículo válido
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
      setModalAberto(null);
    } catch (error) {
      alert('Erro ao criar permissão', error);
    }
  };



  const handlePessoaChange = async (pessoaId) => {
    if (!pessoaId) {
      atualizarOpcoesVeiculo([]); // limpa opções se desmarcar pessoa
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
        <button onClick={() => setModalAberto('veiculo')} className="btn-teste-formulario">
          <FaCar />
        </button>

        <button onClick={() => setModalAberto('pessoa')} className="btn-teste-formulario">
          <FaUserPlus />
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
          titulo="Cadastro de Carro"
          campos={camposCarro}
          botaoTexto="Adicionar"
          onSubmit={handleSubmitCarro}
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