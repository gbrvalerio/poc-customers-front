import React from 'react';
import { BaseForm } from './BaseForm';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField, Select } from 'mui-rff'
import { FormIterator } from './FormIterator';
import { UFSelect } from '../components/UFSelect';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { CEPAutofillInput } from '../components/CepInput';
import { MaskTextInput } from '../components/MaskTextInput';
import { PhoneField } from '../components/PhoneField';

function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
}
  
const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      flex: 1,
      height: '100%',
      padding: theme.spacing(4)
    },
    inputGridItem: {
      // marginBottom: theme.spacing(2)
    },
    richTextGridItem: {
      marginTop: theme.spacing(2)
    },
    gridContainer: {
      width: '100%',
      // height: '100%'
    }
}));

export const CustomerForm = ({ onSubmit, initialValues, onDelete, edit }) => {
    const classes = useStyles();

    return (
        <BaseForm onSubmit={onSubmit} initialValues={initialValues}>
            <Card className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                        <TextField name="name" label="Nome do Cliente" />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <MaskTextInput
                            mask="999.999.999-99"
                            name="cpf"
                            label="CPF do Cliente"
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                        {/* <TextField name="address.cep" label="CEP" /> */}
                        <CEPAutofillInput
                            addressFields={{
                                logradouro: 'address.address',
                                uf: 'address.uf',
                                localidade: 'address.city',
                                bairro: 'address.neighbourhood'
                            }}
                            name='address.cep'
                            label="CEP"
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                        <TextField name="address.address" label="Endereço" />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <TextField name="address.complement" label="Complemento" />
                    </Grid>

                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                        <TextField name="address.neighbourhood" label="Bairro" />
                    </Grid>

                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                        <TextField name="address.city" label="Cidade" />
                    </Grid>

                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                        <UFSelect name="address.uf" label="UF" />
                    </Grid>

                    <FormIterator name="phones" addButtonLabel="ADICIONAR TELEFONE" itemName="Telefone" removeButtonLabel="REMOVER TELEFONE">
                        {({ getSource }) => (
                            <>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Select name={getSource("type")} label="Tipo">
                                        <MenuItem value="residential">Residencial</MenuItem>
                                        <MenuItem value="mobile">Celular</MenuItem>
                                        <MenuItem value="comercial">Comercial</MenuItem>
                                    </Select>
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <PhoneField
                                        name={getSource("number")}
                                        typeFieldName={getSource("type")}
                                    />
                                </Grid>
                            </>
                        )}
                    </FormIterator>

                    <FormIterator name="emails" addButtonLabel="ADICIONAR EMAIL" itemName="Email" removeButtonLabel="REMOVER EMAIL">
                        {({ getSource }) => (
                            <>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <TextField name={getSource("email")} label="Email" />
                                </Grid>
                            </>
                        )}
                    </FormIterator>
                </Grid>
            </Card>

            <Button size="small" color="primary" variant='contained' startIcon={<SaveIcon />} type="submit" style={{ marginTop: 32, marginBottom: 32, maxWidth: 180, float: 'right' }}>
              SALVAR
            </Button>

            {edit && <Button size="small" color="" variant='contained' startIcon={<DeleteIcon />} style={{ marginTop: 32, marginBottom: 32, marginRight: 16, maxWidth: 180, float: 'right' }} onClick={onDelete}>
              EXCLUIR
            </Button>}
        </BaseForm>
    )
}