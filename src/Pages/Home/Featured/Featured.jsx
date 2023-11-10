import SectionTitle from "../../../Comnonent/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/assets/home/featured.jpg'
import './Featured.css'
const Featured = () => {
    return (
        <div className="featured-item bg-fixed  pt-10">
            <SectionTitle subHeading='---Check it out---' heading='FROM OUR MENU'></SectionTitle>
            <div className="md:flex justify-center items-center pb-20 pt-12 px-36 text-white my-6">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="max-w-[604px] md:ml-10">
                    <p>March 20, 2023 <br />WHERE CAN I GET SOME? <br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                    <button className="btn border-0 border-b-4 btn-outline text-white">Read More</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;