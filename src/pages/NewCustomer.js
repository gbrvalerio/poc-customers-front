import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Typography, Button } from '@material-ui/core';
import { CustomerForm } from '../forms/CustomerForm';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { API } from '../api/api';
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    height: '100%',
    flexDirection: 'column'
  },
  title: {
    fontWeight: 'bold',
    // marginRight: theme.spacing(2)
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2)
  }
}))

export const NewCustomer = ({  }) => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true)
    try {
      const newCustomer = { ...values }
      newCustomer.cpf = newCustomer.cpf.replaceAll(/\D/gi, '');
      newCustomer.address.cep = newCustomer.address.cep.replaceAll(/\D/gi, '');
      newCustomer.emails = newCustomer.emails.map(({ email }) => email);
      newCustomer.phones = newCustomer.phones.map(({ type, number }) => ({ type, number: number.replaceAll(/\D/gi, '') }));
      const response = await API.customer.create(newCustomer, auth.currentUser.token);
      if(response.status === 201) {
        history.push('/editcustomer/' + response.data.id);
      } else {
        alert(Object.keys(response.data).map(f => `${f}: ${response.data[f]}`).join(' | '))
      }
    } catch(error) {
      console.log('error', error);
    }
    setLoading(false);
  }

  return (
    <div className={classes.root}>

      <div className={classes.topBar}>
        <Typography variant="h5" component="h1" className={classes.title}>
          Novo Cliente
        </Typography>

        {/* <Button size="small" color="primary" variant='contained' startIcon={<AddIcon />}>
          NOVA AVALIAÇÃO
        </Button> */}
      </div>

      <CustomerForm 
        onSubmit={onSubmit}
        loading={loading}
      />
    </div>
  );
}