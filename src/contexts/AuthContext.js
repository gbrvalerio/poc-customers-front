import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useForceRender } from '../hooks/useForceRender';
import { usePrevious } from '../hooks/usePrevious';
import get from 'lodash/get'

export const AuthContext = createContext({
  isAuthenticated: false,
  currentUser: null,
  login: async ({ username, password, ...rest }) => {},
  logout: async () => {},
  getUserPreference: (key) => {},
  setUserPreferences: async (values) => {}
});

export const useAuth = () => useContext(AuthContext);

export const useOnLogin = (callback) => {
  const { isAuthenticated, currentUser } = useAuth();
  const wasAuthenticated = usePrevious(isAuthenticated);
  
  useEffect(() => {
    if(!wasAuthenticated && isAuthenticated) {
      callback(currentUser);
    }
  }, [isAuthenticated, wasAuthenticated, callback])
}

export const useOnLogout = (callback) => {
  const { isAuthenticated } = useAuth();
  const wasAuthenticated = usePrevious(isAuthenticated);
  
  useEffect(() => {
    if(wasAuthenticated && !isAuthenticated) {
      callback();
    }
  }, [isAuthenticated, wasAuthenticated, callback])
}


export const BaseAuthProvider = ({ login, logout, check, children, setUserPreferences:setUserPrefs, getUserPreference:getUserPrefs, updateCurrentUserWithPreferences }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const doLogin = useCallback(async (authObject) => {
    const newUser = await login(authObject);
    setCurrentUser(newUser);
    return newUser;
  }, [setCurrentUser, login])

  const doLogout = useCallback(async () => {
    await logout();
    setCurrentUser(null);
  }, [setCurrentUser, login])

  useEffect(() => {
    (async () => {
      if(!currentUser) {
        try {
          const restoredUser = await check();
          if(restoredUser) {
            setCurrentUser(restoredUser);
          }
        } catch(error) {
          console.log('error auth check', error)
        }
      }
    })();
  }, [null])

  const value = {
    isAuthenticated: currentUser != null,
    currentUser,
    login: doLogin,
    logout: doLogout,
  }

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}