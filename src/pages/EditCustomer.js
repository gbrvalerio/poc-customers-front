import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Typography, Button } from '@material-ui/core';
import { CustomerForm } from '../forms/CustomerForm';
import AddIcon from '@material-ui/icons/Add';
import { useHistory, useParams } from 'react-router-dom';
import { API } from '../api/api';
import { useAuth } from '../contexts/AuthContext';
import { AlertTitle } from '@material-ui/lab';

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

export const EditCustomer = ({  }) => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const customer = await API.customer.getById(id, auth.currentUser.token)
        const initialData = { ...customer.data };
        initialData.emails = initialData.emails.map(email => ({ email }));
        setInitialData(initialData);
      } catch(error) {
        history.push('/customers/');
      }
      setLoading(false)
    })()
  }, [id]);

  const onSubmit = async (values) => {
    setLoading(true)
    try {
      const newCustomer = { ...values }
      newCustomer.cpf = newCustomer.cpf.replaceAll(/\D/gi, '');
      newCustomer.address.cep = newCustomer.address.cep.replaceAll(/\D/gi, '');
      newCustomer.emails = newCustomer.emails.map(({ email }) => email);
      newCustomer.phones = newCustomer.phones.map(({ type, number }) => ({ type, number: number.replaceAll(/\D/gi, '') }));
      const response = await API.customer.update(id, newCustomer, auth.currentUser.token);
      if(response.status === 200) {
        history.push('/customers/');
      } else {
        alert(Object.keys(response.data).map(f => `${f}: ${response.data[f]}`).join(' | '))
      }
    } catch(error) {
      console.log('error', error);
    }
    setLoading(false);
  }

  const onDelete = async () => {
    setLoading(true)
    try {
      const response = await API.customer.delete(id, auth.currentUser.token);
      if(response.status === 200) {
        history.push('/customers/');
      }
    } catch(error) {
      alert(error)
    }
    setLoading(false);
  }

  return (
    <div className={classes.root}>

      <div className={classes.topBar}>
        <Typography variant="h5" component="h1" className={classes.title}>
          Editar Cliente
        </Typography>

        {/* <Button size="small" color="primary" variant='contained' startIcon={<AddIcon />}>
          NOVA AVALIAÇÃO
        </Button> */}
      </div>

      <CustomerForm edit
        onSubmit={onSubmit}
        loading={loading}
        initialValues={initialData}
        onDelete={onDelete}
      />
    </div>
  );
}