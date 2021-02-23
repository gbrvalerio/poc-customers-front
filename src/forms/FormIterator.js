import React, { useCallback, useMemo, useState } from 'react';
import { Button, Divider, Grid, Card, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useForm, useFormState } from 'react-final-form';
import get from 'lodash/get'
import { makeStyles } from '@material-ui/core/styles';
import { RenderCount } from '../components/RenderCount'

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

const useStyles = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
    cardTitleContainer: {
        marginBottom: theme.spacing(2)
    }
}));

export const FormIteration = ({ value, index, onRemove, renderItems, itemName, getSource, removeButtonLabel }) => {
    const classes = useStyles();
    return (
        useMemo(() => (
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}a-content`}
                    id={`panel${index}a-header`}
                >
                    <Typography className={classes.heading}>{itemName || 'Item'} #{index + 1}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container direction="row">
                        <Grid container justify="space-between" className={classes.cardTitleContainer}>
                            <Typography variant="h5">
                                 
                            </Typography>

                            <Button size="small" color="primary" variant='contained' startIcon={<DeleteIcon />} onClick={onRemove}>
                                {removeButtonLabel || 'REMOVER'}
                            </Button>
                        </Grid>
                        <Grid container spacing={2}>
                            { renderItems({ scopedData: value || {}, getSource, index }) }
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        ), [value, index])
    )
}

export const FormIterator = ({ children, name, addButtonLabel, removeButtonLabel, itemName }) => {
    const [arrayValue, setArrayValue] = useState([]);
    const form = useForm();
    const value = get(form.getState().values, name) || arrayValue;

    const buildGetSource = (index) => (sourceName) => `${name}[${index}].${sourceName}`

    const onAddValue = useCallback(() => {
        const value = get(form.getState().values, name) || arrayValue;
        form.change(name, [
            ...value,
            {}
        ])
        setArrayValue([
            ...value, 
            {}
        ])
    }, [name, setArrayValue])

    const onRemoveValue = useCallback((index) => {
        const value = get(form.getState().values, name) || arrayValue;
        const newValue = value.filter((v, i) => i !== index)
        form.change(name, newValue)
        setArrayValue(newValue);
    }, [form, setArrayValue]);

    return (
        useMemo(() => (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                { value.map((indexValues, index) => (
                    <FormIteration 
                        values={indexValues} 
                        index={index} 
                        onRemove={() => onRemoveValue(index)}
                        itemName={itemName}
                        removeButtonLabel={removeButtonLabel}
                        renderItems={children}
                        getSource={buildGetSource(index)}
                    />
                )) }
                <Button size="small" color="primary" variant='contained' startIcon={<AddIcon />} onClick={onAddValue} style={{ marginTop: 32 }}>
                    {addButtonLabel || 'ADICIONAR'}
                </Button>
            </Grid>
        ), [value, onRemoveValue, onAddValue])
    )
}