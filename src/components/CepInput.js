import React, { useEffect, useState } from 'react';
import { useFormState, useForm } from 'react-final-form';
import { MaskTextInput } from './MaskTextInput';
import get from 'lodash/get';

const isCepValid = (unsanitizedCep = '') => {
    const cep = unsanitizedCep.replace(/\D/gi, '');
    if (cep.length != 8) {
        return false;
    }
    return true;
};

const buildCepRequestUrl = unsanitizedCep => {
    if (!isCepValid(unsanitizedCep)) return null;
    const cep = unsanitizedCep.replace(/\D/gi, '');
    return `https://viacep.com.br/ws/${cep}/json/`;
};

export const CEPAutofillInput = ({ addressFields, name, ...props }) => {
    const formState = useFormState({ subscription: { values: true } });
    const form = useForm();
    const [loading, setLoading] = useState(false);
    const cep = get(formState.values, name);

    useEffect(() => {
        if (!isCepValid(cep)) return;
        (async () => {
            setLoading(true);
            console.log('loading cep')
            const response = await fetch(buildCepRequestUrl(cep));
            const address = await response.json();
            console.log('loading cep', address)
            if (address.erro) {
                setLoading(false);
                return;
            }

            addressFields.logradouro &&
                form.change(addressFields.logradouro, address.logradouro);
            addressFields.complemento &&
                form.change(addressFields.complemento, address.complemento);
            addressFields.uf && form.change(addressFields.uf, address.uf);
            addressFields.localidade &&
                form.change(addressFields.localidade, address.localidade);
            addressFields.bairro &&
                form.change(addressFields.bairro, address.bairro);

            setLoading(false);
        })();
    }, [
        addressFields.bairro,
        addressFields.complemento,
        addressFields.localidade,
        addressFields.logradouro,
        addressFields.uf,
        cep,
        form,
    ]);

    return (
        <MaskTextInput
            mask="99.999-999"
            name={name}
            {...props}
            disabled={loading}
        />
    );
};
