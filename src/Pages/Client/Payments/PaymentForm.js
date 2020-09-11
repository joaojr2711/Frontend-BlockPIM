import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function PaymentForm() {
  const user = localStorage.getItem('session');
  const history = useHistory();
  if (user == null) {
    history.push('/')
  }
  const [value, setValue] = useState('');
  localStorage.setItem('Value',value);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Aplicação
      </Typography>
      <Grid container>
        <Grid item xs={12} md={12}>
        <Typography>
          Insira o valor  
        </Typography>
          <TextField 
          required 
          id="value"
          helperText="Formto aceito ex: --,--"
          placeholder="Insira somente números"
          fullWidth
          onChange={(e) => setValue(e.target.value)}
        />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required disabled id="cardName" label="Name on card" fullWidth autoComplete="cc-name" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            disabled
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required disabled id="expDate" label="Expiry date" fullWidth autoComplete="cc-exp" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            disabled
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox  defaultChecked disabled color="default" name="saveCard" value="yes" />}
            label="Modo simulação"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}