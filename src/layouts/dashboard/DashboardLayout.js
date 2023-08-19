import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//
 import { collection, doc, deleteDoc, onSnapshot, getDoc, query, getDocs, where } from 'firebase/firestore'

import { db } from "../../firebase"; 


import Nav from './nav';
import { UserAuth } from '../../context/AuthContext';



// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { user } = UserAuth();
    /* ================================================================
          DATOS DEL USUARIO
  ================================================================== */
  console.log(user.uid);
  useEffect(() => {
    const obtenerDatosDeUsuario = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap) {
          const list = [];
          list.push({
            ...docSnap?.data(), // Mantenemos los datos existentes de la suscripción (si los hay) y sobrescribimos los valores si hay nuevos valores.
            userId: docSnap.id
          });

          localStorage.setItem('datosUsuario', JSON.stringify(list));
          
          return docSnap.data();
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log('try mainnav'+ error);
      }
    };

    obtenerDatosDeUsuario();

  }, [user]);

  return (
    <StyledRoot>
      

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
