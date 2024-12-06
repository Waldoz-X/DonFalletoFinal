// Chakra imports
import {   Box,
  Flex,
  Text,
  Button,
  SimpleGrid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Image as ChakraImage ,
  Input, } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import React, { useState } from "react";
import galletaImg from "./assets/galleta.png";



const galletasData = [
  { id: 1, nombre: "Galleta 1", stock: 50, etapa: 1 },
  { id: 2, nombre: "Galleta 2", stock: 450, etapa: 1 },
  { id: 3, nombre: "Galleta 3", stock: 250, etapa: 1 },
  { id: 4, nombre: "Galleta 4", stock: 300, etapa: 1 },
  { id: 5, nombre: "Galleta 5", stock: 600, etapa: 1 },
  { id: 6, nombre: "Galleta 6", stock: 500, etapa: 1 },
  { id: 7, nombre: "Galleta 7", stock: 200, etapa: 1 },
  { id: 8, nombre: "Galleta 8", stock: 750, etapa: 1 },
  { id: 9, nombre: "Galleta 9", stock: 100, etapa: 1 },
  { id: 10, nombre: "Galleta 10", stock: 300, etapa: 1 },
];


const Produccion = () => {
  const [galletas, setGalletas] = useState(galletasData);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentGalleta, setCurrentGalleta] = useState(null);
  const [merma, setMerma] = useState(0);

  const getColor = (stock) => {
    if (stock > 600) return "green.700";
    if (stock > 450) return "green.400";
    if (stock > 300) return "orange.400";
    if (stock > 50) return "orange.300";
    return "red.400";
  };

  const avanzarEtapa = (id) => {
    setGalletas((prev) =>
      prev.map((g) =>
        g.id === id
          ? { ...g, etapa: g.etapa < 5 ? g.etapa + 1 : 5 }
          : g
      )
    );
  };

  const finalizarProduccion = () => {
    setGalletas((prev) =>
      prev.map((g) =>
        g.id === currentGalleta.id
          ? {
              ...g,
              stock: g.stock + (300 - merma),
              etapa: 1,
            }
          : g
      )
    );
    setMerma(0);
    onClose();
  };

  return (
    <Box p={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={8}>
        Producción de Galletas
      </Text>
      <SimpleGrid columns={5} spacing={4}>
  {galletas.map((galleta) => (
    <Box
      key={galleta.id}
      bg={getColor(galleta.stock)}
      borderRadius="md"
      p={6} // Espaciado interno aumentado
      textAlign="center"
      boxShadow="md"
      h="400px" // Altura del card aumentada
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        {galleta.nombre}
      </Text>
      <ChakraImage
        src={galletaImg}
        alt={galleta.nombre}
        boxSize="120px" // Tamaño de la imagen más grande
        mx="auto"
        mb={4}
      />
      <Text fontSize="lg" mb={2}>
        Cant: {galleta.stock}
      </Text>
      {galleta.etapa > 1 && (
        <Text fontSize="md" mb={4}>
          Etapa: {galleta.etapa}
        </Text>
      )}
      <Button
        mt="auto" // Alinea el botón al final del card
        colorScheme="blue"
        onClick={() => {
          if (galleta.stock <= 50) {
            setCurrentGalleta(galleta);
            onOpen();
          } else {
            avanzarEtapa(galleta.id);
          }
        }}
      >
        {galleta.stock <= 50 ? "Iniciar Producción" : "Avanzar Etapa"}
      </Button>
    </Box>
  ))}
</SimpleGrid>


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Finalizar Producción</ModalHeader>
          <ModalBody>
            <Text>¿Hubo alguna merma durante la producción?</Text>
            <Input
              placeholder="Cantidad de merma"
              type="number"
              value={merma}
              onChange={(e) => setMerma(Number(e.target.value))}
              mt={4}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={finalizarProduccion}>
              Finalizar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
{/* Leyenda */}
<Flex mt={10} direction="row" alignItems="center" justifyContent="center" wrap="wrap">
  <Text fontWeight="bold" fontSize="lg" mr={4}>
    Leyenda de Stock:
  </Text>
  <Flex alignItems="center" mr={6}>
    <Box bg="green.700" w="30px" h="30px" borderRadius="md" mr={2} />
    <Text fontSize="md">750-601 = Stock Máximo</Text>
  </Flex>
  <Flex alignItems="center" mr={6}>
    <Box bg="green.400" w="30px" h="30px" borderRadius="md" mr={2} />
    <Text fontSize="md">600-451 = Stock Medio</Text>
  </Flex>
  <Flex alignItems="center" mr={6}>
    <Box bg="orange.400" w="30px" h="30px" borderRadius="md" mr={2} />
    <Text fontSize="md">450-301 = Stock Medio-Bajo</Text>
  </Flex>
  <Flex alignItems="center" mr={6}>
    <Box bg="orange.300" w="30px" h="30px" borderRadius="md" mr={2} />
    <Text fontSize="md">300-50 = Stock de Seguridad</Text>
  </Flex>
  <Flex alignItems="center">
    <Box bg="red.400" w="30px" h="30px" borderRadius="md" mr={2} />
    <Text fontSize="md">50-0 = Stock Vacío</Text>
  </Flex>
</Flex>

    </Box>
  );
};
export default Produccion;