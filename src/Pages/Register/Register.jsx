import { Link, useNavigate } from "react-router-dom";
import loginImg from '../../assets/assets/others/authentication1.png';
//import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useContext, } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Register = () => {
    //const captchaRef = useRef(null)
    //const [disabled, setDisabled] = useState(true)
    const {createUser, updateUserProfile} = useContext(AuthContext)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm()

    // useEffect(()=>{
    //     loadCaptchaEnginge(6); 
    // },[])
    
    // const handleValidateCaptcha = () =>{
    //     const user_captcha_value = captchaRef.current.value;
    //     //console.log(value)
    //     if (validateCaptcha(user_captcha_value)==true) {
    //         //alert('Captcha Matched');
    //         setDisabled(false)
    //     }
    // }
    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
        .then(res =>{
            const user = res.user
            console.log(user)
            updateUserProfile(data.name, data.photoURL)
            .then(()=>{
              console.log("User Updated Successfully")
              reset()
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User Updated Successfully",
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/')
            })
        })
      }

    return (
        <div className="hero min-h-screen pt-12">
      <div className="hero-content flex-col lg:flex-row gap-12">
        <div className="">
          <img className="rounded-xl" src={loginImg} alt="" />
        </div>
        <div className="card w-full shadow-2xl bg-base-100">
        <h1 className="text-5xl font-bold text-center">Register</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
                className="input input-bordered"
              />{errors.name && <span>This field is required</span>}
            </div>
          <div className="form-control">
              <label className="label">
                <span className="label-text">Photo Url</span>
              </label>
              <input
                type="text"
                placeholder="photoUrl"
                {...register("name", { required: true })}
                className="input input-bordered"
              />{errors.photoUrl && <span>This field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                {...register("email", { required: true })}
                className="input input-bordered"
              />{errors.email && <span>This field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                {...register("password", { required: true, 
                    minLength:6, 
                    maxLength:20,
                    pattern:/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                })}
                className="input input-bordered"
              />{errors.password?.type === 'required' && <span>This field is required</span>}
              {errors.password?.type === 'minLength' && <span>Password must be 6 character</span>}
              {errors.password?.type === 'maxLength' && <span>Password must be less than 20 character</span>}
              {errors.password?.type === 'pattern' && <span>Password must have one uppercase, one lowercase, one number and one special character</span>}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            {/* <div className="form-control">
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
            </div> */}
        <p>Already Registered? Please <Link to='/login' className='text-orange-600 font-semibold'>Login</Link></p>
            <div className="form-control mt-6">
              <input  className="btn btn-primary" type="submit" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>
    );
};

export default Register;