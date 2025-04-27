import basket_icon from './basket_icon.png'
import logo from './logo.png'
import header_img from './header_img.png'
import beer_background from './beer_background.png'
import beer from './beer.jpg'
import search_icon from './search_icon.png'
import menu_1 from './menu_1.png'
import menu_2 from './menu_2.png'
import menu_3 from './menu_3.png'
import menu_4 from './menu_4.png'
import menu_5 from './menu_5.png'
import menu_6 from './menu_6.png'
import menu_7 from './menu_7.png'
import menu_8 from './menu_8.png'

import Pale_Lager from './pale_lager.jpg'
import Dark_Lager from './dark_lager.jpeg'
import German_Pilsner from './german.webp'
import Czech_Pilsner from './czech.jpg';
import American_IPA from './america.jpeg';
import Double_IPA from './double.avif';
import Milk_Stout from './mil.jpeg';
import Oatmeal_Stout from './oatmel.jpg';
import Baltic_Porter from './baltic.jpg';
import English_Porter from './english.webp';
import Hefeweizen from './hefenweizen].jpg';
import Belgian_Witbier from './witbier.png';
import Berliner_Weisse from './weisee.jpg';
import Gose from './gose.jpg';
import American_Pale_Ale from './americanPale.jpg';
import English_Pale_Ale from './englishpale.png';


import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import linkedin_icon from './linkedin_icon.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_starts from './rating_starts.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'

export const assets = {
    logo,
    basket_icon,
    header_img,
    beer_background,
    beer,
    search_icon,
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    app_store,
    play_store,
    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon
}

export const menu_list = [
    {
        menu_name: "Lager",
        menu_image: menu_1
    },
    {
        menu_name: "Pilsner",
        menu_image: menu_2
    },
    {
        menu_name: "IPA",
        menu_image: menu_3
    },
    {
        menu_name: "Stout",
        menu_image: menu_4
    },
    {
        menu_name: "Porter",
        menu_image: menu_5
    },
    {
        menu_name: "Wheat Beer",
        menu_image: menu_6
    },
    {
        menu_name: "Sour Beer",
        menu_image: menu_7
    },
    {
        menu_name: "Pale Ale",
        menu_image: menu_8
    }
];


export const beer_list = [
    {
        _id: "1",
        name: "Pale Lager",
        image: Pale_Lager,
        price: 6,
        description: "A crisp, refreshing beer with a smooth finish, perfect for any occasion.",
        category: "Lager"
    },
    {
        _id: "2",
        name: "Dark Lager",
        image: Dark_Lager,
        price: 7,
        description: "Rich and malty, offering a deeper flavor for true beer lovers.",
        category: "Lager"
    },
    {
        _id: "3",
        name: "German Pilsner",
        image: German_Pilsner,
        price: 5,
        description: "Light-bodied with a floral hop aroma and a crisp, dry finish.",
        category: "Pilsner"
    },
    {
        _id: "4",
        name: "Czech Pilsner",
        image: Czech_Pilsner,
        price: 6,
        description: "A slightly sweet pilsner with a delicate bitterness and smooth mouthfeel.",
        category: "Pilsner"
    },
    {
        _id: "5",
        name: "American IPA",
        image: American_IPA,
        price: 8,
        description: "Bursting with hoppy flavors of citrus and pine for a bold experience.",
        category: "IPA"
    },
    {
        _id: "6",
        name: "Double IPA",
        image: Double_IPA,
        price: 9,
        description: "A stronger, hoppier IPA packed with intense aromas and high ABV.",
        category: "IPA"
    },
    {
        _id: "7",
        name: "Milk Stout",
        image: Milk_Stout,
        price: 7,
        description: "Smooth and creamy with a subtle sweetness and roasted malt flavor.",
        category: "Stout"
    },
    {
        _id: "8",
        name: "Oatmeal Stout",
        image: Oatmeal_Stout,
        price: 7,
        description: "A rich, full-bodied stout with flavors of chocolate, coffee, and oats.",
        category: "Stout"
    },
    {
        _id: "9",
        name: "Baltic Porter",
        image: Baltic_Porter,
        price: 8,
        description: "A dark, robust beer with smooth roasted flavors and hints of caramel.",
        category: "Porter"
    },
    {
        _id: "10",
        name: "English Porter",
        image: English_Porter,
        price: 7,
        description: "Mild roasted malt flavor with notes of chocolate and toffee.",
        category: "Porter"
    },
    {
        _id: "11",
        name: "Hefeweizen",
        image: Hefeweizen,
        price: 6,
        description: "A classic German wheat beer with fruity and spicy notes of banana and clove.",
        category: "Wheat Beer"
    },
    {
        _id: "12",
        name: "Belgian Witbier",
        image: Belgian_Witbier,
        price: 6,
        description: "Light and citrusy, brewed with orange peel and coriander.",
        category: "Wheat Beer"
    },
    {
        _id: "13",
        name: "Berliner Weisse",
        image: Berliner_Weisse,
        price: 7,
        description: "A tart and refreshing sour wheat beer, low in alcohol but big on flavor.",
        category: "Sour Beer"
    },
    {
        _id: "14",
        name: "Gose",
        image: Gose,
        price: 7,
        description: "A sour and salty German beer brewed with coriander and sea salt.",
        category: "Sour Beer"
    },
    {
        _id: "15",
        name: "American Pale Ale",
        image: American_Pale_Ale,
        price: 7,
        description: "A balanced pale ale with floral hops and a slightly bitter finish.",
        category: "Pale Ale"
    },
    {
        _id: "16",
        name: "English Pale Ale",
        image: English_Pale_Ale,
        price: 6,
        description: "Smooth maltiness balanced by earthy hop character, traditional and classic.",
        category: "Pale Ale"
    }
];
