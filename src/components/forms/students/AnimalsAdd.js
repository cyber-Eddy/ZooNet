
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback, useState, useEffect, useRef } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { collection, doc, deleteDoc, where, onSnapshot, updateDoc, getDoc, getDocs, query } from 'firebase/firestore';
import { db, storage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import LoadingButton from '@mui/lab/LoadingButton';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { format, getUnixTime, fromUnixTime } from 'date-fns';

import {
  Box,
  Card,
  Grid,
  Stack,
  Snackbar, Slider,
  Switch, Container,
  TextField,
  Typography,
  FormHelperText,
  Alert,
  Button,
  FormControlLabel,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Iconify from '../../iconify';
// utils
import { fData } from '../../../utils/formatNumber';
import fakeRequest from '../../../utils/fakeRequest';
// routes

//
import Label from './Label';
import { UploadAvatar } from './upload';

// ----------------------------------------------------------------------

AnimalsAdd.propTypes = {
  isEdit: PropTypes.bool,
  arrayAnimals1: PropTypes.object,
};
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
export default function AnimalsAdd({ isEdit, arrayAnimals1 }) {
  const [value, setValue] = useState(30);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate1, setSelectedDate1] = useState();
  const [dietaFormateada, setDietaFormateada] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    //console.log(newValue);
  };
  /* =========================================
  FUNCION PARA LEER DATOS
 =========================================== */
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const animals_id = queryParams.get('id');


  const [arrayAnimals, setDocumentData] = useState();


  /* =========================================
   OBTENER ANIMALEs POR ID
  =========================================== */
  useEffect(() => {
    const fetchDocument = async () => {
      const documentId = animals_id; // Suponiendo que pasas el ID a través de react-router

      const docRef = doc(db, "animals", documentId);

      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDocumentData(docSnap.data());
          console.log(docSnap.data());
          const formattedDate = new Date(docSnap.data().anim_born.seconds);


          const fechaUnix = fromUnixTime(formattedDate);
          const fechaFormateada1 = format(fechaUnix, 'MM-dd-yyyy');


          setSelectedDate1(fechaFormateada1);
        } else {
          console.log('No existe el documento');
        }
      } catch (error) {
        console.error('Error al traer el documento:', error);
      }
    };

    fetchDocument();
  }, [animals_id]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  /*const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('country is required'),
    company: Yup.string().required('Company is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role Number is required'),
    avatarUrl: Yup.mixed().required('Avatar is required'),
  });*/
  /* =========================================
  FORMATEO DE FECHA
 =========================================== */





  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {

      name: arrayAnimals?.anim_name || '',
      especie: arrayAnimals?.anim_species || '',
      apodo: arrayAnimals?.anim_nickname || '',
      edad: arrayAnimals?.anim_age || '',
      dieta: arrayAnimals?.anim_diet || '',
      area: arrayAnimals?.anim_area || '',
      genero: arrayAnimals?.anim_gender || '',
      altura: arrayAnimals?.anim_height || '',
      anim_img: arrayAnimals?.anim_img || '',
      condicion: arrayAnimals?.anim_health_condition || '',
      nivelpeligro: arrayAnimals?.danger_level,
      peso: arrayAnimals?.anim_weight || '',
      nacimiento: arrayAnimals?.anim_born.seconds || '',
      estado: arrayAnimals?.estado || '',
      create: arrayAnimals?.anim_arrive_date || ''
    },
    //validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        // resetForm();
        setSubmitting(false);
        console.log('guardado', values);
        const newDoc = {
          anim_name: values.name,
          anim_nickname: values.apodo,
          anim_species: values.especie,
          anim_gender: values.genero,
          anim_age: values.edad,
          anim_area: values.area,
          //anim_arrive_date: values.,
          //anim_born: nuevoNacimiento,
          anim_diet: values.dieta,
          anim_health_condition: values.condicion,
          anim_height: values.altura,
          anim_weight: values.peso,
          anim_img: values.anim_img,
          danger_level: values.nivelpeligro


        };
        const docRef = doc(db, 'animals', animals_id);
        await updateDoc(docRef, newDoc).then(() => {
          /* <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
           <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
           Documento se agregó correctamente!
           </Alert>
         </Snackbar> */

        })
          .catch((error) => {
            console.error('Error al agregar la publicación: ', error);
          });

        handleClick(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        // navigate(PATH_DASHBOARD.user.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    },
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;
  /* =========================================
   FUNCION PARA AGREGAR FOTOS
  =========================================== */
  const handleDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const fileRef = ref(storage, file.name);
        await uploadBytesResumable(fileRef, file);
        const url = await getDownloadURL(fileRef);
        console.log(url);
        setFieldValue("anim_img", {
          url,
        });
      }
    },
    [setFieldValue]
  );
  const handleDateChange = (date) => {
    const formattedDate = date.getTime();;
    console.log(formattedDate);
    setSelectedDate(formattedDate);
    setFechaLlegada(formattedDate);
  };

  /*=====================================================================

 =====================================================================
 
 =====================================================================*/
  const alimentosCarnivoros = [
    {
      "food_name": "Carne de res",
      "id": 1,
      "nutritional_data": {
        "proteina": 20,
        "grasas": {
          "saturadas": 6,
          "trans": 1.1
        },
        "calcio": 0.018,
        "hierro": 0.02,
        "potasio": 0.0318,
        "sodio": 0.072,
        "colesterol": 0.07
      }
    },
    {
      "food_name": "Pollo",
      "id": 2,
      "nutritional_data": {
        "proteina": 23,
        "grasas": {
          "saturadas": 3,
          "trans": 0.5
        },
        "calcio": 0.01,
        "hierro": 0.015,
        "potasio": 0.025,
        "sodio": 0.08,
        "colesterol": 0.09
      }
    },
    {
      "food_name": "Pescado",
      "id": 3,
      "nutritional_data": {
        "proteina": 25,
        "grasas": {
          "saturadas": 2,
          "trans": 0.3
        },
        "calcio": 0.012,
        "hierro": 0.018,
        "potasio": 0.032,
        "sodio": 0.07,
        "colesterol": 0.05
      }
    },
    {
      "food_name": "Cordero",
      "id": 4,
      "nutritional_data": {
        "proteina": 22,
        "grasas": {
          "saturadas": 8,
          "trans": 1.2
        },
        "calcio": 0.02,
        "hierro": 0.025,
        "potasio": 0.03,
        "sodio": 0.075,
        "colesterol": 0.08
      }
    },
    {
      "food_name": "Cerdo",
      "id": 5,
      "nutritional_data": {
        "proteina": 21,
        "grasas": {
          "saturadas": 4,
          "trans": 0.6
        },
        "calcio": 0.015,
        "hierro": 0.022,
        "potasio": 0.03,
        "sodio": 0.085,
        "colesterol": 0.06
      }
    },
    {
      "food_name": "Ave de corral",
      "id": 6,
      "nutritional_data": {
        "proteina": 24,
        "grasas": {
          "saturadas": 2.5,
          "trans": 0.4
        },
        "calcio": 0.011,
        "hierro": 0.017,
        "potasio": 0.028,
        "sodio": 0.075,
        "colesterol": 0.07
      }
    }
  ];

  function generarDietaSemanal(animal, objetivo) {
    const diasDeLaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const dietaSemanal = [];

    for (const dia of diasDeLaSemana) {
      const alimentosDelDia = [];

      alimentosCarnivoros.forEach(alimento => {
        const cantidad = calcularCantidadAlimento(alimento, animal, objetivo);
        if (cantidad > 0) {
          alimentosDelDia.push({ food_name: alimento.food_name, cantidad });
        }
      });

      if (alimentosDelDia.length > 0) {
        dietaSemanal.push({ dia, alimentos: alimentosDelDia });
      }
    }

    return dietaSemanal;
  }

  function calcularCantidadAlimento(alimento, animal, objetivo) {
    let cantidad = 0;

    const pesoKg = Number(animal.anim_weight); // Convertir gramos a kilogramos
    const edadSemanas = animal.anim_age * 52; // Convertir años a semanas
    const alturaMetros = Number(animal.anim_height);

    const factorGenero = animal.anim_gender === "Male" ? 1.15 : 1; // Factor de género para machos y hembras
    const factorEstado = obtenerFactorEstado(animal.estado, objetivo); // Obtener el factor según el estado del animal y el objetivo

    //cantidad = alimento.nutritional_data.proteina * 2 * pesoKg * edadSemanas * alturaMetros * factorGenero * factorEstado;
    cantidad = (alimento.nutritional_data.proteina * 2 * pesoKg / 170 * edadSemanas * alturaMetros * factorGenero * factorEstado) / 1000; //
    const cantidadFormateada = parseFloat(cantidad).toFixed(2);
    return cantidadFormateada;
  }

  function obtenerFactorEstado(estado, objetivo) {
    if (estado === "embarazada") {
      if (objetivo === "aumentar") {
        return 1.2; // Porcentaje de aumento específico para embarazadas
      } else if (objetivo === "disminuir") {
        return 0.8; // Porcentaje de reducción específico para embarazadas
      }
    } else if (estado === "amamantando") {
      if (objetivo === "aumentar") {
        return 1.2; // Porcentaje de aumento específico para lactancia
      } else if (objetivo === "disminuir") {
        return 0.8; // Porcentaje de reducción específico para lactancia
      }
    } else {
      if (objetivo === "aumentar") {
        return 1.2; // Porcentaje de aumento específico para hembras normales
      } else if (objetivo === "disminuir") {
        return 0.9; // Porcentaje de reducción específico para hembras normales
      }
    }

    return 1; // Factor 1 para mantener sin cambios
  }

  // Ejemplo de un objeto animal con peso, edad, altura, género y estado
  const animalEjemplo = {
    peso: 180, // en kilogramos
    edad: 2, // en años
    altura: 1.5, // en metros
    genero: "macho", // o "hembra"
    estado: "normal" // Cambiar según el estado del animal ("normal", "embarazada", "amamantando")
  };



  /*=====================================================================
 
  =====================================================================
  =====================================================================
   =====================================================================*/
  const [objetivoSeleccionado, setObjetivoSeleccionado] = useState('');

  const handleChangeObjetivo = (event) => {
    setObjetivoSeleccionado(event.target.value);
  };
  const miFuncion = () => {
    console.log('Objetivo seleccionado:', objetivoSeleccionado);
    console.log('¡Botón clickeado!');
    const objetivoEjemplo = "mantener"; // Cambiar el objetivo según sea necesario ("aumentar", "disminuir", "mantener")
    const dietaGenerada = generarDietaSemanal(arrayAnimals, objetivoSeleccionado);

    //Mostrar la dieta generada con una mejor visualización y cantidades en kilogramos
    const dietaFormateadaKg = JSON.stringify(dietaGenerada, null, 2);
    setDietaFormateada(JSON.parse(dietaFormateadaKg));
    // console.log(dietaFormateadaKg);
  };
  const obtenerIndicesAleatorios = (length) => {
    const indicesAleatorios = new Set();
    while (indicesAleatorios.size < 1) {
      const indiceAleatorio = Math.floor(Math.random() * length);
      indicesAleatorios.add(indiceAleatorio);
    }
    return Array.from(indicesAleatorios);
  };


  return (

    <FormikProvider value={formik}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Animal
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={miFuncion}>
            Agregar
          </Button>
        </Stack>




        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ py: 5, px: 3 }}>
                <Box sx={{ mb: 5 }}>
                  <UploadAvatar
                    accept="image/*"
                    file={values.anim_img.url}
                    maxSize={3145728}
                    onDrop={handleDrop}
                    error={Boolean(touched.avatarUrl && errors.avatarUrl)}
                    caption={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 2,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.secondary',
                        }}
                      >
                        Allowed *.jpeg, *.jpg, *.png, *.gif
                        <br /> max size of {fData(3145728)}
                      </Typography>
                    }
                  />
                  <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                    {touched.avatarUrl && errors.avatarUrl}
                  </FormHelperText>
                </Box>

              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      {...getFieldProps('name')}

                    />
                    <TextField
                      fullWidth
                      label="Especie"
                      {...getFieldProps('especie')}

                    />
                  </Stack>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                    <TextField
                      fullWidth
                      label="Apodo"
                      {...getFieldProps('apodo')}

                    />
                    <TextField
                      select
                      fullWidth
                      label="Dieta"
                      placeholder="Dieta"
                      {...getFieldProps('dieta')}
                      SelectProps={{ native: true }}

                    >
                      <option value="sadsad" />
                      <option>Carnivore</option>
                      <option>Herbivore</option>
                    </TextField>
                  </Stack>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                    <TextField
                      fullWidth
                      label="Edad"
                      {...getFieldProps('edad')}

                    />
                    <TextField
                      fullWidth
                      label="Area"
                      {...getFieldProps('area')}

                    />
                  </Stack>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                    <TextField
                      select
                      fullWidth
                      label="Genero"
                      placeholder="Genero"
                      {...getFieldProps('genero')}
                      SelectProps={{ native: true }}

                    >
                      <option value="sadsad" />
                      <option>Male</option>
                      <option>Female</option>

                    </TextField>
                    <TextField
                      fullWidth
                      label="Altura(m)"
                      {...getFieldProps('altura')}

                    />
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Nacimiento"

                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        value={dayjs(selectedDate1)}
                        defaultValue={dayjs('2022-04-17')}



                      />
                    </LocalizationProvider>
                    <TextField label="Peso(kg)"
                      {...getFieldProps('peso')}
                    />
                    <TextField

                      label="Nivel de peligro"
                      {...getFieldProps('nivelpeligro')}

                    />
                  </Stack>






                  {/* <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                  </Alert>
                </Snackbar> */}
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                      {!isEdit ? 'Create User' : 'Save Changes'}
                    </LoadingButton>
                  </Box>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                  <Typography variant="h4" gutterBottom>
                    Dieta recomendada semanal
                  </Typography>

                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                  <TextField
                    select
                    label="Objetivo"
                    placeholder="Objetivo"
                    // {...getFieldProps('genero')}
                    value={objetivoSeleccionado}
                    onChange={handleChangeObjetivo}
                    SelectProps={{ native: true }}

                  >
                    <option value="sadsad" />

                    <option>aumentar</option>
                    <option>disminuir</option>
                    <option>mantener</option>

                  </TextField>
                  <Button variant="contained" startIcon={<Iconify icon="fluent-mdl2:generate" />} onClick={miFuncion}>
                    Generar dieta
                  </Button>
                </Stack>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Dia de la Semana</TableCell>
                        <TableCell align="left">Primer alimento</TableCell>


                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {console.log("aqui", dietaFormateada)}
                      {!dietaFormateada ? (
                        <TableRow>
                          <TableCell component="th" align="center">
                            <img class="MuiBox-root css-1ckry8b" alt="empty content" style={{ width: "80%" }} src="https://minimals.cc/assets/icons/empty/ic_content.svg" />
                            <span class="MuiTypography-root MuiTypography-h6 css-149g82e">No Data</span>
                          </TableCell>

                        </TableRow>



                      ) : (
                        dietaFormateada.map((row) => {
                          const indicesAleatorios = obtenerIndicesAleatorios(row.alimentos.length);

                          return (
                            <TableRow
                              key={row.dia}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row.dia}
                              </TableCell>

                              {/* Mostrar los nombres de los dos alimentos aleatorios */}
                              {indicesAleatorios.map((indice) => (
                                <TableCell key={indice} align="left">
                                  {row.alimentos[indice].food_name}<br />
                                  cantidad:&nbsp;{row.alimentos[indice].cantidad}&nbsp;kg
                                </TableCell>
                              ))}

                              {/* Rellenar con celdas vacías si no hay suficientes elementos aleatorios */}
                              {indicesAleatorios.length < 1 &&
                                Array.from({ length: 2 - indicesAleatorios.length }).map((_, index) => (
                                  <TableCell key={index} align="left"></TableCell>
                                ))}
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </Container>
    </FormikProvider>
  );

}
