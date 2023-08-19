import { Helmet } from 'react-helmet-async';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect,fragment } from 'react';

// @mui
import {
  Stack,
  Container,
  Typography,Snackbar,Alert,
  Modal,
  Box,

} from '@mui/material';

import UserNewForm1 from '../components/forms/students/UserNewForm1';

// ----------------------------------------------------------------------

export default function AddDrivers() {
  const [open1, setOpen1] = useState(false);
  const handleOpen = () => setOpen1(true);
  const handleClose = () => setOpen1(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  /* =========================================
  FUNCION PARA LEER DATOS
 =========================================== */
 const location = useLocation();
 const queryParams = new URLSearchParams(location.search);
 const id = queryParams.get('id');

  const { pathname } = useLocation();
  const isEdit = pathname.includes('edit');

  

  return (
    <>
      <Helmet>
        <title> Rutas </title>
      </Helmet>

      {/* =========================================
          MODAL PARA AGREGAR DATOS
         =========================================== */}

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
           Rutas mas efectivas <br/> <Typography variant="p" gutterBottom>
            para los estudiantes de Jacagua{id}
          </Typography>
          </Typography>
          
        </Stack>
        
       
        <UserNewForm1 />
        
      </Container>
    </>
  );
}
