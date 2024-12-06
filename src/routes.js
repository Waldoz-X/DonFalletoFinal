import React from 'react';

import { Icon } from '@chakra-ui/react';


import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdOutlineShoppingCart,
  MdPadding,
  MdComputer,
  
} from 'react-icons/md';

import { MdProveedores,
  MdInicio,
  MdUsuarios, 
  MdPuntoDeVenta,
  MdProductos,
  MdInsumos,
  MdProduccion,
  MdStockProductos,
  MdCorteDeCaja,
  MdHistorialVentas
} from 'assets/Icons/Components/CustomIcons'; 


// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';
import RTL from 'views/admin/rtl';

import Proveedores from 'views/admin/proveedores'
import PuntoVenta from 'views/admin/puntoVenta'
import Productos from 'views/admin/productos'
import Insumos from 'views/admin/insumos'
import Produccion from 'views/admin/produccion'
import StockProductos from 'views/admin/stockProductos'
import CorteDeCaja from 'views/admin/corteDeCaja'
import HistorialDeVentas from 'views/admin/historialDeVentas'


const routes = [
  {
    name: 'Inicio',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdInicio} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },


  {
    name: 'Proveedores',
    layout: '/admin',
    path: '/proveedores',
    icon: (
      <Icon
       as={MdProveedores}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <Proveedores />,
  },

  {
    name: 'Usuarios',
    layout: '/admin',
    path: '/usuarios',
    icon: <Icon as={MdUsuarios} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  },

  {
    name: 'Punto de Venta',
    layout: '/admin',
    path: '/puntoventa',
    icon: <Icon as={MdPuntoDeVenta} width="22px" height="22px" color="inherit" />,
    component: <PuntoVenta/>,
  },

  {
    name: 'Productos',
    layout: '/admin',
    path: '/productos',
    icon: <Icon as={MdProductos} width="22px" height="22px" color="inherit" />,
    component: <Productos/>,
  },

  {
    name: 'Insumos',
    layout: '/admin',
    path: '/insumos',
    icon: <Icon as={MdInsumos} width="22px" height="22px" color="inherit" />,
    component: <Insumos/>,
  },

  {
    name: 'Producción',
    layout: '/admin',
    path: '/produccion',
    icon: <Icon as={MdProduccion} width="22px" height="22px" color="inherit" />,
    component: <Produccion/>,
  },
  {
    name: 'Stock Productos',
    layout: '/admin',
    path: '/stockproductos',
    icon: <Icon as={MdStockProductos} width="22px" height="22px" color="inherit" />,
    component: <StockProductos/>,
  },
  {
    name: 'Corte de caja',
    layout: '/admin',
    path: '/cortedecaja',
    icon: <Icon as={MdCorteDeCaja} width="22px" height="22px" color="inherit" />,
    component: <CorteDeCaja/>,
  },
  {
    name: 'Historial de ventas',
    layout: '/admin',
    path: '/historialventas',
    icon: <Icon as={MdHistorialVentas} width="22px" height="22px" color="inherit" />,
    component: <HistorialDeVentas/>,
  }


];

export default routes;
