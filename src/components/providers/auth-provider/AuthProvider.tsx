import {createContext, FC, ReactNode, useEffect, useMemo, useState} from "react";
import {IUser, TypeSetState} from "../../types";
import {onAuthStateChanged, getAuth, Auth} from 'firebase/auth';
import {getFirestore, Firestore} from 'firebase/firestore';
import {users} from "../../layout/sidebar/user-items/data";

interface IContext {
  user: IUser | null
  setUser: TypeSetState<IUser | null>
  ga: Auth
  db: Firestore
}

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider: FC<{ children: ReactNode }> = ({children}) => {

  const ga = getAuth()
  const db = getFirestore()

  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    const unListen = onAuthStateChanged(ga, authUser => {
      if (authUser) {
        setUser(authUser ? {
          _id: authUser.uid,
          avatar: users[0].avatar,
          name: authUser?.displayName || '',
        } : null)
        return
      }

      setUser(null)
    })
    return () => {
      unListen()
    }
  }, [])

  const values = useMemo(() => ({
    user,
    setUser,
    ga,
    db,
  }), [user, ga, db])

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}