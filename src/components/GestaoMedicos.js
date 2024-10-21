// src/components/GestaoMedicos.js
import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';

const GestaoMedicos = ({ medicos = [], setMedicos }) => { // Recebendo medicos e setMedicos
  const [novoMedico, setNovoMedico] = useState('');

  const adicionarMedico = () => {
    console.log('Adicionando médico:', novoMedico); // Log para depuração
    console.log('setMedicos:', setMedicos); // Verifique se setMedicos é uma função
    if (novoMedico.trim()) {
      if (typeof setMedicos === 'function') {
        setMedicos([...medicos, novoMedico]); // Atualiza a lista de médicos
        setNovoMedico(''); // Limpa o campo de entrada
      } else {
        console.error('setMedicos não é uma função'); // Log de erro se setMedicos não for uma função
      }
    }
  };

  return (
    <Box>
      <Input
        value={novoMedico}
        onChange={(e) => setNovoMedico(e.target.value)}
        placeholder="Adicionar novo médico"
        mb={2}
      />
      <Button onClick={adicionarMedico} colorScheme="blue">Adicionar Médico</Button>
      <VStack spacing={2} mt={4}>
        {Array.isArray(medicos) && medicos.length > 0 ? (
          medicos.map((medico, index) => (
            <Text key={index}>{medico}</Text>
          ))
        ) : (
          <Text>Nenhum médico adicionado.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default GestaoMedicos;
