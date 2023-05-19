import { createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { agencyLogin, employerLogin, logoutUser, saveUser, userLogin } from '../api/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();

  const login = async (userData) => {
    try {
      let result;
      switch (userData.type) {
        case 'agency':
          result = await agencyLogin({email: userData.email, password: userData.password})
          break;
        case 'employer':
          result = await employerLogin({email: userData.email, password: userData.password})
          break;
          case 'admin':
            result = await userLogin({email: userData.email, password: userData.password})
            break;
        default:
          break;
      }
      if (result?.data?.error == false) {
        saveUser({
          accessToken: result?.data?.data?.accessToken,
          refreshToken: result?.data?.data?.refreshToken,
          user: result?.data?.user,
          type: userData.type,
          credit: result?.data?.credit ? result?.data?.credit :''
        })
        // if (userData.type == 'agency') navigate("/agency/dashboard", { replace: true })
        if (userData.type == 'employer') navigate("/employer/dashboard", { replace: true })
        if (userData.type == 'admin') navigate("/admin/job", { replace: true })

      } else {
        if (userData.type == 'agency') navigate("/agency/login", { replace: true })
        if (userData.type == 'employer') navigate("/employer/login", { replace: true })
        if (userData.type == 'admin') navigate("/admin/login", { replace: true })


      }
    } catch (error) {
      console.log(error);
    }
  }

  const logout = () => {
    logoutUser()
  }

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}