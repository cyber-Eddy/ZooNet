import { useState, useEffect } from "react";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { DataGrid } from "@mui/x-data-grid";
import { db } from '../firebase';

const Publicaciones = () => {
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
          nombre: publicacionData.stud_name,
          apellido: publicacionData.stud_last,
          img: autorData.nombre,
        };
        filas.push(fila);
      });

      setRows(filas);
    };

    getPublicaciones();
  }, [db]);

  const columns = [
    { field: "nombre", headerName: "Título", width: 200 },
    { field: "apellido", headerName: "Contenido", width: 400 },
    { field: "img", headerName: "Autor", width: 200 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default Publicaciones;