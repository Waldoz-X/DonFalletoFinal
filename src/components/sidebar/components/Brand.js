import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Image } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";
import logo from 'assets/img/Logo.png'; // Ruta de la imagen

export function SidebarBrand() {
  // Chakra color mode
  let logoColor = useColorModeValue("white");

  return (
    <Flex align="center" direction="column">
      <Image
        src={logo}
        alt="Logo"
        height="100px"
        width="100px"
        margin="0 22px 16px 0"
      />
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
