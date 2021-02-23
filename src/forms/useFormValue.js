import React, { useMemo } from 'react';
import get from 'lodash/get';
import { useFormState } from 'react-final-form';

export const useFormValue = (name) => {
  const value = get(useFormState({ subscription: { values: true } }).values, name);
  return useMemo(() => value, [value]);
}
