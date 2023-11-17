/* eslint-disable react/prop-types */

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="text-center md:w-[30%] mx-auto">
            <p className="text-[#D99904] text-lg italic">{subHeading}</p>
            <p className="text-[#151515] border-y-4 text-[35px] ">{heading}</p>
        </div>
    );
};

export default SectionTitle;