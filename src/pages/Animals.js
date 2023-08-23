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
import { collection, doc, deleteDoc,where, onSnapshot, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';


// components
import Iconify from '../components/iconify';
import NuevoAnimals from '../components/forms/students/nuevo-animals';
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
};const alimentosRecomendados = [];

export default function Drivers() {
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
  // Obten los datos del animal y los componentes nutricionales necesarios
const animalData = {
  nombre: 'Leon',
  componentesNecesarios: ['proteina', 'Vitamina B6' ]
};

// Crea una referencia a la colección "comida"

const comidaRef = collection(db, 'food');



for (let i = 0; i < animalData.componentesNecesarios.length; i++) {
  
  const q = query(comidaRef, where('components.' + animalData.componentesNecesarios[i], '>=', 0));
  
  getDocs(q)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const alimento = doc.data();
      
        alimentosRecomendados.push(alimento.food_name);
      });
      
     
    })
    .catch((error) => {
      console.error('Error al realizar la consulta:', error);
    });
}
if (alimentosRecomendados.length > 0) {
  console.log(`Alimentos recomendados para ${animalData.food_name} :`, alimentosRecomendados);
} else {
  console.log(`No se encontraron alimentos recomendados para ${animalData.food_name}`);
}

// Construye la consulta
/*const q = query(comidaRef, where('components.' + animalData.componentesNecesarios[i], '>=', 0)
// Agrega más condiciones where según sea necesario
);


// Realiza la consulta y obtén los resultados
getDocs(q)
  .then((querySnapshot) => {
    console.log("Alimentos recomendados para query " ,querySnapshot );
    const alimentosRecomendados = [];
    querySnapshot.forEach((doc) => {
      const alimento = doc.data();
      alimentosRecomendados.push(alimento.food_name);
    });
    console.log(`Alimentos recomendados para ${animalData.nombre}:`, alimentosRecomendados);
  })
  .catch((error) => {
    console.error('Error al realizar la consulta:', error);
  });*/

// =============================================================
  const [data1, setData] = useState([]);
  useEffect(() => {
    
    const unsub = onSnapshot(
      collection(db, 'animals'),
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
  
    { field: 'fullName', headerName: 'Nombre', width: 300, 
      
    renderCell: (params) => {
      return (
        <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar alt={params.row.anim_name} src="asd" />
        <Typography variant="subtitle2" noWrap>
        {params.row.anim_nickname} {params.row.anim_name}
        <br />
        {params.row.anim_species}
      </Typography>
      </Stack>
        
      );
    },
 
    },
    { field: 'Ruta', headerName: 'Genero', width: 200, 
      
    renderCell: (params) => {           
      return (
        <Typography variant="subtitle2" noWrap>
        { params.row.anim_gender}
      </Typography>
      );
    },
  
    },
    { field: 'anim_diet', headerName: 'Dieta', width: 130 },
    { field: 'anim_area', headerName: 'Area', width: 130 },
   
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
      width: 200,
      renderCell: (params) => (
        
         <>
            <Button onClick={handleOpen2}  href={`/animal-add?id=${params.row.id}`}>
              
              <Iconify icon="solar:map-arrow-square-bold" />

            </Button>

            <Button onClick={() => handleDelete(params.row.id)} sx={{ color: 'error.main' }}>
              <Iconify icon={'eva:trash-2-outline'} />
            </Button>
            </>
        ),
     
    },
  ];
  return (
    <>
      <Helmet>
        <title> Animales </title>
      </Helmet>

      {/* =========================================
          MODAL PARA AGREGAR DATOS
         =========================================== */}
      <Modal open={open1} onClose={handleClose} aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <NuevoAnimals />
          </Typography>
        </Box>
      </Modal>
     {/* =========================================
          MODAL PARA AGREGAR DATOS
         =========================================== */}

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Animales
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
            Agregar
          </Button>
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
              checkboxSelection
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 25]}
            />
          </div>
        </Card>
      </Container>
    </>
  );
}

