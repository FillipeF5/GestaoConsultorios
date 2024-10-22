// src/components/GestaoConsultorios.js
import React, { useState, useCallback } from 'react';
import { Box, Button, VStack, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Grid, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import ConsultorioCard from './ConsultorioCard';
import InputMedico from './InputMedico';

const GestaoConsultorios = () => {
  const [medicos, setMedicos] = useState([
    'Dr. Silva', 'Dra. Pereira', 'Dr. Oliveira', 'Dra. Costa', 'Dr. Santos',
    'Dr. Cardoso', 'Dra. Lima', 'Dr. Almeida', 'Dra. Barbosa', 'Dr. Teixeira'
  ]);

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

      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Janeiro</Tab>
          <Tab>Fevereiro</Tab>
          <Tab>Março</Tab>
          <Tab>Abril</Tab>
          <Tab>Maio</Tab>
          <Tab>Junho</Tab>
          <Tab>Julho</Tab>
          <Tab>Agosto</Tab>
          <Tab>Setembro</Tab>
          <Tab>Outubro</Tab>
          <Tab>Novembro</Tab>
          <Tab>Dezembro</Tab>
        </TabList>
      </Tabs>



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
                  <Tab>UnidadeI</Tab>
                  <Tab>UnidadeII</Tab>
                  <Tab>UnidadeIII</Tab>
                </TabList>
                <TabPanels>
                  {['UnidadeI', 'UnidadeII', 'UnidadeIII'].map((unidade) => (
                    <TabPanel key={unidade}>
                      <Heading size="md" mb={4}>{unidade}</Heading>
                      <Button colorScheme="teal" mb={4} onClick={() => adicionarConsultorio(unidade, dia)}>
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
        <Grid templateColumns="repeat(5, 1fr)" gap={4} mt={4}>
          {medicos.length > 0 ? (
            medicos.map((medico, index) => (
              <Box key={index} display="flex" justifyContent="space-between" alignItems="center" boxShadow="xl" p={2} >
                <span>{medico}</span>
                <IconButton
                  icon={<DeleteIcon />}
                  color="red.300"
                  size="sm"
                  onClick={() => {
                    setMedicos((prevMedicos) => prevMedicos.filter((_, i) => i !== index));
                  }}
                  aria-label="Excluir médico"
                />
              </Box>
            ))
          ) : (
            <span>Nenhum médico adicionado.</span>
          )}
        </Grid>
      </VStack>



    </Box>
  );
};

export default GestaoConsultorios;
