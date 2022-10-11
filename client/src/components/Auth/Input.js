import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  root: {
    MuiTextfield: {
      margin: 1,
    }
  }
});


const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => (

  <Grid item xs={12} sm={half ? 6 : 12}>
    <ThemeProvider theme={theme}>
    <TextField
      name={name}
      onChange={handleChange}
      value="Outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      InputProps={name === 'password' ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton size="large" onClick={handleShowPassword}>
              {type === 'password' ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      } : null}
    />
    </ThemeProvider>
  </Grid>
);

export default Input;