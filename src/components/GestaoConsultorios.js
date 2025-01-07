import React, { lazy, Suspense } from 'react';
import { DeleteIcon } from '@chakra-ui/icons'; // Corrigida a importação
import {
  Box,
  Button,
  VStack,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  SimpleGrid,
  IconButton,
  Text,
} from '@chakra-ui/react';
import useMedicos from '../hooks/useMedicos';
import useDias from '../hooks/useDias';
import useMeses from '../hooks/useMeses';

const ConsultorioCard = lazy(() => import('./ConsultorioCard'));
const InputMedico = lazy(() => import('./InputMedico'));

const UnidadeTab = ({ unidade, estadoUnidade, medicos }) => (
  <TabPanel>
    <Heading size="md" mb={4}>{unidade}</Heading>
    <Button
      colorScheme="teal"
      mb={4}
      onClick={() => estadoUnidade.adicionarConsultorio(unidade)}
    >
      Adicionar Consultório
    </Button>
    <VStack spacing={4} align="stretch">
      {estadoUnidade.unidades[unidade].map((consultorio) => (
        <Suspense key={consultorio.numero} fallback={<Spinner size="xl" />}>
          <ConsultorioCard
            consultorio={consultorio}
            medicos={medicos}
          />
        </Suspense>
      ))}
    </VStack>
  </TabPanel>
);

const DiaTab = ({ dia, estadoDia, medicos }) => (
  <TabPanel>
    <Heading size="md" mb={4}>Consultórios - {dia.charAt(0).toUpperCase() + dia.slice(1)}</Heading>
    <Tabs variant="enclosed" colorScheme="green">
      <TabList>
        <Tab>UnidadeI</Tab>
        <Tab>UnidadeII</Tab>
        <Tab>UnidadeIII</Tab>
      </TabList>
      <TabPanels>
        {['UnidadeI', 'UnidadeII', 'UnidadeIII'].map((unidade) => (
          <UnidadeTab key={unidade} unidade={unidade} estadoUnidade={estadoDia} medicos={medicos} />
        ))}
      </TabPanels>
    </Tabs>
  </TabPanel>
);

const GestaoConsultorios = () => {
  const { medicos, adicionarMedico, removerMedico } = useMedicos(); // Adicionei removerMedico
  const estadoDias = useDias();
  const { monthNames, loadedMonths, handleTabClick } = useMeses();

  return (
    <Box backgroundColor={'green.50'} p={4}>
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          {monthNames.map((monthName, index) => (
            <Tab key={index} onClick={() => handleTabClick(index)}>{monthName}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {monthNames.map((monthName, index) => (
            <TabPanel key={index}>
              {loadedMonths[index] ? (
                <Suspense fallback={<Spinner size="xl" />}>
                  <Tabs variant="soft-rounded" colorScheme="green">
                    <TabList>
                      {Object.keys(estadoDias).map((dia) => (
                        <Tab key={dia}>{dia.charAt(0).toUpperCase() + dia.slice(1)}</Tab>
                      ))}
                    </TabList>
                    <TabPanels>
                      {Object.keys(estadoDias).map((dia) => (
                        <DiaTab key={dia} dia={dia} estadoDia={estadoDias[dia]} medicos={medicos} />
                      ))}
                    </TabPanels>
                  </Tabs>
                </Suspense>
              ) : (
                <Spinner size="xl" />
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>

      {/* Seção para adicionar médico */}
      <Suspense fallback={<Spinner size="xl" />}>
        <InputMedico onAddMedico={adicionarMedico} />
      </Suspense>

      {/* Lista de Médicos Cadastrados */}
      <Heading size="md" mt={4} mb={2}>Médicos Cadastrados</Heading>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4} mt={4}>
        {medicos.length > 0 ? (
          medicos.map((medico, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="md"
              backgroundColor={'green.50'}
              boxShadow="sm"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection="column"
              textAlign="center"
            >
              <Text fontWeight="bold">{medico}
              <IconButton
                icon={<DeleteIcon />}
                margin={2}
                colorScheme="red"
                size="sm"
                aria-label="Remover Médico"
                onClick={() => removerMedico(index)}
              />
              </Text>
            </Box>
          ))
        ) : (
          <Box textAlign="center" color="gray.500" gridColumn="span 4">
            Nenhum médico cadastrado.
          </Box>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default GestaoConsultorios;
