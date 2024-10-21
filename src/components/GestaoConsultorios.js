// src/components/GestaoConsultorios.js
import React, { useState, useCallback } from 'react';
import { Box, Button, VStack, Heading, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import ConsultorioCard from './ConsultorioCard';
import InputMedico from './InputMedico';

const GestaoConsultorios = () => {
  const [medicos, setMedicos] = useState([
    'Dr. Silva', 'Dra. Pereira', 'Dr. Oliveira', 'Dra. Costa', 'Dr. Santos',
    'Dr. Cardoso', 'Dra. Lima', 'Dr. Almeida', 'Dra. Barbosa', 'Dr. Teixeira'
  ]);

  const criarUnidades = () => ({
    Ipatinga: Array(12).fill().map((_, i) => ({
      numero: i + 1,
      especialidade: '',
      cotas: Array(4).fill(null)
    })),
    Fabriciano: Array(6).fill().map((_, i) => ({
      numero: i + 1,
      especialidade: '',
      cotas: Array(4).fill(null)
    })),
    Timoteo: Array(6).fill().map((_, i) => ({
      numero: i + 1,
      especialidade: '',
      cotas: Array(4).fill(null)
    }))
  });

  const [unidades, setUnidades] = useState({
    segunda: criarUnidades(),
    terca: criarUnidades(),
    quarta: criarUnidades(),
    quinta: criarUnidades(),
    sexta: criarUnidades(),
  });

  const adicionarMedico = useCallback((novoMedico) => {
    setMedicos((prevMedicos) => [...prevMedicos, novoMedico]);
  }, []);

  const adicionarConsultorio = (unidade, dia) => {
    setUnidades((prevUnidades) => {
      const novaListaConsultorios = [...prevUnidades[dia][unidade], {
        numero: prevUnidades[dia][unidade].length + 1,
        especialidade: '',
        cotas: Array(4).fill(null)
      }];
      return {
        ...prevUnidades,
        [dia]: {
          ...prevUnidades[dia],
          [unidade]: novaListaConsultorios
        }
      };
    });
  };

  return (
    <Box p={4}>
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab>Segunda</Tab>
          <Tab>Terça</Tab>
          <Tab>Quarta</Tab>
          <Tab>Quinta</Tab>
          <Tab>Sexta</Tab>
        </TabList>
        <TabPanels>
          {['segunda', 'terca', 'quarta', 'quinta', 'sexta'].map((dia) => (
            <TabPanel key={dia}>
              <Heading size="md" mb={4}>Consultórios - {dia.charAt(0).toUpperCase() + dia.slice(1)}</Heading>
              <Tabs variant="enclosed" colorScheme="green">
                <TabList>
                  <Tab>Ipatinga</Tab>
                  <Tab>Fabriciano</Tab>
                  <Tab>Timoteo</Tab>
                </TabList>
                <TabPanels>
                  {['Ipatinga', 'Fabriciano', 'Timoteo'].map((unidade) => (
                    <TabPanel key={unidade}>
                      <Heading size="md" mb={4}>{unidade}</Heading>
                      <Button colorScheme="green" mb={4} onClick={() => adicionarConsultorio(unidade, dia)}>
                        Adicionar Consultório
                      </Button>
                      <VStack spacing={4} align="stretch">
                        {unidades[dia][unidade].map((consultorio) => (
                          <ConsultorioCard
                            key={consultorio.numero}
                            consultorio={consultorio}
                            medicos={medicos}
                            onSave={() => console.log('Salvar edição')}
                          />
                        ))}
                      </VStack>
                    </TabPanel>
                  ))}
                </TabPanels>
              </Tabs>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>

      <VStack spacing={4} align="stretch" mt={8}>
        <Heading size="lg">Médicos</Heading>
        <InputMedico onAddMedico={adicionarMedico} />
        <VStack spacing={2} mt={4}>
          {medicos.length > 0 ? (
            medicos.map((medico, index) => (
              <Box key={index} display="flex" justifyContent="space-between" alignItems="center">
                <span>{medico}</span>
              </Box>
            ))
          ) : (
            <span>Nenhum médico adicionado.</span>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};

export default GestaoConsultorios;
