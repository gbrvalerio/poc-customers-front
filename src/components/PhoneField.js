import React from 'react';
import { useFormValue } from '../forms/useFormValue'
import { MaskTextInput } from './MaskTextInput';

export const PhoneField = ({ name, typeFieldName }) => {
    const type = useFormValue(typeFieldName);
    return (
        <MaskTextInput
            mask={type === 'mobile' ? '(99) 9 9999-9999' : '(99) 9999-9999'}
            name={name}
            label="Número"
        />
    )
}