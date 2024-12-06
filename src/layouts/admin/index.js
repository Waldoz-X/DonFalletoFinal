import React, { useState, useEffect } from 'react'; // Importa React y hooks de estado y efecto.
import { Box, Portal } from '@chakra-ui/react'; // Importa componentes de diseño de Chakra UI.
import Navbar from 'components/navbar/NavbarAdmin.js'; // Importa el componente de la barra de navegación.
import Footer from 'components/footer/FooterAdmin.js'; // Importa el componente del pie de página.
import Sidebar from 'components/sidebar/Sidebar.js'; // Importa el componente de la barra lateral.
import { SidebarContext } from 'contexts/SidebarContext'; // Importa el contexto para la barra lateral.
import { useLocation, Navigate, Routes, Route } from 'react-router-dom'; // Importa herramientas para manejo de rutas.
import routes from 'routes'; // Importa la configuración de rutas de la aplicación.

// Componente principal del dashboard
export default function Dashboard(props) {
  const { ...rest } = props; // Extrae todas las props pasadas al componente.
  const location = useLocation(); // Hook para obtener la ubicación actual de la aplicación.
  const [brandText, setBrandText] = useState('Default Brand Text'); // Estado para el texto del módulo activo.
  const [toggleSidebar, setToggleSidebar] = useState(false); // Estado para alternar la barra lateral.

  // Hook para actualizar el texto del módulo actual al cambiar la ruta.
  useEffect(() => {
    const activeRoute = getActiveRoute(routes); // Obtiene el nombre del módulo actual.
    setBrandText(activeRoute); // Actualiza el texto de la marca.
  }, [location]); // Se ejecuta cada vez que cambia la ubicación.

  // Función para obtener el nombre del módulo activo según las rutas configuradas.
  const getActiveRoute = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        // Si la ruta tiene subrutas colapsadas, busca recursivamente.
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        // Si la ruta pertenece a una categoría, busca recursivamente.
        let categoryActiveRoute = getActiveRoute(routes[i].items);
        if (categoryActiveRoute) {
          return categoryActiveRoute;
        }
      } else {
        // Verifica si la ruta actual coincide con la ruta del navegador.
        if (
          window.location.pathname === `${routes[i].layout}${routes[i].path}`
        ) {
          return routes[i].name; // Devuelve el nombre del módulo actual.
        }
      }
    }
    return 'Default Brand Text'; // Texto predeterminado si no coincide ninguna ruta.
  };

  // Función para generar las rutas a partir de la configuración.
  const getRoutes = (routes) => {
    return routes.map((route, key) => {
      if (route.layout === '/admin') {
        // Si la ruta pertenece al diseño "/admin", genera un componente <Route>.
        return (
          <Route path={`${route.path}`} element={route.component} key={key} />
        );
      }
      if (route.collapse) {
        // Si la ruta tiene subrutas colapsadas, llama a getRoutes recursivamente.
        return getRoutes(route.items);
      }
      return null; // Si no cumple las condiciones, no renderiza nada.
    });
  };

  // Renderización del componente principal del dashboard.
  return (
    <Box>
      {/* Proveedor de contexto para la barra lateral */}
      <SidebarContext.Provider value={{ toggleSidebar, setToggleSidebar }}>
        {/* Componente de la barra lateral */}
        <Sidebar routes={routes} {...rest} />
        <Box
          bg="#F7F1EF" // Color de fondo del contenedor principal.
          float="right" // Posiciona el contenido principal a la derecha.
          minHeight="100vh" // Altura mínima igual a la altura de la ventana.
          maxHeight="100%" // Altura máxima igual a la altura total del contenedor.
          overflow="auto" // Permite el scroll si el contenido excede el contenedor.
          position="relative" // Posición relativa para contener elementos hijos.
          w={{ base: '100%', xl: 'calc( 100% - 290px )' }} // Ajusta el ancho según el tamaño de pantalla.
        >
          <Portal>
            {/* Componente de la barra de navegación */}
            <Navbar
              logoText={'Logo'} // Texto del logo en la barra de navegación.
              brandText={brandText} // Texto dinámico del módulo activo.
              fixed={false} // Indica si la barra es fija o no.
              {...rest}
            />
          </Portal>
          <Box p="20px"> {/* Contenedor del contenido principal */}
            <Routes>
              {getRoutes(routes)} {/* Renderiza las rutas generadas dinámicamente */}
              {/* Redirección predeterminada a la ruta "/admin/default" */}
              <Route path="/" element={<Navigate to="/admin/default" replace />} />
            </Routes>
          </Box>
          <Footer /> {/* Componente del pie de página */}
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
