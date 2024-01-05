/* eslint-disable no-unused-vars */
import { FaTrash } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";

const Cart = () => {
  const [cart, refetch] = useCart();
  // const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { handleSubmit, register } = useForm();

  const [selectedCurrency, setSelectedCurrency] = useState("USD")
  const [exchangeRates, setExchangeRates] = useState({
    USD: 1, 
    BDT: 109.93, 
    Euro: 0.91, 
  });
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const totalPriceInSelectedCurrency = cart.reduce((sum,item)=> sum+item.price * exchangeRates[selectedCurrency],0)

  const onSubmit = async (data) => {
    const info = {
      name: data.name,
      email: user.email,
      address: data.address,
      phone: data.phone,
      currency: data.currency,
      price: parseFloat(totalPriceInSelectedCurrency),
      date: new Date(),
      cartIds: cart.map(item => item._id),
      menuItemIds: cart.map(item => item.menuId),
      status: 'pending'
    };
    // console.log(info)
    const res = await axiosSecure.post('/payment', info)
    if(res){
      console.log(res.data)
      window.location.replace(res.data.url)
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div>
        <div className="flex justify-evenly items-center">
          <h2 className="text-4xl">Items: {cart.length}</h2>
          {/* <h2 className="text-2xl">Total Price: ${totalPriceInSelectedCurrency.toFixed(2)}</h2>
          {cart.length > 0 ? (
            <Link to="/dashboard/payment">
              <button className="btn btn-outline">Pay</button>
            </Link>
          ) : (
            <button disabled className="btn btn-outline">
              Pay
            </button>
          )} */}
        </div>

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Customer name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Customer name"
                defaultValue={user.displayName}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Address</span>
              </label>
              <input
                type="text"
                {...register("address", { required: true })}
                placeholder="Address"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Phone Number</span>
              </label>
              <input
                type="text"
                {...register("phone", { required: true })}
                placeholder="Phone Number"
                className="input input-bordered"
              />
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Currency</span>
            </label>
            <select
              value={selectedCurrency}
              {...register("currency", { required: true })}
              onChange={handleCurrencyChange}
              className="select select-bordered w-full"
            >
              <option value="USD">USD</option>
              <option value="BDT">BDT</option>
              <option value="Euro">Euro</option>
            </select>
          </div>
              <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Price</span>
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="Price"
              value={totalPriceInSelectedCurrency.toFixed(2)}
              className="input input-bordered"
              readOnly
            />
          </div>
            </div>
            <div className="w-full text-center mt-3">
              {cart.length > 0 ? (
                  <button className="btn btn-outline">Pay</button>
              ) : (
                <button disabled className="btn btn-outline">
                  Pay
                </button>
              )}
            </div>
          </form>
        </div>
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
                <td>{idx + 1}</td>
                <th>
                  <img
                    className="rounded w-16 h-12 mx-auto"
                    src={item.image}
                    alt=""
                  />
                </th>
                <th>
                  <p>{item.name}</p>
                </th>
                <th>
                  <p>{item.price}</p>
                </th>
                <th>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost  text-red-600"
                  >
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
