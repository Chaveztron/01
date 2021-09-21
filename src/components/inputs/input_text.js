import React from "react";

import { TextInput } from 'react-desktop/macOs';



  export default function InputText(props) {


    const handleChange = event => {
      
      props.onchange(event);


  }
    return (
        <TextInput
        label={props.label}
        placeholder={props.placeholder}
        defaultValue=""
        rounded='8'
        centerPlaceholder
        name={props.name}
        onChange={handleChange}
        value={props.value}
        disabled={props.dis}
        />
    );
  }