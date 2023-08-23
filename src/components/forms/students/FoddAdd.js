
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback, useState, useEffect,useRef } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import TagInput from './TagInput';
// material
import { collection, doc, deleteDoc,where, onSnapshot, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../../../firebase';
import LoadingButton from '@mui/lab/LoadingButton';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format,getUnixTime, fromUnixTime } from 'date-fns';

import {
  Box,
  Card,
  Grid,
  Stack,
  Snackbar,Slider,
  Switch,Container,
  TextField,
  Typography,
  FormHelperText,
  Alert,
  FormControlLabel,
} from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
import fakeRequest from '../../../utils/fakeRequest';
// routes

//
import Label from './Label';
import { UploadAvatar } from './upload';

// ----------------------------------------------------------------------

FoodAdd.propTypes = {
  isEdit: PropTypes.bool,
  arrayFood1: PropTypes.object,
};

export default function FoodAdd({ isEdit, arrayFood1 }) {
  const [value, setValue] = useState(30);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate1, setSelectedDate1] = useState( );
  const [fechaFirebase, setfechaFirebase] = useState( );
  const handleChange = (event, newValue) => {
    setValue(newValue);
    //console.log(newValue);
  };
  /* =========================================
  FUNCION PARA LEER DATOS
 =========================================== */
 const location = useLocation();
 const queryParams = new URLSearchParams(location.search);
 const Food_id = queryParams.get('id');


 const [arrayFood, setDocumentData] = useState(null);


 /* =========================================
  OBTENER ANIMALE POR ID
 =========================================== */
 useEffect(() => {
   const fetchDocument = async () => {
     const documentId = Food_id; // Suponiendo que pasas el ID a través de react-router
     
     const docRef = doc(db, "Food", documentId);
     
     try {
       const docSnap = await getDoc(docRef);
       if (docSnap.exists()) {
         setDocumentData(docSnap.data());
         console.log(docSnap.data());
         const formattedDate = new Date(docSnap.data().anim_born.seconds);
         

         const fechaUnix = fromUnixTime(formattedDate);
         const fechaFormateada1 = format(fechaUnix, 'MM/dd/yyyy');
         console.log("formateada2",fechaFormateada1);
         setSelectedDate1(fechaFormateada1);
       } else {
         console.log('No existe el documento');
       }
     } catch (error) {
       console.error('Error al traer el documento:', error);
     }
   };

   fetchDocument();
 }, [Food_id]);

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

  
  /* =========================================
  FORMATEO DE FECHA
 =========================================== */





  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: arrayFood?.food_name || '',
      components: arrayFood?.components || '',
      porcion: arrayFood?.porcion_g || ''
    },
    //validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        // resetForm();
        setSubmitting(false);
        console.log('guardado', values);
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
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('avatarUrl', {
          ...file,
          preview: URL.createObjectURL(file),
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
  
  return (
    
    <FormikProvider value={formik}>
       <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
           Food  
          </Typography>
          
        </Stack>
     
        
        
      </Container>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 5, px: 3 }}>
              <Box sx={{ mb: 5 }}>
                <UploadAvatar
                  accept="image/*"
                  file={values.avatarUrl}
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
                    label="Nombre del alimento"
                    {...getFieldProps('food_name')}
                    
                  />
                  <TextField
                    fullWidth
                    label="Porcion en gramos"
                    // InputProps={{
                    //   startAdornment: <InputAdornment position="start">g</InputAdornment>,
                    // }}
                    {...getFieldProps('porcion_g')}
                   
                  />
                 
                </Stack>
                
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TagInput/>{}
                </Stack>


               {/* <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                  </Alert>
                </Snackbar> */}
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Add food' : 'Save Changes'}
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
