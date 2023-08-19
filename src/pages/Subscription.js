import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { sentenceCase } from "change-case";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";

import {
  collectionGroup,
  where,
  getDocs,
  collection,
  query,
  orderBy,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
// components

import { DataGrid } from "@mui/x-data-grid";
import Label from "../components/label";
import Iconify from "../components/iconify";

export default function Subscription() {
  const navigate = useNavigate();
  const navegacion = () => {
    navigate("/dashboard/nuevo-estudiante");
  };

  const [subscription, setSubscription] = useState([]);
  //const [estsuscripcion, setEstsuscripcion] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "tutors-subscriptions"),
      (snapShot) => {
        const list = [];
        let con = 0;
        snapShot.docs.forEach(async (productDoc) => {
          // list[productDoc.id] = productDoc.data();
          list.push({ id: productDoc.id, ...productDoc.data(),  });
           const subcollectionRef = collection(db, 'tutors-subscriptions/' + productDoc.id , '/subscriptions');
          //console.log(subcollectionRef);
         
          getDocs(subcollectionRef).then((querySnapshot, i) => {
            console.log(querySnapshot.empty);
            con++;
            if(!querySnapshot.empty){
              
              
            list[con].subscription = querySnapshot.docs[0].data().role
            }
           // list.push({  subscription1: querySnapshot.docs[0].data().role });
        //  list[].subscription = querySnapshot.docs[0].data().role ;
          /*  querySnapshot.forEach(async(doc1) => {
             // list.push({ ...doc1.data()});
             console.log(doc1.data().role + " index " + cont )
            
              list[doc1].subscription = (doc1.data().role) ;
          
              
            }); */
          });
        });
        console.log(list);
        setSubscription(list);
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
    { field: "email", headerName: "Cliente", width: 350 },
    {
      field: "subscriptions",
      headerName: "Estado",
      width: 200,

      renderCell: (params) => {
       
       // console.log("params role sfsadfsad     " + params.row.role);
        return (
          <Label
            color={
              (params.row.user_subs_status === "Unsubscribed" && "error") ||
              "success"
            }
          >
            {params.row.user_subs_status}
          </Label>
        );
      },
    },

    {
      field: "subscriptions1",
      headerName: "Suscripcion",
      width: 300,

      renderCell: (params) => {
        const fecha = new Date(params.row.created.seconds * 1000);
        // fecha.setDate(fecha.getDate());
const opciones = { day: 'numeric', month: 'numeric', year: 'numeric' };
const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones).replace(/ /g, '/');
        return (
          <Typography variant="subtitle2" noWrap>
             {fechaFormateada}
          </Typography>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
       
          <Button
            href={params.row.stripeLink}
            target="_blank"
            sx={{ color: "success.main", height: 2 }}
          >
            <Iconify
              sx={{ width: "30px", height: " 30px" }}
              icon="fa6-brands:cc-stripe"
            />
          </Button>
      
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title> Suscripciones </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Suscripciones
          </Typography>
        </Stack>
        <Card>
          <div style={{ height: 380, width: "100%" }}>
            <DataGrid
              rows={subscription}
              columns={columns}
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
