import { Helmet } from 'react-helmet-async';
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
/*import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';*/
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
import { Form, FormikProvider, useFormik } from "formik";
import { useCallback, useState, useEffect, forwardRef } from 'react';
import { fData } from "../../../utils/formatNumber";

// @mui
import {
  Box,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Card,
  Stack,
  Button,
  Container,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Snackbar,
  Alert
} from '@mui/material';




import { collection, addDoc, doc, Timestamp, GeoPoint, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import { UploadAvatar } from "./upload";
// ----------------------------------------------------------------------




export default function NuevoAnimal() {


  const [openAlert, setOpenAlert] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);



  const [bus, setBus] = useState([]);

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const q = query(collection(db, 'conductor'));
    onSnapshot(q, (querySnapshot) => {
      setBus(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);



  const [nuevoNombre, setNombre] = useState('');
  const [nuevoApodo, setApodo] = useState('');
  const [nuevoEspecie, setEspecie] = useState('');
  const [nuevoGenero, setGenero] = useState('');
  const [nuevoEdad, setEdad] = useState('');
  const [nuevoArea, setArea] = useState('');
  const [nuevoFechaLlegada, setFechaLlegada] = useState('');
  const [nuevoNacimiento, setNacimiento] = useState('');
  const [nuevoDieta, setDieta] = useState('');
  const [nuevoSalud, setSalud] = useState('');
  const [nuevoAltura, setAltura] = useState('');
  const [nuevoPeso, setPeso] = useState('');
  const [nuevoImg, setImg] = useState('');
  const [nuevoPeligro, setPeligro] = useState('');
  const handleDateChange = (date) => {
    const formattedDate = date.getTime();;
    console.log(formattedDate);
    setSelectedDate(formattedDate);
    setFechaLlegada(formattedDate);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtener una referencia al documento del usuario


    // Crear un objeto con los datos de la publicación, incluyendo la referencia al usuario
    const newDoc = {
      anim_name: nuevoNombre,
      anim_nickname: nuevoApodo,
      anim_species: nuevoEspecie,
      anim_gender: nuevoGenero,
      anim_age: nuevoEdad,
      anim_area: nuevoArea,
      anim_arrive_date: nuevoFechaLlegada,
      anim_born: nuevoNacimiento,
      anim_diet: nuevoDieta,
      anim_health_condition: nuevoSalud,
      anim_height: nuevoAltura,
      anim_weight: nuevoPeso,
      avatarUrl: nuevoImg,
      danger_level: nuevoPeligro,
      created: Timestamp.now(),

    };

    console.log(newDoc);

    await addDoc(collection(db, 'animals'), newDoc).then(() => {
      /* <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
       <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
       Documento se agregó correctamente!
       </Alert>
     </Snackbar> */

    })
      .catch((error) => {
        console.error('Error al agregar la publicación: ', error);
      });







  };


  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setImg("avatarUrl", {
          ...file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [setImg]
  );

  /* =========================================
  FUNCION DE SUBIR IMAGENES
 =========================================== */
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Helmet>
        <title> Animales </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Entrada de animales
          </Typography>
        </Stack>

        <div>
          <Grid container spacing={3}>
            <Grid xs={12} md={12}>
              <Card>

                <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <Card>
                    <CardHeader subheader="Agrega la informacion del nuevo animal" title="Detalle de entrada" />
                    <CardContent sx={{ pt: 3 }}>
                      <Box sx={{ m: 1.5 }}>
                        <Grid container spacing={3}>


                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Nombre"
                              name="Nombre"
                              onChange={(e) => setNombre(e.target.value.toUpperCase())}
                              required
                              value={nuevoNombre}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Especie"
                              name="Especie"
                              onChange={(e) => setEspecie(e.target.value.toUpperCase())}
                              required
                              value={nuevoEspecie}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Apodo"
                              name="Apodo"
                              onChange={(e) => setApodo(e.target.value)}
                              required
                              value={nuevoApodo}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Edad"
                              name="Edad"
                              onChange={(e) => setEdad(e.target.value.toUpperCase())}
                              type="text"
                              value={nuevoEdad}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Area"
                              name="Area"
                              onChange={(e) => setArea(e.target.value.toUpperCase())}
                              type="text"
                              value={nuevoArea}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Genero"
                              name="Genero"
                              onChange={(e) => setGenero(e.target.value.toUpperCase())}
                              type="text"
                              value={nuevoGenero}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Dieta"
                              name="Dieta"
                              onChange={(e) => setDieta(e.target.value.toUpperCase())}
                              type="text"
                              value={nuevoDieta}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Altura(m)"
                              name="Altura"
                              onChange={(e) => setAltura(e.target.value.toUpperCase())}
                              type="text"
                              value={nuevoAltura}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Peso(kg)"
                              name="Peso"
                              onChange={(e) => setPeso(e.target.value.toUpperCase())}
                              type="text"
                              value={nuevoPeso}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Nivel de peligro"
                              name="Peligro"
                              onChange={(e) => setPeligro(e.target.value.toUpperCase())}
                              type="text"
                              value={nuevoPeligro}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Edad"
                              name="Edad"
                              onChange={(e) => setEdad(e.target.value.toUpperCase())}
                              type="text"
                              value={nuevoEdad}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                isClearable


                              />
                            </LocalizationProvider>
                          </Grid>

                        </Grid>
                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: 'flex-end', p: 3 }}>
                      <Button variant="contained" type="submit">
                        Registrar entrada
                      </Button>
                    </CardActions>
                  </Card>
                </form>

              </Card>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
}
