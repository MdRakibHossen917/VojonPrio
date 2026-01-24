import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import auth from '../firebase/config'
import { db } from '../firebase/config'

const googleProvider = new GoogleAuthProvider()

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Register new user
  const register = useCallback(async (email, password, name, phone) => {
    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Update display name
      await updateProfile(user, { displayName: name })

      // Save additional user data to Firestore
      const userDataToSave = {
        uid: user.uid,
        email: user.email,
        name: name,
        phone: phone,
        createdAt: new Date().toISOString()
      }

      await setDoc(doc(db, 'users', user.uid), userDataToSave)
      setUserData(userDataToSave)

      return { success: true, user: user }
    } catch (error) {
      console.error('Registration error:', error)
      let errorMessage = 'রেজিস্টারেশন ব্যর্থ হয়েছে'

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'এই ইমেইল ইতিমধ্যে ব্যবহার করা হয়েছে'
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'পাসওয়ার্ড খুবই দুর্বল'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'অবৈধ ইমেইল ঠিকানা'
      }

      return { success: false, message: errorMessage }
    }
  }, [])

  // Login user
  const login = useCallback(async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return { success: true, user: userCredential.user }
    } catch (error) {
      console.error('Login error:', error)
      let errorMessage = 'লগইন ব্যর্থ হয়েছে'

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'এই ইমেইলের কোনো অ্যাকাউন্ট নেই'
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'ভুল পাসওয়ার্ড'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'অবৈধ ইমেইল ঠিকানা'
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'অনেকবার চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন'
      }

      return { success: false, message: errorMessage }
    }
  }, [])

  // Login with Google
  const loginWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      // Check if user data exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid))

      if (!userDoc.exists()) {
        // Create user data in Firestore for first-time Google sign-in
        const userDataToSave = {
          uid: user.uid,
          email: user.email,
          name: user.displayName || 'User',
          phone: '',
          photoURL: user.photoURL || '',
          createdAt: new Date().toISOString(),
          provider: 'google'
        }
        await setDoc(doc(db, 'users', user.uid), userDataToSave)
        setUserData(userDataToSave)
      }

      return { success: true, user: user }
    } catch (error) {
      console.error('Google login error:', error)
      let errorMessage = 'Google লগইন ব্যর্থ হয়েছে'

      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'লগইন বাতিল করা হয়েছে'
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'পপআপ ব্লক করা আছে। ব্রাউজার সেটিংস চেক করুন'
      } else if (error.code === 'auth/unauthorized-domain') {
        errorMessage = 'এই ডোমেইনটি Firebase এ অনুমোদিত নয়। কনসোল চেক করুন।'
      }

      return { success: false, message: errorMessage }
    }
  }, [])

  // Logout user
  const logout = useCallback(async () => {
    try {
      // Clear user data first
      setUserData(null)
      setCurrentUser(null)
      // Then sign out from Firebase
      await signOut(auth)
      // Ensure state is cleared after sign out
      setTimeout(() => {
        setUserData(null)
        setCurrentUser(null)
      }, 100)
      return true
    } catch (error) {
      console.error('Logout error:', error)
      // Even if signOut fails, clear local state
      setUserData(null)
      setCurrentUser(null)
      return false
    }
  }, [])

  // Fetch user data from Firestore
  const fetchUserData = useCallback(async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        setUserData(userDoc.data())
      } else {
        // If user data doesn't exist, create it from auth user
        const user = auth.currentUser
        if (user) {
          const userDataToSave = {
            uid: user.uid,
            email: user.email,
            name: user.displayName || 'User',
            phone: '',
            createdAt: new Date().toISOString()
          }
          await setDoc(doc(db, 'users', uid), userDataToSave)
          setUserData(userDataToSave)
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }, [])

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is logged in
        setCurrentUser(user)
        // Fetch user data from Firestore
        await fetchUserData(user.uid)
      } else {
        // User is logged out - clear all state
        setCurrentUser(null)
        setUserData(null)
      }

      setIsLoading(false)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [fetchUserData])

  const value = useMemo(() => ({
    currentUser,
    user: userData,
    login,
    loginWithGoogle,
    register,
    logout,
    isAuthenticated: !!currentUser,
    isLoading
  }), [currentUser, userData, login, loginWithGoogle, register, logout, isLoading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
