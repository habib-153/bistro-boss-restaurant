import { FaTrash } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Cart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const axiosSecure = useAxiosSecure()

  const handleDelete = (id) =>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.delete(`/carts/${id}`)
            .then(res =>{
                if(res.data.deletedCount > 0 ){
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                }
            })
        }
      });
  }
  return (
    <div>
      <div className="flex justify-evenly items-center">
        <h2 className="text-4xl">Items: {cart.length}</h2>
        <h2 className="text-2xl">Total Price: ${totalPrice}</h2>
        <button className="btn btn-outline">Pay</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Item Image</th>
              <th>Item Name</th>
              <th className="text-center">Price</th>
              <th className="text-center hidden md:block">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr className="text-center" key={item._id}>
                <td>{idx +1}</td>
                <th>
                  <img className="rounded w-16 h-12 mx-auto" src={item.image} alt="" />
                </th>
                <th>
                    <p>{item.name}</p>
                </th>
                <th>
                <p>{item.price}</p>
                </th>
                <th>
                   <button onClick={()=> handleDelete(item._id)} className="btn btn-ghost  text-red-600">
                        <FaTrash></FaTrash>
                   </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
