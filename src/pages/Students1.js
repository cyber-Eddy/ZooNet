import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Modal,
  Box,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { where, getDocs, collection, query, onSnapshot, documentId,  doc, getDoc} from 'firebase/firestore';
import { db } from '../firebase';

// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';

// sections
import { UserListHead } from '../sections/@dashboard/user';

import NuevoEstudiante from '../components/forms/students/nuevo-animals';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nombre', alignRight: false },
  { id: 'company', label: 'Institucion', alignRight: false },
  { id: 'role', label: 'Ruta', alignRight: false },
  { id: 'status', label: 'Estado', alignRight: false },
  { id: '' },
];

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

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  return stabilizedThis.map((el) => el[0]);
}



export default function Students1() {
 
  
  const [open1, setOpen1] = useState(false);
  const handleOpen = () => setOpen1(true);
  const handleClose = () => setOpen1(false);

  /* =========================================
  FUNCION PARA LEER DATOS
 =========================================== */

  const [estudiante, setEstudiantes] = useState([]);
  const [driver, setDriver] = useState([]);
  useEffect(() => {
    const q = query(collection(db, 'estudiantes'));
    onSnapshot(q, (querySnapshot) => {
      setEstudiantes(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  console.log(estudiante);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getPublicaciones = async () => {
      const publicacionesRef = collection(db, "estudiantes");
      const publicacionesSnapshot = await getDocs(publicacionesRef);
      const filas = [];

      publicacionesSnapshot.forEach(async (publicacionDoc) => {
        const publicacionData = publicacionDoc.data();
        const autorDoc = await getDoc(doc(db, "conductor", publicacionData.stud_bus.id));
        const autorData = autorDoc.data();
        const fila = {
          id: publicacionDoc.id,
         ...publicacionData,
         nombre: autorData.nombre
        
        };
        filas.push(fila);
      });

      setRows(filas);
    };

    getPublicaciones();
  }, []);

  console.log(rows);
 
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - estudiante.length) : 0;

  const filteredUsers = applySortFilter(estudiante, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  
  return (
    <>
      <Helmet>
        <title> Estudiantes </title>
      </Helmet>

      {/* =========================================
          MODAL PARA AGREGAR DATOS
         =========================================== */}
      <Modal open={open1} onClose={handleClose} aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <NuevoEstudiante />
          </Typography>
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
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
            Agregar
          </Button>
        </Stack>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={estudiante.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                   {/* =========================================
                        ARRAY PARA RECORRER DATOS 
                       =========================================== */}
                  {rows.map((row) => {
                  

                    /* =========================================
                       DATOS RELACIONADOS DEL CONDUCTOR POR REFERANCIA
                       =========================================== */
                   
                    return (
                      <TableRow hover key={row.id} tabIndex={-1} role="checkbox">
                        <TableCell align="left" component="th" scope="row">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt="asdsad" src="adsad" />
                            <Typography variant="subtitle2" noWrap>
                              kasdsadsad
                              <br />
                             sdfsdf
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">sadfsdf</TableCell>

                        <TableCell align="left">Ruta rtrdgfdgd</TableCell>

                        <TableCell align="left">
                          <Label color={('qwe' === 'banned' && 'error') || 'success'}>activo</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={estudiante.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <div>
          <div>hola</div>
      {rows.map((publicacion) => (
        <div key={publicacion.id}>
          <h2>{publicacion.stud_bus.id}</h2>
          <p>{publicacion.nombre}</p>
          <p>Autor: {publicacion.stud_name}</p>
        </div>
      ))}
    </div>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
