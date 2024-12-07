// Chakra imports
import {
  Box,
  SimpleGrid,
  Text,
  Flex,
  Input,
  Table,
  Button,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  FormLabel,
  FormControl,
  Grid,

} from "@chakra-ui/react";
import React, { useState } from "react";
import { RadioGroup, Radio, HStack } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";

// Importación de imágenes
import imagen1 from "assets/img/Galletas/galletas 1.png";
import imagen2 from "assets/img/Galletas/galleta 2.png";
import imagen3 from "assets/img/Galletas/galletas 3.png";
import imagen4 from "assets/img/Galletas/galleta 4.png";
import imagen5 from "assets/img/Galletas/galleta 5.png";
import imagen6 from "assets/img/Galletas/galleta 6.png";
import imagen7 from "assets/img/Galletas/galletas 7.png";
import imagen8 from "assets/img/Galletas/galleta 8.png";
import imagen9 from "assets/img/Galletas/galleta 9.png";
import imagen10 from "assets/img/Galletas/galletas 10.png";

import imagenProduccion from "assets/img/sombrero-de-cocinero 2.png"
import monitoreo1 from "assets/img/Monitoreo Status.png"
import monitoreo2 from "assets/img/Monitoreo Status-2.png"

const images = [
  imagen1,
  imagen2,
  imagen3,
  imagen4,
  imagen5,
  imagen6,
  imagen7,
  imagen8,
  imagen9,
  imagen10,
];

const radioOptions = [
  { value: "1", label: "Unidad" },
  { value: "2", label: "Gramaje" },
  { value: "3", label: "Paquete 1/2 kilo" },
  { value: "4", label: "Paquete 1 kilo" },
];

const columnHeaders = [
  { label: "Galleta" },
  { label: "Cantidad" },
  { label: "Tipo de Venta" },
  { label: "Precio" },
  { label: "Subtotal" },
];

export default function PuntoVenta() {
  const [selectedRadio, setSelectedRadio] = useState("1");
  const [inputValues, setInputValues] = useState(Array(images.length).fill(""));
  const [tableData, setTableData] = useState([]);
  const [jsonData, setJsonData] = useState([]);
  const [totalVenta, setTotalVenta] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();


  // Función para manejar cambios en los radio buttons
  const handleRadioChange = (value) => {
    setSelectedRadio(value);
  };

  // Función para manejar cambios en los inputs
  const handleInputChange = (index, value) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = value;
    setInputValues(updatedValues);
  };

  // Función para agregar datos a la tabla y actualizar el JSON
  const handleAddToTable = () => {
    const newEntries = inputValues
      .map((value, index) => {
        if (value) {
          const quantity = parseFloat(value) || 0;
          let finalQuantity = 0;
          let pricePerUnit = 4.5; // Precio por unidad
          let typeLabel = "";

          switch (selectedRadio) {
            case "1": // Unidad
              finalQuantity = quantity;
              typeLabel = "Unidad";
              break;
            case "2": // Gramaje
              finalQuantity = quantity / 40; // Convierte gramos a unidades
              typeLabel = "Gramaje";
              break;
            case "3": // Paquete 1/2 kilo
              finalQuantity = quantity * (500 / 40); // Convierte paquetes de 500 gramos a unidades
              typeLabel = "Paquete 1/2 kilo";
              break;
            case "4": // Paquete 1 kilo
              finalQuantity = quantity * (1000 / 40); // Convierte paquetes de 1 kilo a unidades
              typeLabel = "Paquete 1 kilo";
              break;
            default:
              break;
          }

          const subtotal = pricePerUnit * finalQuantity;
          return {
            exibi: `Galleta ${index + 1}`,
            quantity: value,
            type: typeLabel,
            price: pricePerUnit,
            subtotal,
          };
        }
        return null;
      })
      .filter(Boolean); // Elimina entradas vacías

    setTableData([...tableData, ...newEntries]);

    // Actualiza el total acumulado
    const totalNuevos = newEntries.reduce((sum, item) => sum + item.subtotal, 0);
    setTotalVenta(totalVenta + totalNuevos);


    // Actualiza el JSON
    const updatedJson = [...jsonData, ...newEntries];
    setJsonData(updatedJson);
    console.log("JSON actualizado:", JSON.stringify(updatedJson, null, 2));

    // Limpia los inputs
    setInputValues(Array(images.length).fill(""));
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} ml="36px" mb="80%">
      <Box display="flex" alignItems="flex-start" gap="100px">
        <Text fontSize="xl" color="#2D3748" mb="16px" display="inline-block" whiteSpace="nowrap">
          Seleccione el tipo de venta
        </Text>
        <FormControl>
          <RadioGroup defaultValue="1" size="lg" onChange={handleRadioChange}>
            <HStack spacing={4}>
              {radioOptions.map((option) => (
                <Radio
                  key={option.value}
                  value={option.value}
                  sx={{
                    bg: "#c4c4c4",
                    _checked: { bg: "#2563eb" },
                  }}
                >
                  {option.label}
                </Radio>
              ))}
            </HStack>
          </RadioGroup>
        </FormControl>
      </Box>
      <Box padding="10px 18px 0px 0px">
        <SimpleGrid columns={5} spacing={4}>
          {images.map((imgSrc, index) => (
            <Box
              key={index}
              bg="#554035"
              height="200px"
              borderRadius="4px"
              display="flex"
              alignItems="start"
              maxWidth="250px"
              justifyContent="center"
              margin="0 auto"
            >
              <Flex direction="column" align="center" gap="4">
                <Text color="white" fontSize="xl" fontWeight="bold">
                  Galleta {index + 1}
                </Text>
                <Image src={imgSrc} alt={`Ícono ${index + 1}`} boxSize="100px" marginX="2" />
                <Flex direction="row" align="center" gap="5" padding="0px 15px 0px 10px" justify="center">
                  <Text color="white" fontSize="xl" fontWeight="bold">
                    Cant.
                  </Text>
                  <Input
                    placeholder=""
                    bg="#D9D9D9"
                    size="sm"
                    variant="subtle"
                    borderRadius="10px"
                    value={inputValues[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                </Flex>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
      <Box w="100%" padding="22px 15px 0px 0px">
        <Flex justify="end" align="center">
          <Button
            bg="#8C6653"
            color="white"
            _hover={{ bg: "#D9BCB8" }}
            size="md"
            leftIcon={<FaPlus />}
            iconSpacing={3}
            borderRadius="8px"
            fontWeight="normal"
            px="54px"
            onClick={handleAddToTable}
          >
            Agregar
          </Button>
        </Flex>
      </Box>
      <Box padding="30px 10px 0px 0px">
        <Table size="md" bg="#FFFCFC" borderRadius="5px">
          <Thead>
            <Tr>
              {columnHeaders.map((col, index) => (
                <Th
                  key={index}
                  textAlign="center"
                  textTransform="none"
                  fontSize="2xl"
                  fontWeight="semibold"
                  color="#4A5568"
                  borderBottom="0.5px solid #939393"
                >
                  {col.label}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((row, index) => (
              <Tr key={index}>
                <Td textAlign="center">{row.name}</Td>
                <Td textAlign="center">{row.quantity}</Td>
                <Td textAlign="center">{row.type}</Td>
                <Td textAlign="center">${row.price.toFixed(2)}</Td>
                <Td textAlign="center">${row.subtotal.toFixed(2)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Box padding="80px 10px 0px 10px" >

        <Flex direction="row" justify="space-between" align="center">

          <Box
            bg="#FFFCFC"
            height="250px"
            width="50%"
            borderRadius="4px"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >


            <Box display="flex" flexDirection="column" alignItems="center" gap={4}>

              <Box display="flex" flexDirection="row" alignItems="center" gap={4}>
                <Image src={imagenProduccion} alt="Imagen 1" boxSize="30px" />
                <Text fontSize="2xl" fontWeight="bold" color="#2D3748">Monitoreo De Producción </Text>
                <Image src={imagenProduccion} alt="Imagen 2" boxSize="30px" />
              </Box>


              <Flex display="flex" direction="row" alignItems="center" gap={8} >
                <Image src={monitoreo1} alt="Imagen 1" height="160px" width="250px" />
                <Image src={monitoreo2} alt="Imagen 2" height="160px" width="340px" />
              </Flex>

            </Box>


          </Box>

          <Box
            height="250px"
            width="25%"
            borderRadius="4px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >

            <Button
              bg="#8C6653"
              color="white"
              _hover={{ bg: "#D9BCB8" }}
              size="md"
              iconSpacing={3}
              borderRadius="8px"
              fontWeight="normal"
              width="60%" // Ancho fijo
              height="50px" // Altura fija
              mb={4}
              onClick={onOpen} // Aquí se abre el modal
            >
              F5 Pago efectivo
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Pago Efectivo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                  <Box >
                    <Box>
                      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <FormControl>
                          <FormLabel  >Subtotal</FormLabel>
                          <Input disabled       backgroundColor="#F1F1F1"
                                    value={totalVenta.toFixed(2)} 

                          />
                        </FormControl>

                        <FormControl>
                          
                        </FormControl>

                        <FormControl>
                          <FormLabel required>Agregar descuento</FormLabel>
                          <Input 		 />
                        </FormControl>

                        <FormControl>
                          <FormLabel  required>Total</FormLabel>
                          <Input backgroundColor="#F1F1F1" disabled
                                    value={totalVenta.toFixed(2)} 

                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel required>Entrada de efectivo</FormLabel>
                          <Input />
                        </FormControl>

                        <FormControl>
                          <FormLabel required>Cambio</FormLabel>
                          <Input backgroundColor="#F1F1F1" disabled/>
                        </FormControl>
                      </Grid>
                    </Box>



                  </Box>

                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Cerrar
                  </Button>
                  <Button variant="ghost">Confirmar</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Button
              bg="#8C6653"
              color="white"
              _hover={{ bg: "#D9BCB8" }}
              size="md"
              iconSpacing={3}
              borderRadius="8px"
              fontWeight="normal"
              width="60%" // Ancho fijo
              height="50px" // Altura fija
              mb={4}
            >
              F9 Pago Tarjeta
            </Button>

            <Button
              bg="#8C6653"
              color="white"
              _hover={{ bg: "#D9BCB8" }}
              size="md"
              iconSpacing={3}
              borderRadius="8px"
              fontWeight="normal"
              width="60%" // Ancho fijo
              height="50px" // Altura fija
              mb={4}
            >
              F10 Cancelar venta
            </Button>

            <Button
              bg="#8C6653"
              color="white"
              _hover={{ bg: "#D9BCB8" }}
              size="md"
              iconSpacing={3}
              borderRadius="8px"
              fontWeight="normal"
              width="60%" // Ancho fijo
              height="50px" // Altura fija
              mb={4}
            >
              F11 Cerrar caja
            </Button>

            <Button
              bg="#8C6653"
              color="white"
              _hover={{ bg: "#D9BCB8" }}
              size="md"
              iconSpacing={3}
              borderRadius="8px"
              fontWeight="normal"
              width="60%" // Ancho fijo
              height="50px" // Altura fija
              mb={4}
            >
              F12 Abrir caja
            </Button>

          </Box>

          <Box
            height="250px"
            width="25%"
            borderRadius="4px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="start"
          >
            <Text color="#2D3748" fontSize="5xl" fontWeight="bold">
              Total
            </Text>

            <Text color="#2D3748" fontSize="2xl" fontWeight="light">
              ${totalVenta.toFixed(2)}
            </Text>

          </Box>
        </Flex>
      </Box>

    </Box>
  );
}
