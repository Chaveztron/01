import React from "react";

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: "95%",
  
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  export default function SelectM(props) {
    const classes = useStyles();

    const handleChange = event => {
      
      props.onchange(event);


  }
    return (
              <FormControl variant="outlined" className={classes.formControl} size='small'>
              <InputLabel id="demo-simple-select-outlined-label">{props.label}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={props.value}
                label={props.label}
                name = {props.name}
                onChange= {handleChange}
                disabled={props.dis}
                
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {props.options.map(option => (
                    <MenuItem value={option.value}>{option.title}</MenuItem>
                ))}

              </Select>

              {/*<FormHelperText>Error</FormHelperText>*/}

            </FormControl>    
    );
  }