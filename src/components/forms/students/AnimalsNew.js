
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback, useState, useEffect, useRef } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { collection, addDoc, deleteDoc, where, onSnapshot, updateDoc, getDoc, Timestamp, getDocs, query } from 'firebase/firestore';
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

AnimalsNew.propTypes = {
  isEdit: PropTypes.bool,
  arrayAnimals1: PropTypes.object,
};


export default function AnimalsNew({ isEdit, arrayAnimals1 }) {
  const [value, setValue] = useState(30);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate1, setSelectedDate1] = useState();
  const [dietaFormateada, setDietaFormateada] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    //console.log(newValue);
  };



  const [arrayAnimals, setDocumentData] = useState();



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
      nivelpeligro: arrayAnimals?.danger_level || '',
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
          anim_born: selectedDate,
          anim_diet: values.dieta,
          anim_health_condition: values.condicion,
          anim_height: values.altura,
          anim_weight: values.peso,
          anim_img: values.anim_img,
          danger_level: values.nivelpeligro,
          created: Timestamp.now(),

        };

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

    setSelectedDate(date);

  };

  return (

    <FormikProvider value={formik}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Agregar Nuevo Animal
          </Typography>

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
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        isClearable
                        {...getFieldProps('date')}

                      />
                    </LocalizationProvider>
                    <TextField label="Peso(kg)"
                      {...getFieldProps('peso')}
                    />
                    <TextField label="nivel de peligro"
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
                      {!isEdit ? 'Create Animal' : 'Save Changes'}
                    </LoadingButton>
                  </Box>
                </Stack>
              </Card>
            </Grid>

          </Grid>
        </Form>
      </Container>
    </FormikProvider>
  );

}
