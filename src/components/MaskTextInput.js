import React from 'react';
import TextField from '@material-ui/core/TextField';
// import { useInput, useTranslate } from 'react-admin';
import InputMask from 'react-input-mask';
import { useField } from 'react-final-form'

export const MaskTextInput = ({ name, ...props }) => {
    const {
        isRequired,
        input,
        meta: { touched, error },
    } = useField(name, props);
    return (
        <InputMask
            disabled={false}
            error={!!(touched && error)}
            helperText={touched && error}
            {...input}
            {...props}
            // mask={props.mask}
            // name={props.source}
            // label={props.label}
            // style={props.style}
        >
            {() => (
                <TextField
                    name={props.source}
                    error={!!(touched && error)}
                    helperText={touched && error}
                    {...props}
                    label={props.label}
                    fullWidth
                />
            )}
        </InputMask>
    );
};
