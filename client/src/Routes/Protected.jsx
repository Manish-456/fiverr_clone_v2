import React from 'react'
import { Navigate } from 'react-router-dom'
import getCurrentUser from '../utils/getCurrentUser'

const Protected = ({children}) => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
       
        return <Navigate to="/login"  />
      }
      return children
}

export default Protected
