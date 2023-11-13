import { Link } from "react-router-dom";
import loginImg from '../../assets/assets/others/authentication1.png';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useEffect, useRef, useState } from "react";

const Login = () => {
    const captchaRef = useRef(null)
    const [disabled, setDisabled] = useState(true)

    useEffect(()=>{
        loadCaptchaEnginge(6); 
    },[])
    const handleLogin = e =>{
        e.preventDefault()
        const form = e.target
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

    }
    const handleValidateCaptcha = () =>{
        const user_captcha_value = captchaRef.current.value;
        //console.log(value)
        if (validateCaptcha(user_captcha_value)==true) {
            //alert('Captcha Matched');
            setDisabled(false)
        }
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
              <input
                type="text"
                ref={captchaRef}
                name='Captcha'
                className="input input-bordered"
                required
              />
              <button onClick={handleValidateCaptcha} className="btn btn-outline btn-xs mt-2">Validate</button>
            </div>
        <p>New here? Please <Link to='/register' className='text-orange-600 font-semibold'>Register</Link></p>
            <div className="form-control mt-6">
              <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
    );
};

export default Login;