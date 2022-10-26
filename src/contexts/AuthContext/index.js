import { Auth, DataStore } from "aws-amplify";
import { createContext, useEffect, useState, useContext } from "react";
import { User } from "../../models";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const sub = authUser?.attributes?.sub;

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then(setAuthUser)
      .catch((error) => console.loge(error));
  }, []);

  useEffect(() => {
    if (!sub) {
      return;
    }
    //setting database user when component mounts
    DataStore.query(User, (user) => user.sub("eq", sub))
      .then((users) => {
        setDbUser(users[0]);
        setLoading(false);
      })
      .catch((error) => console.loge(error));
  }, [sub]);

  return (
    <AuthContext.Provider value={{ authUser, dbUser, sub, setDbUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
