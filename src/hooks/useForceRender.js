import React, { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useForceRender = () => {
  const [__v, setVersion] = useState('0.1');
  const forceRender = useCallback(() => setVersion(uuidv4()), [setVersion])
  return { __v, forceRender }
}