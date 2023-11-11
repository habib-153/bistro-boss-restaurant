import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import img from '../../../assets/assets/menu/banner3.jpg'
import desbg from '../../../assets/assets/menu/dessert-bg.jpeg'
import pizzaBg from '../../../assets/assets/menu/pizza-bg.jpg'
import soupBg from '../../../assets/assets/menu/soup-bg.jpg'
import saladBg from '../../../assets/assets/menu/salad-bg.jpg'
import useMenu from '../../../Hooks/useMenu';
import SectionTitle from '../../../Comnonent/SectionTitle/SectionTitle.jsx'
import MenuCategory from '../MenuCategory/MenuCategory.jsx';
const Menu = () => {
    const [menu] = useMenu()
    const dessert = menu.filter(item => item.category === 'dessert')
    const pizza = menu.filter(item => item.category === 'pizza')
    const soup = menu.filter(item => item.category === 'soup')
    const salad= menu.filter(item => item.category === 'salad')
    const offered= menu.filter(item => item.category === 'offered')
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover img={img} title="OUR MENU" description="Would you like to try a dish?"></Cover>
            <SectionTitle subHeading="---Don't miss---" heading="TODAY'S OFFER"></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>
            <MenuCategory items={dessert} 
            title="Dessert" coverImg={desbg}
            ></MenuCategory>
            <MenuCategory items={pizza} 
            title="Pizza" coverImg={pizzaBg}
            ></MenuCategory>
            <MenuCategory items={salad} 
            title="Salad" coverImg={saladBg}
            ></MenuCategory>
            <MenuCategory items={soup} 
            title="SOUP" coverImg={soupBg}
            ></MenuCategory>
        </div>
    );
};

export default Menu;