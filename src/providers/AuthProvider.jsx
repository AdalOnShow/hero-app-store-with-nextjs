"use client"

import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase.init'
import { AuthContext } from '@/contexts/AuthContext'

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const googleProvider = new GoogleAuthProvider();

  const createUserFunc = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const loginUserFunc = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const googleSigninFunc = () => {
    return signInWithPopup(auth, googleProvider)
  }

  const logOutFunc = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser)
      setLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUserFunc,
    loginUserFunc,
    googleSigninFunc,
    logOutFunc
  }

  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  )
}

export default AuthProvider