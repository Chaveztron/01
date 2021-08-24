import React from 'react';
import Table from '../components/Table'

const { ipcRenderer } = window.require("electron");

export default function Pacientes(props) {


    var users = ipcRenderer.sendSync('get-pacientes')


    const headCells = [
        { id: 'id', numeric: true, disablePadding: false, label: 'ID' },
        { id: 'nombre', numeric: false, disablePadding: true, label: 'Nombre' },
        { id: 'apellido_paterno', numeric: false, disablePadding: false, label: 'Apellido paterno' },
        { id: 'apellido_materno', numeric: false, disablePadding: false, label: 'Apellido materno' },
        { id: 'nacimiento', numeric: false, disablePadding: false, label: 'Fecha Nacimiento' },
        { id: 'telefono', numeric: true, disablePadding: false, label: 'Telefono' },
        { id: 'genero', numeric: false, disablePadding: false, label: 'Genero' },
      ];

        var rows = []

        function crearDatos(id, nombre, apellido_paterno, apellido_materno, nacimiento, telefono, genero) {
            return {id, nombre, apellido_paterno, apellido_materno, nacimiento, telefono, genero };
          }

        users.map((user, index) =>(
            rows = [...rows, crearDatos(
                user.id, 
                user.nombre, 
                user.apellido_paterno, 
                user.apellido_materno, 
                user.nacimiento, 
                user.telefono, 
                user.genero)]
        ))

    console.log(rows)

  let titulo = "pacientes"


  return (
    <div>
        <h1>{titulo}</h1>
        <Table rows={rows} headCells={headCells}/>
    </div>
  );
}