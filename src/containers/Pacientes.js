import React, { useContext, useEffect } from "react";
import UserContext from "../context/Paciente/UserContext";
import Table from '../components/Table'
import Alerta from '../components/Alerta';
import FormModal from '../components/FormModal';

import SelectM from "../components/inputs/select";
import InputText from "../components/inputs/input_text";
import InputNum from "../components/inputs/input_num";

const { ipcRenderer } = window.require("electron");


  const formReducer = (state, event) => {
    if(event.reset) {
      return {
        apple: '',
        count: 0,
        name: '',
        'gift-wrap': false,
      }
    }
    return {
      ...state,
      [event.name]: event.value
    }
   }

export default function Pacientes(props) {
  const [formData, setFormData] = React.useReducer(formReducer, {
    count: 100,
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [modal, setModal] = React.useState(false)
  const [modalForm, setModalForm] = React.useState(false)
  const [seleccionados, setSeleccionados] = React.useState([])
  const [error, setError] = React.useState(false)

  const userContext = useContext(UserContext);

    useEffect(() => {
      userContext.getUsers();
    }, []);

    //console.log(formData) // <-- cachar los datos para hacer las validaciones
    // en caso de error, enviar al submit para devolver un mensaje

    const validacion = (data) => {
      console.log(data.name)
      // aqui cachariamos los valores de cada elemento para realizar las validaciones
      // dependiedo la naturaleza de los errores, se cambiara la naturaleza de este dato de abajo
      setError(false)
    }


  const handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox';
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });

    validacion(formData) // por cada evneto, mandamos parametros de cada input del for aca y lo validamos

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
    
const sexo = [
  {value: 'Hombre', title: 'Hombre'},
  {value: 'Mujer', title: 'Mujer'}
]

const apples = [
  {value: 'fuji', title: 'Fuji'},
  {value: 'jonathan', title: 'Jonathan'},
  {value: 'honey-crisp', title: 'Honey Crisp'}
]



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

        <FormModal 
          show={modalForm} 
          exit={salir => setModalForm(salir)} 
          titulo={'Agregar paciente'} 
          submitting= { submitting => setSubmitting(submitting)}
          formData = {res => setFormData({reset: res}) }
          error = {error}
          > 

          <InputText
            label="Apellido Paterno"
            placeholder="Chavez"
            name="name"
            value={formData.name || ''}
            onchange={handleChange}
            dis={submitting?true:false}
          />

        
            <SelectM 
              value={formData.genero || ''} 
              name="genero" 
              label="Genero"
              onchange={handleChange} 
              dis={submitting?true:false}
              options={sexo} 
            />


            <SelectM 
            value={formData.apple || ''}
            name="apple" 
            label="Apple"
            onchange={handleChange} 
            dis={submitting?true:false}
            options={apples} 
          />

          <InputNum
          label="Count"
          name="count" 
          onchange={handleChange} 
          value={formData.count || ''} 
          dis={submitting?true:false}
          max={120}
          prefix=''
          />
 
     
            <fieldset>
            <label>
              <p>Gift Wrap</p>
              <input 
              type="checkbox" 
              name="gift-wrap" 
              onChange={handleChange} 
              checked={formData['gift-wrap'] || false}
              disabled={formData.apple !== 'fuji' || submitting}
              />
            </label>     
          </fieldset>

 

        </FormModal>
          
      </div>
  );
}