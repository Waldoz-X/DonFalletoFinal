import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Image as ChakraImage,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import galletaImg from "./assets/galleta.png";

const Produccion = () => {
  const [galletas, setGalletas] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal de alerta inicial
  const [etapaModal, setEtapaModal] = useState(false); // Modal para Etapa 5
  const [currentGalleta, setCurrentGalleta] = useState(null); // Galleta en producción
  const [cantidadProducida, setCantidadProducida] = useState(750); // Cantidad producida por defecto
  const [alerta, setAlerta] = useState(null); // Galleta en estado crítico

  // Consumo de API con fetch al montar el componente
  const fetchGalletas = async () => {
    try {
      const response = await fetch(
        "https://proyectobackendongalleto-dongalletospringapp.azuremicroservices.io/api/insumos/listaProductos"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const mappedData = data.map((item) => ({
        id: item.productoId,
        nombre: item.nombreProducto,
        stock: item.cantidadEnExhibicion,
        etapa: 0, // Etapa inicial fija (sin producción)
      }));
      setGalletas(mappedData);
    } catch (error) {
      console.error("Error al consumir la API:", error);
    }
  };

  useEffect(() => {
    fetchGalletas();
    const interval = setInterval(() => {
      fetchGalletas();
    }, 14400000); // Cada 4 horas
    return () => clearInterval(interval);
  }, []);

  // Detecta cambios en el stock
  useEffect(() => {
    const galletaCritica = galletas.find(
      (galleta) => galleta.stock <= 50 && galleta.etapa === 0
    );
    if (galletaCritica) {
      setAlerta(galletaCritica);
      onOpen();
    }
  }, [galletas]);

  // Manejar la aceptación de la alerta
  const iniciarProduccion = () => {
    setGalletas((prev) =>
      prev.map((g) =>
        g.id === alerta.id ? { ...g, etapa: 1 } : g
      )
    );
    setCurrentGalleta(alerta); // Establecer galleta en producción
    setAlerta(null);
    onClose();
  };

  // Manejar clic en el card
  const avanzarEtapa = (galleta) => {
    if (currentGalleta && galleta.id === currentGalleta.id && galleta.etapa < 5) {
      setGalletas((prev) =>
        prev.map((g) =>
          g.id === galleta.id
            ? { ...g, etapa: g.etapa + 1 }
            : g
        )
      );
      if (galleta.etapa === 4) {
        setEtapaModal(true); // Abrir modal para Etapa 5
      }
    }
  };

  const finalizarProduccion = () => {
    setGalletas((prev) =>
      prev.map((g) =>
        g.id === currentGalleta.id
          ? { ...g, etapa: 0, stock: g.stock + cantidadProducida }
          : g
      )
    );
    setCurrentGalleta(null); // Limpiar galleta en producción
    setCantidadProducida(750); // Restablecer cantidad producida
    setEtapaModal(false);
  };

  const getColor = (stock) => {
    if (stock > 601) return "#0E591D";
    if (stock > 451) return "#327F34";
    if (stock > 301) return "#4CCD50";
    if (stock > 50) return "#EB814C";
    return "#F13633";
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
            p={6}
            textAlign="center"
            boxShadow="md"
            h="400px"
            cursor={currentGalleta && galleta.id === currentGalleta.id ? "pointer" : "not-allowed"}
            onClick={() => avanzarEtapa(galleta)}
          >
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              {galleta.nombre}
            </Text>
            <ChakraImage
              src={galletaImg}
              alt={galleta.nombre}
              boxSize="120px"
              mx="auto"
              mb={4}
            />
<Flex
  alignItems="center"
  justifyContent="center"
  mb={3}
  fontSize="lg"
  fontWeight="bold"
>
  {/* Texto "Cant:" más largo */}
  <Text mr={4} fontSize="2xl" fontWeight="bold">
    Cant:
  </Text>

  {/* Label de cantidad más grande */}
  <Text
    fontSize="0.5xl"
    fontWeight="bold"
    bg="gray.200"
    borderRadius="md"
    p={0.5} // Espaciado interno más grande
    w="120px" // Ancho del label más largo
    textAlign="center"
    display="inline-block"
  >
    {galleta.stock}
  </Text>
</Flex>

            {galleta.etapa > 0 && (
              <Text fontSize="md" fontWeight="bold">
                SE ENCUENTRA EN ETAPA {galleta.etapa}
              </Text>
            )}
          </Box>
        ))}
      </SimpleGrid>

      {/* Modal para Alerta de Stock Crítico */}
      {alerta && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Alerta de producción</ModalHeader>
            <ModalBody>
              <Text>
                Se produjo una nueva orden de producción de la galleta{" "}
                <strong>{alerta.nombre}</strong>.
              </Text>
              <Text>Tiempo estimado del proceso: 50 minutos.</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={iniciarProduccion}>
                Aceptar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Modal para Finalizar Producción */}
      {etapaModal && (
        <Modal isOpen={etapaModal} onClose={() => setEtapaModal(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Finalizar Producción</ModalHeader>
            <ModalBody>
              <Text>Cantidad producida (750 por defecto):</Text>
              <Input
                type="number"
                value={cantidadProducida}
                onChange={(e) => setCantidadProducida(Number(e.target.value))}
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
      )}

      {/* Leyenda */}
<Flex mt={10} direction="row" alignItems="center" justifyContent="center" wrap="wrap">
  <Text fontWeight="bold" fontSize="lg" mr={4}>
    Leyenda de Stock:
  </Text>
  <Flex alignItems="center" mr={6}>
    <Box bg="#0E591D" w="30px" h="30px" borderRadius="md" mr={2} />
    <Text fontSize="md">750-601 = Stock Máximo</Text>
  </Flex>
  <Flex alignItems="center" mr={6}>
    <Box bg="#327F34" w="30px" h="30px" borderRadius="md" mr={2} />
    <Text fontSize="md">600-451 = Stock Medio</Text>
  </Flex>
  <Flex alignItems="center" mr={6}>
    <Box bg="#4CCD50" w="30px" h="30px" borderRadius="md" mr={2} />
    <Text fontSize="md">450-301 = Stock Medio-Bajo</Text>
  </Flex>
  <Flex alignItems="center" mr={6}>
    <Box bg="#EB814C" w="30px" h="30px" borderRadius="md" mr={2} />
    <Text fontSize="md">300-50 = Stock de Seguridad</Text>
  </Flex>
  <Flex alignItems="center">
    <Box bg="#F13633" w="30px" h="30px" borderRadius="md" mr={2} />
    <Text fontSize="md">50-0 = Stock Vacío</Text>
  </Flex>
</Flex>
    </Box>
  );
};

export default Produccion;
