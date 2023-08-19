import { Helmet } from 'react-helmet-async';

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
// @mui
import {
  Card,
  Stack,
  Avatar,
  Button,
  Container,
  Typography,
  Modal,
  Box,
} from '@mui/material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { DataGrid } from '@mui/x-data-grid';
import { collection, doc, deleteDoc, onSnapshot, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';


// components
import Iconify from '../components/iconify';
import NuevoEstudiante from '../components/forms/students/nuevo-animals';
import UserNewForm from '../components/forms/students/UserNewForm';

// ----------------------------------------------------------------------

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  height: '100%',
  boxShadow: 24,
  p: 4,
  m: 3,
  overflow: 'scroll',
};

export default function Students() {
  const [open1, setOpen1] = useState(false);
  const handleOpen = () => setOpen1(true);
  const handleClose = () => setOpen1(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const navigate = useNavigate()
  /* =========================================
  FUNCION PARA LEER DATOS
 =========================================== */

 // const [driver, setDriver] = useState([]);
 

// =============================================================
  const [data1, setData] = useState([]);
  useEffect(() => {
    
    const unsub = onSnapshot(
      collection(db, 'students'),
      (snapShot) => {
        const list = [];

        snapShot.docs.forEach(async (doc1) => {
         /* const autorDoc = await getDoc(doc(db, "conductor",doc1.data().stud_bus.id));
    const autorData = autorDoc.data();
          
          console.log(autorData); */
          list.push({ id: doc1.id, ...doc1.data()});
        }); 
        console.log(list);
        setData(list);
        
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);



  const columns = [
  
    { field: 'fullName', headerName: 'Nombre', width: 250, 
      
    renderCell: (params) => {
      return (
        <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar alt={params.row.stud_name} src={params.row.stud_img.url} />
        <Typography variant="subtitle2" noWrap>
        {params.row.stud_name} {params.row.stud_last}
        <br />
        {params.row.stud_email}
      </Typography>
      </Stack>
        
      );
    },
  
    },
    { field: 'Ruta', headerName: 'Ruta', width: 350, 
      
    renderCell: (params) => {           
      return (
        <Typography variant="subtitle2" noWrap>
        { params.row.stud_direction}
      </Typography>
      );
    },
  
    },
    { field: 'stud_inst', headerName: 'Institucion', width: 180 },
    
    { field: 'stud_phone', headerName: 'Telefono',  width: 150 },
   
  ];

  const handleDelete = async (id) => {
    const MySwal = withReactContent(Swal);


    MySwal.fire({
      title: '¿Quieres eliminar este archivo?',
      text: "Esta acción borrará permanentemente los datos de este archivo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2065D1',
      cancelButtonColor: '#FC5C58',
      confirmButtonText: 'Eliminar'
    }).then ((result) => {
      if (result.isConfirmed) {
        try {
           deleteDoc(doc(db, 'estudiantes', id));
          setData(data1.filter((item) => item.id !== id));
        } catch (err) {
          console.log(err);
        } 
        Swal.fire(
          'Eliminado!',
          'El archivo ha sido eliminado.',
          'success'
        )
      }
    });
    
   /* try {
      await deleteDoc(doc(db, 'estudiantes', id));
      setData(data1.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    } */
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      renderCell: (params) => (
        
          <>
            <Button onClick={handleOpen2} sx={{minWidth: '20px'}}>
              <Iconify icon={'eva:edit-fill'} />
            </Button>

            <Button onClick={() => handleDelete(params.row.id)} sx={{ color: 'error.main', minWidth: '20px' }} >
              <Iconify icon={'eva:trash-2-outline'} />
            </Button>
          </>
        ),
     
    },
  ];
  return (
    <>
      <Helmet>
        <title> Estudiantes </title>
      </Helmet>

      {/* =========================================
          MODAL PARA AGREGAR DATOS
         =========================================== */}
      <Modal open={open1} onClose={handleClose} aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
         
           afsad
        </Box>
      </Modal>
      {/* =========================================
          MODAL PARA AGREGAR DATOS
         =========================================== */}

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Estudiantes
          </Typography>
         
        </Stack>
        <Card>
          <div style={{ height: 380, width: '100%' }}>
            <DataGrid
              rows={data1}
              columns={columns.concat(actionColumn)}
              initialState={{
              
                pagination: {
                 
                  paginationModel: {
                    pageSize: 5,
                    /* page: 0 // default value will be used if not passed */
                  },
                },
              }}
              
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 25]}
            />
          </div>
        </Card>
      </Container>
    </>
  );
}
