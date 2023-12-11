import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('authenticated') === 'true'
  );

  const login = () => {
    localStorage.setItem('authenticated', 'true');
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.setItem('authenticated', 'false');
    setAuthenticated(false);
  };

  useEffect(() => {
    const checkAuthentication = () => {
      const storedAuth = localStorage.getItem('authenticated') === 'true';
      if (storedAuth) {
        setAuthenticated(true);
      }
    };

    checkAuthentication();
  }, []);
  
  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
