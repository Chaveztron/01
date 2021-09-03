import React, { useContext, useEffect } from "react";
import UserContext from "../context/Paciente/UserContext";
import Table from '../components/Table'
import Alerta from '../components/Alerta';
import FormModal from '../components/FormModal';
import { Dialog, Button, TextInput } from 'react-desktop/macOs';

const { ipcRenderer } = window.require("electron");

function Ancestor() {
    const [a, setA] = React.useState(1)
    return <button onClick={() => setA(a+1)} >El valor del boton {a}</button>
  } 

  const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
   }

export default function Pacientes(props) {
  const [formData, setFormData] = React.useReducer(formReducer, {});
  const [submitting, setSubmitting] = React.useState(false);
  const [modal, setModal] = React.useState(false)
  const [modalForm, setModalForm] = React.useState(false)
  const [seleccionados, setSeleccionados] = React.useState([])


  const userContext = useContext(UserContext);

    useEffect(() => {
      userContext.getUsers();
    }, []);

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);

    setModalForm(false)

    setTimeout(() => {
      setSubmitting(false);
    }, 3000)
  };

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }

  const borrarPacientes = (accion) => {
      console.log(accion)

      seleccionados.map((seleccionado) => {
        console.log('El paciente '+seleccionado.id+' a sido borrado')
        console.log(ipcRenderer.sendSync('del-paciente', {
          id: seleccionado.id,
        }))
        
      })
      window.location.reload();
      setModal(false)
  };

    
    const headCells = [
        { id: 'id', numeric: true, disablePadding: false, label: 'ID' },
        { id: 'apellido_paterno', numeric: false, disablePadding: false, label: 'Apellido paterno' },
        { id: 'apellido_materno', numeric: false, disablePadding: false, label: 'Apellido materno' },
        { id: 'nombre', numeric: false, disablePadding: true, label: 'Nombre' },
        { id: 'nacimiento', numeric: false, disablePadding: false, label: 'Fecha Nacimiento' },
        { id: 'telefono', numeric: true, disablePadding: false, label: 'Telefono' },
        { id: 'genero', numeric: false, disablePadding: false, label: 'Genero' },
      ];
    




  return (
    
      <div>
      {submitting &&
        <div>
          You are submitting the following:
          <ul>
            {Object.entries(formData).map(([name, value]) => (
              <li key={name}><strong>{name}</strong>:{value.toString()}</li>
            ))}
          </ul>
        </div>
       }
          <Table 
          rows={userContext.users} 
          headCells={headCells} 
          titulo={"Pacientes"} 
          delB={b => setModal(b)}
          addB={a => setModalForm(a)} 
          seleccionados={s => setSeleccionados(s)}
          />
          
          <Alerta 
          show={modal} 
          exit={salir => setModal(salir)} 
          titulo={seleccionados.length===1?`¿Estás seguro de que quieres eliminar a este paciente?`:`¿Estás seguro de que quieres eliminar a estos ${seleccionados.length} pacientes?`}
          msj={"La acción es irreversible y no se volverán a recuperar, ¿desea continuar?"} 
          confirm={confirm => borrarPacientes(confirm)}
        > </Alerta>

        <FormModal show={modalForm} exit={salir => setModalForm(salir)} titulo={'Agregar paciente\n*En construccion*'}> 
        <form onSubmit={handleSubmit}>

            <TextInput
            label="Apellido Paterno"
            placeholder="My Input"
            defaultValue=""
            rounded='8'
            centerPlaceholder
            name="name"
            onChange={handleChange}
            />
            <Button >Cancelar</Button>
            <Button color="blue" type="submit">Agregar</Button>   
          </form>
        </FormModal>
          
          <Ancestor></Ancestor>
          
      </div>
  );
}