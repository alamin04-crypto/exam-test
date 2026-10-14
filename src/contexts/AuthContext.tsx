import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { StudentProfile, AdminProfile } from '../types/auth.types';

interface AuthContextType {
  currentUser: User | null;
  userProfile: StudentProfile | AdminProfile | null;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userProfile: null,
  isAdmin: false,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<StudentProfile | AdminProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        
        try {
          const idTokenResult = await user.getIdTokenResult();
          const adminStatus = !!idTokenResult.claims.admin;
          setIsAdmin(adminStatus);

          const collectionName = adminStatus ? 'admins' : 'students';
          const docRef = doc(db, collectionName, user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as StudentProfile | AdminProfile);
          } else {
            setUserProfile(null);
          }
        } catch (error) {
          console.error("Auth context error:", error);
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, userProfile, isAdmin, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
