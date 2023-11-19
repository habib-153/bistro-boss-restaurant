import { FaEdit, FaTrash } from "react-icons/fa";
import SectionTitle from "../../../Comnonent/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useMenu from "../../../Hooks/useMenu";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const axiosSecure = useAxiosSecure()
    const [menu, , refetch] = useMenu()

    const handleDelete = (item) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then( async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                    if(res.data.deletedCount > 0 ){
                        refetch()
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    }
            }
          });
    }

    
    return (
        <div>
            <SectionTitle heading="MANAGE ALL ITEMS" subHeading="---Hurry Up!---"></SectionTitle>
            <div>
            <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Item Image</th>
              <th>Item Name</th>
              <th className="text-center">Price</th>
              <th className="text-center">Action</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item, idx) => (
              <tr className="text-center" key={item._id}>
                <td>{idx +1}</td>
                <th>
                  <img className="rounded w-16 h-12 mx-auto" src={item.image} alt="" />
                </th>
                <th>
                    <p>{item.name}</p>
                </th>
                <th>
                <p className="text-right">${item.price}</p>
                </th>
                <th>
                    <Link to={`/dashboard/updateItem/${item._id}`}>
                    <button className="btn btn-ghost btn-md bg-orange-400 hover:bg-orange-500 text-white">
                        <FaEdit></FaEdit>
                   </button>
                    </Link>
                </th>
                <th>
                   <button onClick={()=> handleDelete(item)} className="btn btn-ghost btn-md  text-red-600">
                        <FaTrash></FaTrash>
                   </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
            </div>
        </div>
    );
};

export default ManageItems;