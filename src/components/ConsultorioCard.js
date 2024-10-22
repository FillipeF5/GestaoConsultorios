// src/components/ConsultorioCard.js
import React, { useState, useMemo } from 'react';
import { Box, Heading, VStack, IconButton, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Grid, Input } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const ConsultorioCard = ({ consultorio, medicos }) => {
  const [expandido, setExpandido] = useState(true);
  const [cotas, setCotas] = useState(consultorio.cotas);
  const [modalOpen, setModalOpen] = useState(false);
  const [cotaSelecionada, setCotaSelecionada] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [tipoOcupacao, setTipoOcupacao] = useState(null); // 'escala' ou 'reserva'
  const [reservaData, setReservaData] = useState('');

  const cotasMemorizadas = useMemo(() => cotas, [cotas]);

  const horarios = [
    '7h às 10h',
    '10h às 13h',
    '13h às 16h',
    '16h às 19h'
  ];

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

  // Filtra os médicos com base no termo de busca
  const filteredMedicos = medicos.filter((medico) =>
    medico.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <span>{index + 1} - {horarios[index]} - {medico || 'livre'}</span>
              <Button
                colorScheme="teal"
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
        <ModalContent maxWidth="90vw">
          <ModalHeader>Selecionar Médico</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxHeight="60vh" overflowY="auto">
            {tipoOcupacao === null ? (
              // Estado inicial, pergunta sobre "Reserva" ou "Escala Padrão"
              <VStack spacing={5}>
                <Button onClick={() => setTipoOcupacao('reserva')} boxShadow="xl" colorScheme='teal'>
                  Reserva
                </Button>
                <Button onClick={() => setTipoOcupacao('escala')} boxShadow="xl" colorScheme='teal' mb="4">
                  Escala Padrão
                </Button>
              </VStack>
            ) : (
              // Se tipo de ocupação foi selecionado
              <>
                {tipoOcupacao === 'reserva' && (
                  <Input
                    placeholder="Data da reserva"
                    value={reservaData}
                    onChange={(e) => setReservaData(e.target.value)}
                    mb={4} // Espaçamento abaixo do input de data
                  />
                )}

                {/* Barra de pesquisa */}
                <Input
                  placeholder="Pesquisar médico..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  mb={4} // Espaçamento abaixo da barra de pesquisa
                />

                {/* Lista de médicos */}
                <Grid templateColumns="repeat(4, 1fr)" gap={5}>
                  {filteredMedicos.map((medico, index) => (
                    <Button
                      key={index}
                      onClick={() => {
                        const ocupacao = tipoOcupacao === 'reserva'
                          ? `${medico}, reservado, ${reservaData}`
                          : medico;

                        adicionarMedicoNaCota(cotaSelecionada, ocupacao);

                        // Resetando o estado da modal ao fechar
                        setTipoOcupacao(null);
                        setReservaData('');
                        setModalOpen(false); // Fecha o modal após a seleção
                      }}
                      colorScheme="green"
                      px={12}
                      py={8}
                    >
                      {medico}
                    </Button>
                  ))}
                </Grid>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>


    </Box>
  );
};

export default ConsultorioCard;
