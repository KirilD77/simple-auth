import { useState, useEffect } from 'react'
import './AuthenticatedPage.css'

function AuthenticatedPage() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    const token = localStorage.getItem('authToken')
    
    try {
      const response = await fetch('/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUserData(data)
      } else {
        throw new Error('Failed to fetch user data')
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    window.location.reload()
  }

  if (loading) {
    return (
      <div className="authenticated-container">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="authenticated-container">
      <div className="authenticated-card">
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="authenticated-title">You are authed</h1>
        <p className="authenticated-message">Successfully authenticated with Microsoft</p>
        
        {userData && (
          <div className="user-info">
            {userData.name && <p className="user-name">{userData.name}</p>}
            {userData.email && <p className="user-email">{userData.email}</p>}
          </div>
        )}

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default AuthenticatedPage

