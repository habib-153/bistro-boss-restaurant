import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Comnonent/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUtensils } from "react-icons/fa";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const UpdateItem = () => {
    const {name, category, price, recipe, _id} = useLoaderData()
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const onSubmit = async (data) => {
        //console.log(data);
    
        const imageFile = { image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if(res.data.success){
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
            //console.log(menuRes.data)
            if(menuRes.data.modifiedCount > 0){
                // show success popup
                Swal.fire({
                    icon: "success",
                    title: "Updated",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
    }
    return (
        <div>
            <SectionTitle heading="UPDATE ITEM" ></SectionTitle>
            <div>
            <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Recipe name</span>
                </label>
                <input
                  type="text" 
                  {...register("name", {required: true})}
                  defaultValue={name}
                  className="input input-bordered"
                  required
                />
              </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Category</span>
                </label>
                <select defaultValue={category}
                  {...register("category", {required: true})}
                  className="select select-bordered w-full"
                >
                  <option value="default" disabled>
                    Select a Category
                  </option>
                  <option value="salad">Salad</option>
                  <option value="pizza">Pizza</option>
                  <option value="soup">Soup</option>
                  <option value="dessert">Dessert</option>
                  <option value="drinks">Drinks</option>
                </select>
            </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Price</span>
                </label>
                <input
                  type="number" defaultValue={price}
                  {...register("price", {required: true})}
                  placeholder="Price"
                  className="input input-bordered"
                  required
                />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Recipe Details</span>
            </label>
            <textarea
              type="text" defaultValue={recipe}
              {...register("recipe", {required: true})}
              placeholder="Recipe Details"
              className="input h-24 input-bordered"
              required
            />
          </div>
            <div className="form-control w-full my-6">
                <input {...register("image", {required: true})} type="file" className="input input-bordered pt-2" />
            </div>
            <div className="w-full text-center">
                <button className="btn">
                Update Item <FaUtensils className="ml-4"></FaUtensils>
                </button>
            </div>
        </form>
            </div>
        </div>
    );
};

export default UpdateItem;