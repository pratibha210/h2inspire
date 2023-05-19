import { Navigate, useLocation } from 'react-router-dom'

export const RequireAuth = ({ children }) => {
  const location = useLocation()
  const pathName = location.pathname
  const user = localStorage.getItem("AUTH_USER");
  if (!user) {
    return <Navigate to='/' state={{ path: pathName }}  />
  }
  if(user && (pathName === '/auth/login' || pathName === '/auth/register')) {
    return <Navigate to='/admin/dashboard' state={{ path: pathName }} />
  }
  return children
}