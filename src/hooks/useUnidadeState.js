// src/hooks/useUnidadeState.js
import { useReducer } from 'react';

const criarUnidades = () => ({
  UnidadeI: Array(12).fill().map((_, i) => ({
    numero: i + 1,
    especialidade: '',
    cotas: Array(4).fill(null)
  })),
  UnidadeII: Array(6).fill().map((_, i) => ({
    numero: i + 1,
    especialidade: '',
    cotas: Array(4).fill(null)
  })),
  UnidadeIII: Array(6).fill().map((_, i) => ({
    numero: i + 1,
    especialidade: '',
    cotas: Array(4).fill(null)
  }))
});

const unidadeReducer = (state, action) => {
  switch (action.type) {
    case 'ADICIONAR_CONSULTORIO':
      const { unidade } = action.payload;
      const novoNumero = state[unidade].length + 1; // Calcule o novo número antes da atualização
      return {
        ...state,
        [unidade]: state[unidade].concat({ // Use concat para evitar criar uma nova cópia desnecessária
          numero: novoNumero,
          especialidade: '',
          cotas: Array(4).fill(null)
        })
      };
    default:
      return state;
  }
};

const useUnidadeState = () => {
  const [unidades, dispatch] = useReducer(unidadeReducer, criarUnidades());

  const adicionarConsultorio = (unidade) => {
    dispatch({ type: 'ADICIONAR_CONSULTORIO', payload: { unidade } });
  };

  return { unidades, adicionarConsultorio };
};

export default useUnidadeState;
