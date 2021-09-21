import * as React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

let MAX_VAL;
let PREFIX;

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: "95%",
  
    },

  }));

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  const withValueCap = (inputObj) => {
    const { value } = inputObj;
    if (value <= MAX_VAL ) return true;
    return false;
  };

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix={PREFIX}
      isAllowed={withValueCap}
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function InputNum(props) {
    const classes = useStyles();
  const handleChange = event => {
    props.onchange(event);
}

MAX_VAL = props.max
PREFIX = props.prefix
let shrink
props.value === ''?shrink = false: shrink = true

  return (
    <FormControl variant="outlined" className={classes.formControl} size='small'>
        <TextField
        label={props.label}
        value={props.value}
        onChange={handleChange}
        name={props.name}
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        variant="outlined"
        size='small'
        disabled={props.dis}
        InputLabelProps={{ shrink: shrink }}
      />
      </FormControl> 
  );
}