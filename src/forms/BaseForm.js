import React from 'react';
import { Form } from 'react-final-form';

export const BaseForm = ({ initialValues, validate, children, onSubmit, ...formProps }) => {
    return (
    <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={validate}
        render={({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit} noValidate {...formProps}>
                {children}
            </form>
        )}
    />
    )
}