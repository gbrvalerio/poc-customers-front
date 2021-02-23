import React from 'react';
import { BaseForm } from './BaseForm';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { TextField } from 'mui-rff'
import { FormIterator } from './FormIterator';
import SaveIcon from '@material-ui/icons/Save';

export const FormPanel = ({ children, title, value, index, ...other }) => {
  const classes = useStyles();
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        className={classes.panelRoot}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography variant="h5" component="h1">{title}</Typography>
            <Grid container alignContent="stretch" className={classes.gridContainer} spacing={2}>
              {children}
            </Grid>
          </Box>
        )}
      </div>
    );
}

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
    },
    panelRoot: {
      // height: '100%',
      flex: 1
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

export const EvaluationForm = ({ onSubmit }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };

    return (
        <BaseForm onSubmit={onSubmit}>
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="fullWidth"
                      aria-label="full width tabs example"
                    >
                    <Tab label="AVALIANDO" {...a11yProps(0)} />
                    <Tab label="AMOSTRAS" {...a11yProps(1)} />
                    <Tab label="OPÇÕES" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>

                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <FormPanel value={value} index={0} dir={theme.direction} title={"Imóvel Avaliando"}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <TextField name="houseName" label="Nome do Imóvel" />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <TextField name="clientName" label="Nome do Proprietário" />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <TextField name="address" label="Endereço" />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <TextField name="areaLote" label="Área do lote em m²" />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <TextField name="area" label="Área privativa em m²" />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.richTextGridItem}>
                          <RichTextField name="description" label="Descrição do Imóvel" />
                        </Grid>
                    </FormPanel>
                    <FormPanel value={value} index={1} dir={theme.direction} title={"Amostras"}>
                        <FormIterator name="samples" addButtonLabel="ADICIONAR AMOSTRA" itemName="Amostra" removeButtonLabel="REMOVER AMOSTRA">
                          { ({ getSource }) => (
                            <>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                  <TextField name={getSource("houseName")} label="Nome do Imóvel" />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                  <TextField name={getSource("address")} label="Endereço" />
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                  <TextField name={getSource("areaLote")} label="Área do lote em m²" />
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                  <TextField name={getSource("area")} label="Área privativa em m²" />
                                </Grid>

                                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                  <TextField name="houseValue" label="Valor total do imóvel" />
                                </Grid>

                                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                  <TextField name="houseSquareMeterValue" label="Valor do m²" />
                                </Grid>

                                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                  <TextField name="condoValue" label="Valor do Condomínio" />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.richTextGridItem}>
                                  <RichTextField name={getSource("description")} label="Descrição do Imóvel" />
                                </Grid>
                            </>
                          )}
                        </FormIterator>
                    </FormPanel>
                    <FormPanel value={value} index={2} dir={theme.direction} title={"Opções"}>
                        Item Three
                    </FormPanel>
                </SwipeableViews>
            </div>

            <Button size="small" color="primary" variant='contained' startIcon={<SaveIcon />} type="submit" style={{ marginTop: 32, maxWidth: 180, float: 'right' }}>
              SALVAR
            </Button>
        </BaseForm>
    )
}