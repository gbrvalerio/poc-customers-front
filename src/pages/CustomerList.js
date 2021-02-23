import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { API } from '../api/api'
import { DataGrid } from '@material-ui/data-grid';

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

const columns = [
  { field: 'id', headerName: 'ID', width: 70, sortable: false, filterable: false, hide: false, disableColumnMenu: true },
  { field: 'name', headerName: 'Nome', width: 130, sortable: false, filterable: false, hide: false, disableColumnMenu: true },
  { field: 'cpf', headerName: 'CPF', width: 130, sortable: false, filterable: false, hide: false, disableColumnMenu: true },
  { field: 'address.cep', headerName: 'CEP', width: 130, sortable: false, filterable: false, hide: false, disableColumnMenu: true },
];

export const CustomerList = ({  }) => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const response = await API.customer.getAll(auth.currentUser.token);
        if(response.status === 200) {
          setCustomers(response.data);
        }
      } catch(error) {
        alert(error)
      }
      setLoading(false);
    })()
  }, [])

  return (
    <div className={classes.root}>

      <div className={classes.topBar}>
        <Typography variant="h5" component="h1" className={classes.title}>
          Lista de Clientes {loading ? ' - Carregando...' : ''}
        </Typography>

        <Button size="small" color="primary" variant='contained' startIcon={<AddIcon />} onClick={() => history.push('/newcustomer')}>
          NOVO CLIENTE
        </Button>
      </div>

      
      <DataGrid rows={customers} columns={columns} pageSize={10} disableSelectionOnClick onRowClick={(param) => history.push('/editcustomer/' + param.row.id)} />
    </div>
  );
}