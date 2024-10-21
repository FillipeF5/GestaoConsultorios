// src/components/ConsultorioCard.js
import React, { useState, useMemo } from 'react';
import { Box, Heading, VStack, IconButton, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Grid } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const ConsultorioCard = ({ consultorio, medicos }) => {
  const [expandido, setExpandido] = useState(true);
  const [cotas, setCotas] = useState(consultorio.cotas);
  const [modalOpen, setModalOpen] = useState(false);
  const [cotaSelecionada, setCotaSelecionada] = useState(null);

  const cotasMemorizadas = useMemo(() => cotas, [cotas]);

  const adicionarMedicoNaCota = (index, medico) => {
    const novasCotas = [...cotas];
    if (!novasCotas[index]) {
      novasCotas[index] = medico; // Adiciona o médico à cota
      console.log(`Médico ${medico} adicionado à Cota ${index + 1}`);
    } else {
      novasCotas[index] = null; // Remove o médico da cota
      console.log(`Cota ${index + 1} liberada.`);
    }
    setCotas(novasCotas);
  };

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mb={4} boxShadow="md">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading size="md">Consultório {consultorio.numero}</Heading>
        <IconButton
          icon={expandido ? <ChevronUpIcon /> : <ChevronDownIcon />}
          size="sm"
          onClick={() => setExpandido(!expandido)}
          aria-label="Toggle expand"
        />
      </Box>

      {expandido && (
        <VStack spacing={2} align="stretch" mt={2}>
          {cotasMemorizadas.map((medico, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderWidth="1px"
              borderRadius="md"
              p={3}
              bg={medico ? 'red.300' : 'green.300'}
              color="white"
              fontWeight="bold"
              transition="background 0.3s"
            >
              <span>Cota {index + 1}: {medico || 'Livre'}</span>
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => {
                  if (medico) {
                    adicionarMedicoNaCota(index, null); // Liberar a cota se já ocupada
                  } else {
                    setCotaSelecionada(index); // Armazena qual cota foi selecionada
                    setModalOpen(true); // Abre o modal para seleção de médico
                  }
                }}
              >
                {medico ? 'Liberar' : 'Selecionar'}
              </Button>
            </Box>
          ))}
        </VStack>
      )}

      {/* Modal para seleção de médico */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Selecionar Médico</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(4, 1fr)" gap={5}>
              {medicos.map((medico, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    adicionarMedicoNaCota(cotaSelecionada, medico);
                    setModalOpen(false); // Fecha o modal após a seleção
                  }}
                  colorScheme="green"
                >
                  {medico}
                </Button>
              ))}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ConsultorioCard;
