import React, { useContext, useEffect } from "react";
import UserContext from "../context/Paciente/UserContext";
import Table from '../components/Table'

import Alerta from '../components/Alerta';

function Ancestor() {
    const [a, setA] = React.useState(1)
    return <button onClick={() => setA(a+1)} >El valor del boton {a}</button>
  } 

export default function Pacientes(props) {
  const [modal, setModal] = React.useState(false)
  const [seleccionados, setSeleccionados] = React.useState([])

    
  const userContext = useContext(UserContext);

    useEffect(() => {
      userContext.getUsers();
    }, []);

    ////Logica para borrar a los usuarios

    
    const headCells = [
        { id: 'id', numeric: true, disablePadding: false, label: 'ID' },
        { id: 'apellido_paterno', numeric: false, disablePadding: false, label: 'Apellido paterno' },
        { id: 'apellido_materno', numeric: false, disablePadding: false, label: 'Apellido materno' },
        { id: 'nombre', numeric: false, disablePadding: true, label: 'Nombre' },
        { id: 'nacimiento', numeric: false, disablePadding: false, label: 'Fecha Nacimiento' },
        { id: 'telefono', numeric: true, disablePadding: false, label: 'Telefono' },
        { id: 'genero', numeric: false, disablePadding: false, label: 'Genero' },
      ];
    

  let titulo = "pacientes"


  return (
    
      <div>
          <h1>{titulo}</h1>
          <Table 
          rows={userContext.users} 
          headCells={headCells} 
          titulo={"Pacientes"} 
          delB={b => setModal(b)} 
          seleccionados={s => setSeleccionados(s)}
          />
          
          <Alerta 
          show={modal} 
          exit={salir => setModal(salir)} 
          titulo={seleccionados.length===1?`¿Estás seguro de que quieres eliminar a este paciente?`:`¿Estás seguro de que quieres eliminar a estos ${seleccionados.length} pacientes?`}
          msj={"La acción es irreversible y no se volverán a recuperar, ¿desea continuar?"} 
          confirm={confirm => console.log(confirm)}
        > </Alerta>
          
          <Ancestor></Ancestor>
          
      </div>
  );
}