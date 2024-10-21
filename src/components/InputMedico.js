// src/components/InputMedico.js
import React, { useState, useEffect } from 'react';
import { Input, Button } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

const InputMedico = ({ onAddMedico }) => {
  const [novoMedico, setNovoMedico] = useState('');
  const [debouncedNovoMedico, setDebouncedNovoMedico] = useState(novoMedico);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedNovoMedico(novoMedico);
    }, 300); // Atraso de 300ms

    return () => {
      clearTimeout(handler);
    };
  }, [novoMedico]);

  const adicionarMedico = () => {
    if (debouncedNovoMedico.trim()) {
      onAddMedico(debouncedNovoMedico);
      setNovoMedico(''); // Limpa o campo de entrada
    }
  };

  return (
    <div>
      <Input
        value={novoMedico}
        onChange={(e) => setNovoMedico(e.target.value)}
        placeholder="Adicionar novo médico"
        mb={2}
      />
      <Button onClick={adicionarMedico} colorScheme="blue" leftIcon={<FaPlus />}>
        Adicionar Médico
      </Button>
    </div>
  );
};

export default InputMedico;
