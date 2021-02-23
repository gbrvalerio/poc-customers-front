import React, { useCallback, useState } from 'react';
import { API } from '../api/api';
import { BaseAuthProvider } from './AuthContext';
import get from 'lodash/get'

const getStorage = (local) => local ? localStorage : sessionStorage;

const clearTokensFromStorages = async () => {
  for(const storage of [localStorage, sessionStorage]) {
    storage.removeItem('accessToken')
  }
}

const saveTokensOnStorage = async (storage, token, userData) => {
  storage.setItem('accessToken', token)

  if(userData) {
    storage.setItem(
      'userData', 
      typeof userData === 'object' ? JSON.stringify(userData) : userData
    )
  }
}

const getTokensFromStorage = async () => {
  const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');

  if(!accessToken || !userData) {
    return null;
  }

  const isLocalSession = localStorage.getItem('userData') != null;

  return {
    user: JSON.parse(userData),
    token: accessToken,
    __isLocalSession: isLocalSession
  }
}

export const APIAuthProvider = (props) => {

  const login = useCallback(async ({ username, password, keepConnected }) => {
    const { status, data: { user, token } } = await API.auth.login(username, password);
    if(status === 200) {
      await saveTokensOnStorage(
        getStorage(keepConnected),
        token, user
      );
      return { 
        user,
        token
      }
    } else {
      throw new Error('Usuário e/ou senha inválidos.');
    }
  }, [null])

  const logout = useCallback(async () => {
    await clearTokensFromStorages()
  }, [null])

  const check = useCallback(async () => {
    const tokenData = await getTokensFromStorage();
    if(!tokenData) {
      await clearTokensFromStorages();
      return null
    }
    console.log('tokenData', tokenData)
    return tokenData;
  }, [null])

  return (
    <BaseAuthProvider
      login={login}
      logout={logout}
      check={check}
      {...props}
    />
  )
}