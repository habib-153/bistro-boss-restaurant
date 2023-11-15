import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImg from '../../assets/assets/others/authentication1.png';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { FcGoogle } from 'react-icons/fc';


const Login = () => {
    const [disabled, setDisabled] = useState(true)
    const {signIn, signInWithGoogle} = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/" ;
    useEffect(()=>{
        loadCaptchaEnginge(6); 
    },[])
    const handleLogin = e =>{
        e.preventDefault()
        const form = e.target
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        signIn(email, password)
        .then(res =>{
          const user = res.user
          console.log(user)
          Swal.fire({
            title: "User Logged in successful",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
          navigate(from, {replace: true})
        })
    }
    
    const handleValidateCaptcha = (e) =>{
        const user_captcha_value = e.target.value;
        //console.log(value)
        if (validateCaptcha(user_captcha_value)==true) {
            //alert('Captcha Matched');
            setDisabled(false)
        }
    }
    const handleGoogleLogin =()=>{
      signInWithGoogle()
      .then((res) => {
        console.log(res.user)
        Swal.fire({
          title: "User Logged in successful",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        });
  
        // navigate after login
        navigate('/')
      })
    }
    return (
        <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row gap-12">
        <div className="">
          <img className="rounded-xl" src={loginImg} alt="" />
        </div>
        <div className="card w-full shadow-2xl bg-base-100">
        <h1 className="text-5xl font-bold text-center">Login</h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name='email'
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name='password'
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input onBlur={handleValidateCaptcha}
                type="text"
                name='Captcha'
                className="input input-bordered"
                required
              />
            </div>
        <p>New here? Please <Link to='/register' className='text-orange-600 font-semibold'>Register</Link></p>
            <div className="form-control mt-6">
              <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
            </div>
          </form>
          <div className="mx-auto">
            <button onClick={handleGoogleLogin} className="hover:bg-[#269136]  btn btn-outline my-2">
              <FcGoogle className="text-xl"></FcGoogle>Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Login;