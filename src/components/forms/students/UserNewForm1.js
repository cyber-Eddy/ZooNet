import * as Yup from "yup";
import PropTypes from "prop-types";
import { useCallback, useState, useEffect, useRef } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { render } from "react-dom";


// material

import LoadingButton from '@mui/lab/LoadingButton';
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
import GoogleMapReact from "google-map-react";
import { Icon } from "@iconify/react";
import { fData } from "../../../utils/formatNumber";
import fakeRequest from "../../../utils/fakeRequest";
// routes

//
import Label from "./Label";
import { UploadAvatar } from "./upload";
import GoogleMapComponent from "./map-draggable-markers";

// ----------------------------------------------------------------------


export default function UserNewForm1() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  
  return (
    
      < >
      
        <Grid>
        <Box style={{ height: '120vh', width: '100%', padding: '0 10vh 20vh 10vh'}}
                      component="img"
                      src="https://media.discordapp.net/attachments/1076253611929108640/1101920653650702396/e4b10c14-4088-4bc6-a5e6-a2bb2832eb48.png?width=833&height=580"
                     
                    />
          </Grid>
      </>
   
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
