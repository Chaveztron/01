import React, { useReducer } from "react";
import axios from "axios";

import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

import { GET_USERS, GET_PROFILE } from "../types";

const { ipcRenderer } = window.require("electron");

const UserState = (props) => {
  const initialState = {
    users: [],
    selectedUser: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const getUsers = async () => {
    try {
      const pacientes = await ipcRenderer.sendSync('get-pacientes')
      var rows = []
      function crearDatos(
        id,
        apellido_paterno,
        apellido_materno,
        nombre, 
        nacimiento, 
        telefono, 
        genero) {
          return {id, apellido_paterno, apellido_materno, nombre, nacimiento, telefono, genero };
        }
      pacientes.map((user, index) =>(
          rows = [...rows, crearDatos(
              user.id, 
              user.apellido_paterno,
              user.apellido_materno, 
              user.nombre,
              user.nacimiento, 
              user.telefono, 
              user.genero)]
      ))
      const data = rows;

      dispatch({ type: GET_USERS, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const getProfile = async (id) => {
    try {
      /*
      const res = await axios.get("https://reqres.in/api/users/" + id);
      const { data }= res;
      */
     //data.data
     console.log(id)


      dispatch({ type: GET_PROFILE, payload: id });
    } catch (error) {}
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        selectedUser: state.selectedUser,
        modal: state.modal,
        getUsers,
        getProfile,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;