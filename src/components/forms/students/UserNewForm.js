
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useCallback, useState, useEffect, useRef } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { render } from "react-dom";

import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Card,
  Button,
  Grid,
  Stack,
  Snackbar,
  Switch,
  TextField,
  Typography,
  FormHelperText,
  Alert,
  FormControlLabel,
} from "@mui/material";
// utils

import { Icon } from "@iconify/react";
import { fData } from "../../../utils/formatNumber";
import fakeRequest from "../../../utils/fakeRequest";
// routes

//
import Label from "./Label";
import { UploadAvatar } from "./upload";


// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function UserNewForm({ isEdit, currentUser }) {
 
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required").email(),
    phoneNumber: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    country: Yup.string().required("country is required"),
    company: Yup.string().required("Company is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    role: Yup.string().required("Role Number is required"),
    avatarUrl: Yup.mixed().required("Avatar is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      phoneNumber: currentUser?.phoneNumber || "",
      address: "asdkmkl" || "",
      country: currentUser?.country || "",
      state: currentUser?.state || "",
      city: currentUser?.city || "",
      zipCode: currentUser?.zipCode || "",
      avatarUrl: currentUser?.avatarUrl || null,
      isVerified: currentUser?.isVerified || true,
      status: currentUser?.status,
      company: currentUser?.company || "",
      role: currentUser?.role || "",
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        
        // resetForm();
        setSubmitting(false);
        console.log("guardado", values);
        handleClick(!isEdit ? "Create success" : "Update success", {
          variant: "success",
        });
        // navigate(PATH_DASHBOARD.user.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    },
  });

  const {
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
  } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue("avatarUrl", {
          ...file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
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
                        mx: "auto",
                        display: "block",
                        textAlign: "center",
                        color: "text.secondary",
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
                <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                  {touched.avatarUrl && errors.avatarUrl}
                </FormHelperText>
              
              </Box>
             
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="Nombre"
                    {...getFieldProps("name")}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Apellido"
                    {...getFieldProps("apellido")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="Email"
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    select
                    fullWidth
                    label="Institucion"
                    placeholder="Country"
                    {...getFieldProps("country")}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    <option value="sadsad" />
                    <option>La hemosa</option>
                    <option>Colegio Jacagua</option>
                  </TextField>
                </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="State/Region"
                    {...getFieldProps("state")}
                    error={Boolean(touched.state && errors.state)}
                    helperText={touched.state && errors.state}
                  />
                  <TextField
                    fullWidth
                    label="City"
                    {...getFieldProps("city")}
                    error={Boolean(touched.city && errors.city)}
                    helperText={touched.city && errors.city}
                  />
                </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="Address"
                    {...getFieldProps("address")}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <TextField
                    fullWidth
                    label="Zip/Code"
                    {...getFieldProps("zipCode")}
                  />
                </Stack>

                {/* <Map
                   {...viewport}
                   ref={mapRef}
                  style={{ width: '100%', height: 350 }}
                  onViewportChange={setViewport}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                  mapboxAccessToken={MAPBOX_TOKEN}
                /> */}

              

                <Snackbar
                  open={open}
                  autoHideDuration={2000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    This is a success message!
                  </Alert>
                </Snackbar>
                <Box
                  sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                >
                  <Button  type="submit"  loading={isSubmitting}>creaetajnjsk</Button>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    {!isEdit ? "Create User" : "Save Changes"}
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

const Marker1 = ({ draggable, onDragEnd }) => (
  <div
    style={{ cursor: draggable ? "pointer" : "default" }}
    draggable={draggable}
    onDragEnd={(map) => {
      onDragEnd(map);
    }}
  >
    <Icon icon="ic:twotone-location-on" color="red" width="50" />
  </div>
);
