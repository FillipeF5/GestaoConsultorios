// src/hooks/useMedicos.js
import { useState, useCallback } from 'react';

const useMedicos = () => {
  const [medicos, setMedicos] = useState([
    'Dr. Silva', 'Dra. Pereira', 'Dr. Oliveira', 'Dra. Costa', 'Dr. Santos',
    'Dr. Cardoso', 'Dra. Lima', 'Dr. Almeida', 'Dra. Barbosa', 'Dr. Teixeira'
  ]);

  const adicionarMedico = useCallback((novoMedico) => {
    setMedicos((prevMedicos) => [...prevMedicos, novoMedico]);
  }, []);

  const removerMedico = useCallback((index) => {
    setMedicos((prevMedicos) => prevMedicos.filter((_, i) => i !== index));
  }, []);

  return { medicos, adicionarMedico, removerMedico };
};

export default useMedicos;
