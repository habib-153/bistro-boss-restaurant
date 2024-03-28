import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SocialLogin = () => {
    const { signInWithGoogle } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate();

    const handleGoogleLogin =()=>{
        signInWithGoogle()
        .then((res) => {
          //console.log(res.user)
          const userInfo = {
            email: res.user?.email,
            name: res.user?.displayName 
          }
          axiosPublic.post('/users', userInfo)
          .then(res =>{
            //console.log(res.data)
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
          
        })
      }
    return (
        <div className="mx-auto">
            <button onClick={handleGoogleLogin} className="hover:bg-[#269136]  btn btn-outline my-2">
              <FcGoogle className="text-xl"></FcGoogle>Continue with Google
            </button>
          </div>
    );
};

export default SocialLogin;