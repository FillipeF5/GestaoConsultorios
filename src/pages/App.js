// src/pages/App.js
import React from 'react';
import { ChakraProvider, Tabs, TabPanels, TabPanel, Heading } from '@chakra-ui/react';
import GestaoConsultorios from '../components/GestaoConsultorios';
import GestaoMedicos from '../components/GestaoMedicos';

const App = () => {
  return (
    <ChakraProvider>
      <div>
        <Heading bg="green.800" color="white" mb={4} padding='16px'>Gestão de Consultórios</Heading>
        
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabPanels>
            <TabPanel>
              <GestaoConsultorios />
            </TabPanel>
            <TabPanel>
              <GestaoMedicos />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </ChakraProvider>
  );
};

export default App;
