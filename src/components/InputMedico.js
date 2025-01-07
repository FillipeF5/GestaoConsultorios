// src/components/InputMedico.js
import React, { useState } from 'react';
import { Input, Button } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

const InputMedico = ({ onAddMedico }) => {
  const [novoMedico, setNovoMedico] = useState('');

  const adicionarMedico = () => {
    if (novoMedico.trim()) {
      onAddMedico(novoMedico.trim());
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
