import React, { Profiler } from 'react';
import { ChakraProvider, Tabs, TabPanels, TabPanel, Heading } from '@chakra-ui/react';
import GestaoConsultorios from '../components/GestaoConsultorios';

const App = () => {
  const onRenderCallback = (id, phase, actualDuration) => {
    console.log(`Componente: ${id}, Fase: ${phase}, Duração: ${actualDuration}ms`);
  };

  return (
    <ChakraProvider>
      <div>
        <Heading bg="green.800" color="white" mb={4} padding='16px'>Gestão de Consultórios</Heading>
        <Profiler id="GestaoConsultorios" onRender={onRenderCallback}>
          <Tabs>
            <TabPanels>
              <TabPanel>
                <GestaoConsultorios />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Profiler>
      </div>
    </ChakraProvider>
  );
};

export default App;
