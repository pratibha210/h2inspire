import axios from 'axios';
import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Page from '../../components/Page';
import { useAuth } from '../../context/auth';
import Loader from "@mui/material/CircularProgress";
import Swal from "sweetalert2";

function EmployerLogin() {
    const auth = useAuth();
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [pageLoading, setPageLoading] = React.useState(true);

  /* to show password button function  */
  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  
  const onPasswordChange = (e) => {
    // console.log(e.target.value);
    setPassword(e.target.value);
  };

  useEffect(()=>{
    setTimeout(()=>{
      setPageLoading(false)
    },3000)
  },[])
  
  const [errorMessage,setErrorMessage] =useState('')

    const handleSubmit = async (event) => {
      event.preventDefault();
      const formdata = new FormData(event.currentTarget);
      // eslint-disable-next-line no-console
      if (!formdata.get('email') && !formdata.get('password')) return false;
      const userData = {
        type: 'employer',
        email: formdata.get('email'),
        password: password,
      }
      // mutation.mutate(userData)
      // console.log("mutation >>>>>>> ", mutation);
      setLoading(true)
      console.log(userData);
      await auth.login(userData).then((res)=>{
        setLoading(false)
        // console.log(res,"res")
        // if(res?.response?.data?.error == true){
          setErrorMessage(res?.response?.data?.message)
          // Toast.fire({
          //   icon: res?.response?.data?.error ? "error" : "success",
          //   title: res?.response?.data?.message,
          // });
        // }
       
      }).catch((err)=>{
        setLoading(false)
      });
  
    };
  
    return (
      <>
        <Page title="Employer Login | hire2inspire">
        {pageLoading == true && (
            <div className="contentLoader">
              <Loader className="contentLoaderAnimate" />
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
              <input type="email" className="input-style2" id="email" placeholder="Email" name="email" />
            </div>
            <div className=" mt-3 position-relative">
              <input  defaultValue={password}
              type={showPassword ? "text" : "password"} className="input-style2" id="password"   
             onChange={(e) => onPasswordChange(e)}placeholder="Password" name="password" />
                          <div className="view-password"> 
            <i onClick={onShowPassword} class="fa-regular fa-eye-slash"></i>
            </div>
            </div>
            <p>{errorMessage}</p>
            <button disabled={loading} type="submit" className="full-width-btm loginBtnLoader">{loading == true ? <Loader className="btnLoader" /> : "Login"}</button>
          </form>
          <span className="sub-login">Don't have an employer account ? <Link to={'/employer/register'}>Register</Link></span>
          <span className="sub-login"> <Link to={'/forgot/password'}>Forgot Password ?</Link></span>
        </Page>
      </>
    )
}

export default EmployerLogin