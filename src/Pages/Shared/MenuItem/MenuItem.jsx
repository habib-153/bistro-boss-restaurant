/* eslint-disable react/prop-types */

const MenuItem = ({item}) => {
    const {image, name, recipe, price} = item
    return (
        <div className="flex  space-x-3">
            <img style={{borderRadius: '0 200px 200px 200px'}} className="w-[120px]" src={image} alt="" />
            <div>
                <h3 className="uppercase ">{name}</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-500 font-semibold">${price}</p>
        </div>
    );
};

export default MenuItem;