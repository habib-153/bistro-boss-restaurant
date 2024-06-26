import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaShoppingCart } from 'react-icons/fa';
import useCart from "../../../Hooks/useCart";
import useAdmin from "../../../Hooks/useAdmin";
const Navbar = () => {
  const {user, logOut} = useContext(AuthContext)
  const [isAdmin] = useAdmin()
  const [cart] = useCart()

  const handleLogOut = () =>{
    logOut()
    .then(() =>{})
    .catch(error => console.log(error)
    )
  }
  const NavOption = (
    <>
      <li>
        <Link className="text-white mx-5" to='/'>Home</Link>
      </li>
      <li>
        <Link className="text-white mx-5" to='menu'>Our Menu</Link>
      </li>
      <li>
        <Link className="text-white mx-5" to='order/salad'>Order</Link>
      </li>
      <li>
        <Link className="text-white mx-5" to='/dashboard/cart'>
        <button className="btn">
            <FaShoppingCart></FaShoppingCart>
            <div className="badge badge-secondary">+{cart.length}</div>
        </button>
        </Link>
      </li>
      {
        user && isAdmin && <li><Link className="text-white mx-5" to='/dashboard/adminHome'>Dashboard</Link></li>
      }
      {
        user && !isAdmin && <li><Link className="text-white mx-5" to='/dashboard/userHome'>Dashboard</Link></li>
      }
      
      {
        user ? <>
          <p>{user.displayName}</p>
          <button onClick={handleLogOut} className="text-white mx-5">Logout</button>
        </> : <>
        <li>
        <Link className="text-white mx-5" to='login'>Login</Link>
      </li>
        </>
      }
      
    </>
  );
  return (
    <>
      <div className="navbar max-w-screen-xl fixed z-10 bg-opacity-30 bg-black text-white ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {NavOption}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">BISTRO BOSS</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal px-1 items-center">
           {NavOption}
          </ul>
        </div>
        <div className="navbar-end">
          {
            user?.photoURL ? <img className="w-[50px] rounded-full" src={user.photoURL} alt="img" />
            :
            undefined
          }
          
        </div>
      </div>
    </>
  );
};

export default Navbar;
