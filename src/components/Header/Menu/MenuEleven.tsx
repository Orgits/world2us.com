'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { usePathname } from 'next/navigation';
import Product from '@/components/Product/Product';
import productData from '@/data/Product.json'
import useLoginPopup from '@/store/useLoginPopup';
import useShopDepartmentPopup from '@/store/useShopDepartmentPopup';
import useMenuMobile from '@/store/useMenuMobile';
import { useModalCartContext } from '@/context/ModalCartContext';
import { useModalWishlistContext } from '@/context/ModalWishlistContext';
import { useCart } from '@/context/CartContext';

const MenuEleven = () => {
    const pathname = usePathname()
    const { openLoginPopup, handleLoginPopup } = useLoginPopup()
    const { openShopDepartmentPopup, handleShopDepartmentPopup } = useShopDepartmentPopup()
    const { openMenuMobile, handleMenuMobile } = useMenuMobile()
    const [openSubNavMobile, setOpenSubNavMobile] = useState<number | null>(null)
    const { openModalCart } = useModalCartContext()
    const { cartState } = useCart()
    const { openModalWishlist } = useModalWishlistContext()

    const [searchKeyword, setSearchKeyword] = useState('');
    const router = useRouter()

    const handleSearch = (value: string) => {
        router.push(`/search-result?query=${value}`)
        setSearchKeyword('')
    }

    const handleOpenSubNavMobile = (index: number) => {
        setOpenSubNavMobile(openSubNavMobile === index ? null : index)
    }

    const [fixedHeader, setFixedHeader] = useState(false)
    const [lastScrollPosition, setLastScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setFixedHeader(scrollPosition > 0 && scrollPosition < lastScrollPosition);
            setLastScrollPosition(scrollPosition);
        };

        // Gắn sự kiện cuộn khi component được mount
        window.addEventListener('scroll', handleScroll);

        // Hủy sự kiện khi component bị unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollPosition]);

    const handleGenderClick = (gender: string) => {
        router.push(`/shop/breadcrumb1?gender=${gender}`);
    };

    const handleCategoryClick = (category: string) => {
        router.push(`/shop/breadcrumb1?category=${category}`);
    };

    const handleTypeClick = (type: string) => {
        router.push(`/shop/breadcrumb1?type=${type}`);
    };

    return (
        <>
            <div className={`${fixedHeader ? ' fixed' : 'relative'} header-menu bg-white w-full top-0 z-10 duration-500`}>
                <div className={`header-menu style-eigh bg-white w-full md:h-[74px] h-[56px]`}>
                    <div className="container mx-auto h-full">
                        <div className="header-main flex items-center justify-between h-full">
                            <div className="menu-mobile-icon lg:hidden flex items-center" onClick={handleMenuMobile}>
                                <i className="icon-category text-2xl"></i>
                            </div>
                            <Link href={'/'} className='flex items-center'>
                                <div className="heading4">WORLD2US</div>
                            </Link>
                            <div className="form-search w-2/3 pl-8 flex items-center h-[44px] max-lg:hidden">
                                <div className="category-block relative h-full">
                                    <div className="category-btn bg-black relative flex items-center gap-6 py-2 px-4 h-full rounded-l w-fit cursor-pointer">
                                        <div className="text-button text-white whitespace-nowrap">All Categories</div>
                                        <Icon.CaretDown color='#ffffff' />
                                    </div>
                                </div>
                                <div className='w-full flex items-center h-full'>
                                    <input
                                        type="text"
                                        className="search-input h-full px-4 w-full border border-line"
                                        placeholder="What are you looking for today?"
                                        value={searchKeyword}
                                        onChange={(e) => setSearchKeyword(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchKeyword)}
                                    />
                                    <button
                                        className="search-button button-main bg-black h-full flex items-center px-7 rounded-none rounded-r"
                                        onClick={() => {
                                            handleSearch(searchKeyword)
                                        }}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                            <div className="right flex gap-12">
                                <div className="list-action flex items-center gap-4">
                                    <div className="user-icon flex items-center justify-center cursor-pointer">
                                        <Icon.User size={24} color='black' onClick={handleLoginPopup} />
                                        <div
                                            className={`login-popup absolute top-[74px] w-[320px] p-7 rounded-xl bg-white box-shadow-sm 
                                                ${openLoginPopup ? 'open' : ''}`}
                                        >
                                            <Link href={'/login'} className="button-main w-full text-center">Login</Link>
                                            <div className="text-secondary text-center mt-3 pb-4">Don’t have an account?
                                                <Link href={'/register'} className='text-black pl-1 hover:underline'>Register</Link>
                                            </div>
                                            <Link href={'/my-account'} className="button-main bg-white text-black border border-black w-full text-center">Dashboard</Link>
                                            <div className="bottom mt-4 pt-4 border-t border-line"></div>
                                            <Link href={'#!'} className='body1 hover:underline'>Support</Link>
                                        </div>
                                    </div>
                                    <div className="max-md:hidden wishlist-icon flex items-center cursor-pointer" onClick={openModalWishlist}>
                                        <Icon.Heart size={24} color='black' />
                                    </div>
                                    <div className="cart-icon flex items-center relative cursor-pointer" onClick={openModalCart}>
                                        <Icon.Handbag size={24} color='black' />
                                        <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">{cartState.cartArray.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="top-nav-menu relative bg-white border-t border-b border-line h-[44px] max-lg:hidden z-10">
                    <div className="container h-full">
                        <div className="top-nav-menu-main flex items-center justify-between h-full">
                            <div className="left flex items-center h-full">
                                <div className="menu-department-block relative h-full">
                                    <div
                                        className="menu-department-btn bg-black relative flex items-center sm:gap-5 gap-4 px-4 h-full w-fit cursor-pointer"
                                        onClick={handleShopDepartmentPopup}
                                    >
                                        <div className="text-button-uppercase text-white whitespace-nowrap">Shop By Department</div>
                                        <Icon.CaretDown color='#ffffff' className='text-xl max-sm:text-base' />
                                    </div>
                                    <div
                                        className={`sub-menu-department shop-department-popup box-shadow-sm absolute top-[44px] left-0 right-0 h-max bg-white rounded-b-2xl ${openShopDepartmentPopup ? 'open' : ''}`}
                                    >
                                        <div className="item block">
                                            <Link href={'/shop/breadcrumb-img'} className='py-1.5 whitespace-nowrap inline-block'>Men’s Clothing</Link>
                                        </div>
                                        <div className="item block">
                                            <Link href={'/shop/breadcrumb-img'} className='py-1.5 whitespace-nowrap inline-block'>Women’s Clothing</Link>
                                        </div>
                                        <div className="item block">
                                            <Link href={'/shop/breadcrumb-img'} className='py-1.5 whitespace-nowrap inline-block'>Accessories</Link>
                                        </div>
                                        <div className="item block">
                                            <Link href={'/shop/breadcrumb-img'} className='py-1.5 whitespace-nowrap inline-block'>Bags & Backpacks</Link>
                                        </div>
                                        <div className="item block">
                                            <Link href={'/shop/breadcrumb-img'} className='py-1.5 whitespace-nowrap inline-block'>Shoes</Link>
                                        </div>
                                        <div className="item block">
                                            <Link href={'/shop/breadcrumb-img'} className='py-1.5 whitespace-nowrap inline-block'>Jewelry</Link>
                                        </div>
                                        <div className="item block">
                                            <Link href={'/shop/breadcrumb-img'} className='py-1.5 whitespace-nowrap inline-block'>Watches</Link>
                                        </div>
                                        <div className="item block">
                                            <Link href={'/shop/breadcrumb-img'} className='py-1.5 whitespace-nowrap inline-block'>Beauty & Care</Link>
                                        </div>
                                        <div className="item block">
                                            <Link href={'/shop/breadcrumb-img'} className='py-1.5 whitespace-nowrap inline-block'>Pets</Link>
                                        </div>
                                        <div className="item block">
                                            <Link href={'/shop/breadcrumb-img'} className='py-1.5 whitespace-nowrap inline-block'>Kids & Baby</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="menu-main style-eight h-full pl-12 max-lg:hidden">
                                    <ul className='flex items-center gap-8 h-full'>
                                        <li className='h-full relative'>
                                            <Link
                                                href="#!"
                                                className={`text-button-uppercase duration-300 h-full flex items-center justify-center gap-1 
                                                ${pathname.includes('/homepages/') ? 'active' : ''}`}
                                            >
                                                Demo
                                            </Link>
                                            <div className="sub-menu absolute py-3 px-5 -left-10 w-max grid grid-cols-4 gap-5 bg-white rounded-b-xl">
                                                <ul>
                                                    <li>
                                                        <Link href="/" className='text-secondary duration-300'>
                                                            Home Fashion 1
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/homepages/fashion2"
                                                            className={`text-secondary duration-300 ${pathname === '/homepages/fashion2' ? 'active' : ''}`}
                                                        >
                                                            Home Fashion 2
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/homepages/fashion3"
                                                            className={`text-secondary duration-300 ${pathname === '/homepages/fashion3' ? 'active' : ''}`}
                                                        >
                                                            Home Fashion 3
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion4" className='text-secondary duration-300'>
                                                            Home Fashion 4
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion5" className='text-secondary duration-300'>
                                                            Home Fashion 5
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion6" className='text-secondary duration-300'>
                                                            Home Fashion 6
                                                        </Link>
                                                    </li>
                                                </ul>
                                                <ul>
                                                    <li>
                                                        <Link
                                                            href="/homepages/fashion7"
                                                            className={`text-secondary duration-300 ${pathname === '/homepages/fashion7' ? 'active' : ''}`}
                                                        >
                                                            Home Fashion 7
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion8" className={`text-secondary duration-300 ${pathname === '/homepages/fashion8' ? 'active' : ''}`}>
                                                            Home Fashion 8
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion9" className={`text-secondary duration-300 ${pathname === '/homepages/fashion9' ? 'active' : ''}`}>
                                                            Home Fashion 9
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion10" className={`text-secondary duration-300 ${pathname === '/homepages/fashion10' ? 'active' : ''}`}>
                                                            Home Fashion 10
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion11" className={`text-secondary duration-300 ${pathname === '/homepages/fashion11' ? 'active' : ''}`}>
                                                            Home Fashion 11
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/underwear" className='text-secondary duration-300'>
                                                            Home Underwear
                                                        </Link>
                                                    </li>
                                                </ul>
                                                <ul>
                                                    <li>
                                                        <Link href="/homepages/cosmetic1" className='text-secondary duration-300'>
                                                            Home Cosmetic 1
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/cosmetic2" className='text-secondary duration-300'>
                                                            Home Cosmetic 2
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/cosmetic3" className={`text-secondary duration-300 ${pathname === '/homepages/cosmetic3' ? 'active' : ''}`}>
                                                            Home Cosmetic 3
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/pet" className='text-secondary duration-300'>
                                                            Home Pet Store
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/jewelry" className='text-secondary duration-300'>
                                                            Home Jewelry
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/furniture" className='text-secondary duration-300'>
                                                            Home Furniture
                                                        </Link>
                                                    </li>
                                                </ul>
                                                <ul>
                                                    <li>
                                                        <Link href="/homepages/watch" className='text-secondary duration-300'>
                                                            Home Watch
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/toys" className='text-secondary duration-300'>
                                                            Home Toys Kid
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/homepages/yoga"
                                                            className={`text-secondary duration-300 ${pathname === '/homepages/yoga' ? 'active' : ''}`}>
                                                            Home Yoga
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/organic" className={`text-secondary duration-300 ${pathname === '/homepages/organic' ? 'active' : ''}`}>
                                                            Home Organic
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/marketplace" className='text-secondary duration-300'>
                                                            Home Marketplace
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className='h-full'>
                                            <Link href="#!" className='text-button-uppercase duration-300 h-full flex items-center justify-center'>
                                                Features
                                            </Link>
                                            <div className="mega-menu absolute top-[44px] left-0 bg-white w-screen">
                                                <div className="container">
                                                    <div className="flex justify-between py-8">
                                                        <div className="nav-link basis-2/3 grid grid-cols-4 gap-y-8">
                                                            <div className="nav-item">
                                                                <div className="text-button-uppercase pb-2">For Men</div>
                                                                <ul>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleGenderClick('men')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Starting From 50% Off
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('outerwear')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Outerwear | Coats
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('sweater')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Sweaters | Cardigans
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('shirt')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Shirt | Sweatshirts
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleGenderClick('men')}
                                                                            className={`link text-secondary duration-300 cursor-pointer view-all-btn`}
                                                                        >
                                                                            View All
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="nav-item">
                                                                <div className="text-button-uppercase pb-2">Massimo Dutti</div>
                                                                <ul>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('shirt')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Shirt | Clothes
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('top')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Top | Overshirts
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('t-shirt')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            T-shirts | Clothes
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('swimwear')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Swimwear | Underwear
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleCategoryClick('fashion')}
                                                                            className={`link text-secondary duration-300 view-all-btn`}
                                                                        >
                                                                            View All
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="nav-item">
                                                                <div className="text-button-uppercase pb-2">Skincare</div>
                                                                <ul>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('face')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Faces Skin
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('eye')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Eyes Makeup
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('lip')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Lip Polish
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('hair')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Hair Care
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleCategoryClick('cosmetic')}
                                                                            className={`link text-secondary duration-300 view-all-btn`}
                                                                        >
                                                                            View All
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="nav-item">
                                                                <div className="text-button-uppercase pb-2">Health</div>
                                                                <ul>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('candle')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Cented Candle
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('drinks')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Health Drinks
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('clothes')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Yoga Clothes
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('mats')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Yoga Equipment
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleCategoryClick('yoga')}
                                                                            className={`link text-secondary duration-300 view-all-btn`}
                                                                        >
                                                                            View All
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="nav-item">
                                                                <div className="text-button-uppercase pb-2">For Women</div>
                                                                <ul>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleGenderClick('women')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Starting From 60% Off
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('dress')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Dresses | Jumpsuits
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('t-shirt')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            T-shirts | Sweatshirts
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('accessories')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Accessories | Jewelry
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleGenderClick('women')}
                                                                            className={`link text-secondary duration-300 view-all-btn`}
                                                                        >
                                                                            View All
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="nav-item">
                                                                <div className="text-button-uppercase pb-2">For Kid</div>
                                                                <ul>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('bed')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Kids Bed
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('toy')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Boy{String.raw`'s`} Toy
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('blanket')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Baby Blanket
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('clothing')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Newborn Clothing
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleCategoryClick('toys-kid')}
                                                                            className={`link text-secondary duration-300 view-all-btn`}
                                                                        >
                                                                            View All
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="nav-item">
                                                                <div className="text-button-uppercase pb-2">For Home</div>
                                                                <ul>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleCategoryClick('furniture')}

                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Furniture | Decor
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('table')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Table | Living Room
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('chair')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Chair | Work Room
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleTypeClick('lighting')}
                                                                            className={`link text-secondary duration-300 cursor-pointer`}
                                                                        >
                                                                            Lighting | Bed Room
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div
                                                                            onClick={() => handleCategoryClick('furniture')}
                                                                            className={`link text-secondary duration-300 view-all-btn`}
                                                                        >
                                                                            View All
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="banner-ads-block pl-2.5 basis-1/3">
                                                            <div className="banner-ads-item bg-linear rounded-2xl relative overflow-hidden cursor-pointer" onClick={() => handleTypeClick('swimwear')}>
                                                                <div className="text-content py-14 pl-8 relative z-[1]">
                                                                    <div className="text-button-uppercase text-white bg-red px-2 py-0.5 inline-block rounded-sm">Save $10</div>
                                                                    <div className="heading6 mt-2">Dive into Savings <br />on Swimwear</div>
                                                                    <div className="body1 mt-3 text-secondary">
                                                                        Starting at <span className='text-red'>$59.99</span>
                                                                    </div>
                                                                </div>
                                                                <Image
                                                                    src={'/images/slider/bg2-2.png'}
                                                                    width={200}
                                                                    height={100}
                                                                    alt='bg-img'
                                                                    className='basis-1/3 absolute right-0 top-0 duration-700'
                                                                />
                                                            </div>
                                                            <div className="banner-ads-item bg-linear rounded-2xl relative overflow-hidden cursor-pointer mt-8" onClick={() => handleTypeClick('accessories')}>
                                                                <div className="text-content py-14 pl-8 relative z-[1]">
                                                                    <div className="text-button-uppercase text-white bg-red px-2 py-0.5 inline-block rounded-sm">Save $10</div>
                                                                    <div className="heading6 mt-2">20% off <br />accessories</div>
                                                                    <div className="body1 mt-3 text-secondary">
                                                                        Starting at <span className='text-red'>$59.99</span>
                                                                    </div>
                                                                </div>
                                                                <Image
                                                                    src={'/images/other/bg-feature.png'}
                                                                    width={200}
                                                                    height={100}
                                                                    alt='bg-img'
                                                                    className='basis-1/3 absolute right-0 top-0 duration-700'
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className='h-full'>
                                            <Link href="#!" className='text-button-uppercase duration-300 h-full flex items-center justify-center'>
                                                Shop
                                            </Link>
                                            <div className="mega-menu absolute top-[44px] left-0 bg-white w-screen">
                                                <div className="container">
                                                    <div className="flex justify-between py-8">
                                                        <div className="nav-link basis-2/3 flex justify-between pr-12">
                                                            <div className="nav-item">
                                                                <div className="text-button-uppercase pb-2">Shop Features</div>
                                                                <ul>
                                                                    <li>
                                                                        <Link
                                                                            href={'/shop/breadcrumb-img'}
                                                                            className={`link text-secondary duration-300 ${pathname === '/shop/breadcrumb-img' ? 'active' : ''}`}
                                                                        >
                                                                            Shop Breadcrumb IMG
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/shop/breadcrumb1'}
                                                                            className={`link text-secondary duration-300 ${pathname === '/shop/breadcrumb1' ? 'active' : ''}`}
                                                                        >
                                                                            Shop Breadcrumb 1
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/shop/breadcrumb2'}
                                                                            className={`link text-secondary duration-300 ${pathname === '/shop/breadcrumb2' ? 'active' : ''}`}
                                                                        >
                                                                            Shop Breadcrumb 2
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/shop/collection'}
                                                                            className={`link text-secondary duration-300 ${pathname === '/shop/collection' ? 'active' : ''}`}
                                                                        >
                                                                            Shop Collection
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="nav-item">
                                                                <div className="text-button-uppercase pb-2">Shop Features</div>
                                                                <ul>
                                                                    <li>
                                                                        <Link
                                                                            href={'/shop/filter-canvas'}
                                                                            className={`link text-secondary duration-300 ${pathname === '/shop/filter-canvas' ? 'active' : ''}`}
                                                                        >
                                                                            Shop Filter Canvas
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/shop/filter-options'}
                                                                            className={`link text-secondary duration-300 ${pathname === '/shop/filter-options' ? 'active' : ''}`}
                                                                        >
                                                                            Shop Filter Options
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/shop/filter-dropdown'}
                                                                            className={`link text-secondary duration-300 ${pathname === '/shop/filter-dropdown' ? 'active' : ''}`}
                                                                        >
                                                                            Shop Filter Dropdown
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/shop/sidebar-list'}
                                                                            className={`link text-secondary duration-300 ${pathname === '/shop/sidebar-list' ? 'active' : ''}`}
                                                                        >
                                                                            Shop Sidebar List
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="nav-item">
                                                                <div className="text-button-uppercase pb-2">Shop Layout</div>
                                                                <ul>
                                                                    <li>
                                                                        <Link
                                                                            href={'/shop/default'}
                                                                            className={`link text-secondary duration-300 cursor-pointer ${pathname === '/shop/default' ? 'active' : ''}`}
                                                                        >
                                                                            Shop Default
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/shop/default-grid'}
                                                                            className={`link text-secondary duration-300 cursor-pointer ${pathname === '/shop/default-grid' ? 'active' : ''}`}
                                                                        >
                                                                            Shop Default Grid
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/shop/default-list'}
                                                                            className={`link text-secondary duration-300 cursor-pointer ${pathname === '/shop/default-list' ? 'active' : ''}`}
                                                                        >
                                                                            Shop Default List
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/shop/fullwidth'}
                                                                            className={`link text-secondary duration-300 cursor-pointer ${pathname === '/shop/fullwidth' ? 'active' : ''}`}
                                                                        >
                                                                            Shop Full Width
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/shop/square'}
                                                                            className={`link text-secondary duration-300 ${pathname === '/shop/square' ? 'active' : ''}`}
                                                                        >
                                                                            Shop Square
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/checkout'}
                                                                            className={`link text-secondary duration-300 ${pathname === '/checkout' ? 'active' : ''}`}
                                                                        >
                                                                            Checkout
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/checkout2'}
                                                                            className={`link text-secondary duration-300 ${pathname === '/checkout2' ? 'active' : ''}`}
                                                                        >
                                                                            Checkout Style 2
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="nav-item">
                                                                <div className="text-button-uppercase pb-2">Products Pages</div>
                                                                <ul>
                                                                    <li>
                                                                        <Link
                                                                            href={'/wishlist'}
                                                                            className={`link text-secondary duration-300 ${pathname === '/wishlist' ? 'active' : ''}`}
                                                                        >
                                                                            Wish List
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/search-result'}
                                                                            className={`link text-secondary duration-300 ${pathname === '/search-result' ? 'active' : ''}`}
                                                                        >
                                                                            Search Result
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/cart'}
                                                                            className={`link text-secondary duration-300 ${pathname === '/cart' ? 'active' : ''}`}
                                                                        >
                                                                            Shopping Cart
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/login'}
                                                                            className={`link text-secondary duration-300 ${pathname === '/login' ? 'active' : ''}`}
                                                                        >
                                                                            Login/Register
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/forgot-password'}
                                                                            className={`link text-secondary duration-300 ${pathname === '/forgot-password' ? 'active' : ''}`}
                                                                        >
                                                                            Forgot Password
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/order-tracking'}
                                                                            className={`link text-secondary duration-300 ${pathname === '/order-tracking' ? 'active' : ''}`}
                                                                        >
                                                                            Order Tracking
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/my-account'}
                                                                            className={`link text-secondary duration-300 ${pathname === '/my-account' ? 'active' : ''}`}
                                                                        >
                                                                            My Account
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="recent-product pl-2.5 basis-1/3">
                                                            <div className="text-button-uppercase pb-2">Recent Products</div>
                                                            <div className="list-product hide-product-sold  grid grid-cols-2 gap-5 mt-3">
                                                                {productData.filter(item => item.action === 'add to cart').slice(0, 2).map((prd, index) => (
                                                                    <Product key={index} data={prd} type='grid' style='style-1' />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className='h-full'>
                                            <Link href="#!" className='text-button-uppercase duration-300 h-full flex items-center justify-center'>
                                                Product
                                            </Link>
                                            <div className="mega-menu absolute top-[44px] left-0 bg-white w-screen">
                                                <div className="container">
                                                    <div className="flex justify-between py-8">
                                                        <div className="nav-link basis-2/3 flex justify-between xl:pr-14 pr-5">
                                                            <div className="nav-item">
                                                                <div className="text-button-uppercase pb-2">Products Features</div>
                                                                <ul>
                                                                    <li>
                                                                        <Link
                                                                            href={'/product/default'}
                                                                            className={`text-secondary duration-300 ${pathname === '/product/default' ? 'active' : ''}`}
                                                                        >
                                                                            Products Defaults
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/product/sale'}
                                                                            className={`text-secondary duration-300 ${pathname === '/product/sale' ? 'active' : ''}`}
                                                                        >
                                                                            Products Sale
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/product/countdown-timer'}
                                                                            className={`text-secondary duration-300 ${pathname === '/product/countdown-timer' ? 'active' : ''}`}
                                                                        >
                                                                            Products Countdown Timer
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/product/grouped'}
                                                                            className={`text-secondary duration-300 ${pathname === '/product/grouped' ? 'active' : ''}`}
                                                                        >
                                                                            Products Grouped
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/product/bought-together'}
                                                                            className={`text-secondary duration-300 ${pathname === '/product/bought-together' ? 'active' : ''}`}
                                                                        >
                                                                            Frequently Bought Together
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/product/out-of-stock'}
                                                                            className={`text-secondary duration-300 ${pathname === '/product/out-of-stock' ? 'active' : ''}`}
                                                                        >
                                                                            Products Out Of Stock
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/product/variable'}
                                                                            className={`text-secondary duration-300 ${pathname === '/product/variable' ? 'active' : ''}`}
                                                                        >
                                                                            Products Variable
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="nav-item">
                                                                <div className="text-button-uppercase pb-2">Products Features</div>
                                                                <ul>
                                                                    <li>
                                                                        <Link
                                                                            href={'/product/external'}
                                                                            className={`text-secondary duration-300 ${pathname === '/product/external' ? 'active' : ''}`}
                                                                        >
                                                                            Products External
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/product/on-sale'}
                                                                            className={`text-secondary duration-300 ${pathname === '/product/on-sale' ? 'active' : ''}`}
                                                                        >
                                                                            Products On Sale
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/product/discount'}
                                                                            className={`text-secondary duration-300 ${pathname === '/product/discount' ? 'active' : ''}`}
                                                                        >
                                                                            Products With Discount
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/product/sidebar'}
                                                                            className={`text-secondary duration-300 ${pathname === '/product/sidebar' ? 'active' : ''}`}
                                                                        >
                                                                            Products With Sidebar
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/product/fixed-price'}
                                                                            className={`text-secondary duration-300 ${pathname === '/product/fixed-price' ? 'active' : ''}`}
                                                                        >
                                                                            Products Fixed Price
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="nav-item">
                                                                <div className="text-button-uppercase pb-2">Products Layout</div>
                                                                <ul>
                                                                    <li>
                                                                        <Link
                                                                            href={'/product/thumbnail-left'}
                                                                            className={`link text-secondary duration-300 cursor-pointer ${pathname === '/product/thumbnail-left' ? 'active' : ''}`}
                                                                        >
                                                                            Products Thumbnails Left
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/product/thumbnail-bottom'}
                                                                            className={`link text-secondary duration-300 cursor-pointer ${pathname === '/product/thumbnail-bottom' ? 'active' : ''}`}
                                                                        >
                                                                            Products Thumbnails Bottom
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/product/one-scrolling'}
                                                                            className={`link text-secondary duration-300 cursor-pointer ${pathname === '/product/one-scrolling' ? 'active' : ''}`}
                                                                        >
                                                                            Products Grid 1 Scrolling
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/product/two-scrolling'}
                                                                            className={`link text-secondary duration-300 cursor-pointer ${pathname === '/product/two-scrolling' ? 'active' : ''}`}
                                                                        >
                                                                            Products Grid 2 Scrolling
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/product/combined-one'}
                                                                            className={`link text-secondary duration-300 cursor-pointer ${pathname === '/product/combined-one' ? 'active' : ''}`}
                                                                        >
                                                                            Products Combined 1
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href={'/product/combined-two'}
                                                                            className={`link text-secondary duration-300 cursor-pointer ${pathname === '/product/combined-two' ? 'active' : ''}`}
                                                                        >
                                                                            Products Combined 2
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="recent-product pl-2.5 basis-1/3">
                                                            <div className="text-button-uppercase pb-2">Recent Products</div>
                                                            <div className="list-product hide-product-sold  grid grid-cols-2 gap-5 mt-3">
                                                                {productData.filter(item => item.action === 'add to cart').slice(0, 2).map((prd, index) => (
                                                                    <Product key={index} data={prd} type='grid' style='style-1' />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className='h-full relative'>
                                            <Link href="#!" className='text-button-uppercase duration-300 h-full flex items-center justify-center'>
                                                Blog
                                            </Link>
                                            <div className="sub-menu py-3 px-5 -left-10 absolute bg-white rounded-b-xl">
                                                <ul className='w-full'>
                                                    <li>
                                                        <Link href="/blog/default" className={`text-secondary duration-300 ${pathname === '/blog/default' ? 'active' : ''}`}>
                                                            Blog Default
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/blog/list" className={`text-secondary duration-300 ${pathname === '/blog/list' ? 'active' : ''}`}>
                                                            Blog List
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/blog/grid" className={`text-secondary duration-300 ${pathname === '/blog/grid' ? 'active' : ''}`}>
                                                            Blog Grid
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/blog/detail1" className={`text-secondary duration-300 ${pathname === '/blog/detail1' ? 'active' : ''}`}>
                                                            Blog Detail 1
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/blog/detail2" className={`text-secondary duration-300 ${pathname === '/blog/detail2' ? 'active' : ''}`}>
                                                            Blog Detail 2
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className='h-full relative'>
                                            <Link href="#!" className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${pathname.includes('/pages') ? 'active' : ''}`}>
                                                Pages
                                            </Link>
                                            <div className="sub-menu py-3 px-5 -left-10 absolute bg-white rounded-b-xl">
                                                <ul className='w-full'>
                                                    <li>
                                                        <Link href="/pages/about" className={`text-secondary duration-300 ${pathname === '/pages/about' ? 'active' : ''}`}>
                                                            About Us
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/contact" className={`text-secondary duration-300 ${pathname === '/pages/contact' ? 'active' : ''}`}>
                                                            Contact Us
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/store-list" className={`text-secondary duration-300 ${pathname === '/pages/store-list' ? 'active' : ''}`}>
                                                            Store List
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/page-not-found" className={`text-secondary duration-300 ${pathname === '/pages/page-not-found' ? 'active' : ''}`}>
                                                            404
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/faqs" className={`text-secondary duration-300 ${pathname === '/pages/faqs' ? 'active' : ''}`}>
                                                            FAQs
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/coming-soon" className={`text-secondary duration-300 ${pathname === '/pages/coming-soon' ? 'active' : ''}`}>
                                                            Coming Soon
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/customer-feedbacks" className={`text-secondary duration-300 ${pathname === '/pages/customer-feedbacks' ? 'active' : ''}`}>
                                                            Customer Feedbacks
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="right flex items-center gap-1">
                                <div className="caption1">Hotline:</div>
                                <div className="text-button-uppercase">+91 63634 06885</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="menu-mobile" className={`${openMenuMobile ? 'open' : ''}`}>
                <div className="menu-container bg-white h-full">
                    <div className="container h-full">
                        <div className="menu-main h-full overflow-hidden">
                            <div className="heading py-2 relative flex items-center justify-center">
                                <div
                                    className="close-menu-mobile-btn absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface flex items-center justify-center"
                                    onClick={handleMenuMobile}
                                >
                                    <Icon.X size={14} />
                                </div>
                                <Link href={'/'} className='logo text-3xl font-semibold text-center'>World2us</Link>
                            </div>
                            <div className="form-search relative mt-2">
                                <Icon.MagnifyingGlass size={20} className='absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer' />
                                <input type="text" placeholder='What are you looking for?' className=' h-12 rounded-lg border border-line text-sm w-full pl-10 pr-4' />
                            </div>
                            <div className="list-nav mt-6">
                                <ul>
                                    <li
                                        className={`${openSubNavMobile === 1 ? 'open' : ''}`}
                                        onClick={() => handleOpenSubNavMobile(1)}
                                    >
                                        <a href={'#!'} className={`text-xl font-semibold flex items-center justify-between`}>Demo
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() => handleOpenSubNavMobile(1)}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full grid grid-cols-2 pt-2 pb-6">
                                                <ul>
                                                    <li>
                                                        <Link href="/" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/' ? 'active' : ''}`}>
                                                            Home Fashion 1
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion2" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/fashion2' ? 'active' : ''}`}>
                                                            Home Fashion 2
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion3" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/fashion3' ? 'active' : ''}`}>
                                                            Home Fashion 3
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion4" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/fashion4' ? 'active' : ''}`}>
                                                            Home Fashion 4
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion5" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/fashion5' ? 'active' : ''}`}>
                                                            Home Fashion 5
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion6" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/fashion6' ? 'active' : ''}`}>
                                                            Home Fashion 6
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion7" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/fashion7' ? 'active' : ''}`}>
                                                            Home Fashion 7
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion8" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/fashion8' ? 'active' : ''}`}>
                                                            Home Fashion 8
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion9" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/fashion9' ? 'active' : ''}`}>
                                                            Home Fashion 9
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion10" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/fashion10' ? 'active' : ''}`}>
                                                            Home Fashion 10
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/fashion11" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/fashion11' ? 'active' : ''}`}>
                                                            Home Fashion 11
                                                        </Link>
                                                    </li>
                                                </ul>
                                                <ul>
                                                    <li>
                                                        <Link href="/homepages/underwear" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/underwear' ? 'active' : ''}`}>
                                                            Home Underwear
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/cosmetic1" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/cosmetic1' ? 'active' : ''}`}>
                                                            Home Cosmetic 1
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/cosmetic2" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/cosmetic2' ? 'active' : ''}`}>
                                                            Home Cosmetic 2
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/cosmetic3" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/cosmetic3' ? 'active' : ''}`}>
                                                            Home Cosmetic 3
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/pet" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/pet' ? 'active' : ''}`}>
                                                            Home Pet Store
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/jewelry" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/jewelry' ? 'active' : ''}`}>
                                                            Home Jewelry
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/furniture" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/furniture' ? 'active' : ''}`}>
                                                            Home Furniture
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/watch" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/watch' ? 'active' : ''}`}>
                                                            Home Watch
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/toys" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/toys' ? 'active' : ''}`}>
                                                            Home Toys Kid
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/yoga" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/yoga' ? 'active' : ''}`}>
                                                            Home Yoga
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/organic" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/organic' ? 'active' : ''}`}>
                                                            Home Organic
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/marketplace" className={`nav-item-mobile text-secondary duration-300 ${pathname === '/homepages/marketplace' ? 'active' : ''}`}>
                                                            Home Marketplace
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li
                                        className={`${openSubNavMobile === 2 ? 'open' : ''}`}
                                        onClick={() => handleOpenSubNavMobile(2)}
                                    >
                                        <a href={'#!'} className='text-xl font-semibold flex items-center justify-between mt-5'>Features
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() => handleOpenSubNavMobile(2)}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full pt-3 pb-12">
                                                <div className="nav-link grid grid-cols-2 gap-5 gap-y-6">
                                                    <div className="nav-item">
                                                        <div className="text-button-uppercase pb-1">For Men</div>
                                                        <ul>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleGenderClick('men')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Starting From 50% Off
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('outerwear')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Outerwear | Coats
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('sweater')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Sweaters | Cardigans
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('shirt')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Shirt | Sweatshirts
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleGenderClick('men')}
                                                                    className={`link text-secondary duration-300 view-all-btn`}
                                                                >
                                                                    View All
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="nav-item">
                                                        <div className="text-button-uppercase pb-1">Skincare</div>
                                                        <ul>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('face')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Faces Skin
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('eye')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Eyes Makeup
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('lip')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Lip Polish
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('hair')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Hair Care
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleCategoryClick('cosmetic')}
                                                                    className={`link text-secondary duration-300 view-all-btn`}
                                                                >
                                                                    View All
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="nav-item">
                                                        <div className="text-button-uppercase pb-1">Health</div>
                                                        <ul>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('candle')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Cented Candle
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('drinks')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Health Drinks
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('clothes')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Yoga Clothes
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('mats')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Yoga Equipment
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleCategoryClick('yoga')}
                                                                    className={`link text-secondary duration-300 view-all-btn`}
                                                                >
                                                                    View All
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="nav-item">
                                                        <div className="text-button-uppercase pb-1">For Women</div>
                                                        <ul>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleGenderClick('women')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Starting From 60% Off
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('dress')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Dresses | Jumpsuits
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('t-shirt')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    T-shirts | Sweatshirts
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('accessories')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Accessories | Jewelry
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleGenderClick('women')}
                                                                    className={`link text-secondary duration-300 view-all-btn`}
                                                                >
                                                                    View All
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="nav-item">
                                                        <div className="text-button-uppercase pb-1">For Kid</div>
                                                        <ul>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('bed')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Kids Bed
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('toy')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Boy{String.raw`'s`} Toy
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('blanket')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Baby Blanket
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('clothing')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Newborn Clothing
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleCategoryClick('toys-kid')}
                                                                    className={`link text-secondary duration-300 view-all-btn`}
                                                                >
                                                                    View All
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="nav-item">
                                                        <div className="text-button-uppercase pb-1">For Home</div>
                                                        <ul>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleCategoryClick('furniture')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Furniture | Decor
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('table')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Table | Living Room
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('chair')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Chair | Work Room
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleTypeClick('lighting')}
                                                                    className={`link text-secondary duration-300 cursor-pointer`}
                                                                >
                                                                    Lighting | Bed Room
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div
                                                                    onClick={() => handleCategoryClick('furniture')}
                                                                    className={`link text-secondary duration-300 view-all-btn`}
                                                                >
                                                                    View All
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="banner-ads-block grid sm:grid-cols-2 items-center gap-6 pt-6">
                                                    <div className="banner-ads-item bg-linear rounded-2xl relative overflow-hidden" onClick={() => handleTypeClick('swimwear')}>
                                                        <div className="text-content py-14 pl-8 relative z-[1]">
                                                            <div className="text-button-uppercase text-white bg-red px-2 py-0.5 inline-block rounded-sm">Save $10</div>
                                                            <div className="heading6 mt-2">Dive into Savings <br />on Swimwear</div>
                                                            <div className="body1 mt-3 text-secondary">
                                                                Starting at <span className='text-red'>$59.99</span>
                                                            </div>
                                                        </div>
                                                        <Image
                                                            src={'/images/slider/bg2-2.png'}
                                                            width={200}
                                                            height={100}
                                                            alt='bg-img'
                                                            className='basis-1/3 absolute right-0 top-0'
                                                        />
                                                    </div>
                                                    <div className="banner-ads-item bg-linear rounded-2xl relative overflow-hidden" onClick={() => handleTypeClick('accessories')}>
                                                        <div className="text-content py-14 pl-8 relative z-[1]">
                                                            <div className="text-button-uppercase text-white bg-red px-2 py-0.5 inline-block rounded-sm">Save $10</div>
                                                            <div className="heading6 mt-2">20% off <br />accessories</div>
                                                            <div className="body1 mt-3 text-secondary">
                                                                Starting at <span className='text-red'>$59.99</span>
                                                            </div>
                                                        </div>
                                                        <Image
                                                            src={'/images/other/bg-feature.png'}
                                                            width={200}
                                                            height={100}
                                                            alt='bg-img'
                                                            className='basis-1/3 absolute right-0 top-0'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li
                                        className={`${openSubNavMobile === 3 ? 'open' : ''}`}
                                        onClick={() => handleOpenSubNavMobile(3)}
                                    >
                                        <a href={'#!'} className='text-xl font-semibold flex items-center justify-between mt-5'>Shop
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() => handleOpenSubNavMobile(3)}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full pt-3 pb-12">
                                                <div className="">
                                                    <div className="nav-link grid grid-cols-2 gap-5 gap-y-6 justify-between">
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-1">Shop Features</div>
                                                            <ul>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/breadcrumb-img'}
                                                                        className={`text-secondary duration-300 ${pathname === '/shop/breadcrumb-img' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Breadcrumb IMG
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/breadcrumb1'}
                                                                        className={`text-secondary duration-300 ${pathname === '/shop/breadcrumb1' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Breadcrumb 1
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/breadcrumb2'}
                                                                        className={`text-secondary duration-300 ${pathname === '/shop/breadcrumb2' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Breadcrumb 2
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/collection'}
                                                                        className={`text-secondary duration-300 ${pathname === '/shop/collection' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Collection
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-1">Shop Features</div>
                                                            <ul>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/filter-canvas'}
                                                                        className={`text-secondary duration-300 ${pathname === '/shop/filter-canvas' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Filter Canvas
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/filter-options'}
                                                                        className={`text-secondary duration-300 ${pathname === '/shop/filter-options' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Filter Options
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/filter-dropdown'}
                                                                        className={`text-secondary duration-300 ${pathname === '/shop/filter-dropdown' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Filter Dropdown
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/sidebar-list'}
                                                                        className={`text-secondary duration-300 ${pathname === '/shop/sidebar-list' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Sidebar List
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-1">Shop Layout</div>
                                                            <ul>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/default'}
                                                                        className={`link text-secondary duration-300 cursor-pointer ${pathname === '/shop/default' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Default
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/default-grid'}
                                                                        className={`link text-secondary duration-300 cursor-pointer ${pathname === '/shop/default-grid' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Default Grid
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/default-list'}
                                                                        className={`link text-secondary duration-300 cursor-pointer ${pathname === '/shop/default-list' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Default List
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/fullwidth'}
                                                                        className={`link text-secondary duration-300 cursor-pointer ${pathname === '/shop/fullwidth' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Full Width
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/square'}
                                                                        className={`link text-secondary duration-300 ${pathname === '/shop/square' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Square
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-1">Products Pages</div>
                                                            <ul>
                                                                <li>
                                                                    <Link
                                                                        href={'/wishlist'}
                                                                        className={`text-secondary duration-300 ${pathname === '/wishlist' ? 'active' : ''}`}
                                                                    >
                                                                        Wish List
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/search-result'}
                                                                        className={`text-secondary duration-300 ${pathname === '/search-result' ? 'active' : ''}`}
                                                                    >
                                                                        Search Result
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/cart'}
                                                                        className={`text-secondary duration-300 ${pathname === '/cart' ? 'active' : ''}`}
                                                                    >
                                                                        Shopping Cart
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/login'}
                                                                        className={`text-secondary duration-300 ${pathname === '/login' ? 'active' : ''}`}
                                                                    >
                                                                        Login/Register
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/forgot-password'}
                                                                        className={`text-secondary duration-300 ${pathname === '/forgot-password' ? 'active' : ''}`}
                                                                    >
                                                                        Forgot Password
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/order-tracking'}
                                                                        className={`text-secondary duration-300 ${pathname === '/order-tracking' ? 'active' : ''}`}
                                                                    >
                                                                        Order Tracking
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/my-account'}
                                                                        className={`text-secondary duration-300 ${pathname === '/my-account' ? 'active' : ''}`}
                                                                    >
                                                                        My Account
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="recent-product pt-3">
                                                        <div className="text-button-uppercase pb-1">Recent Products</div>
                                                        <div className="list-product hide-product-sold  grid grid-cols-2 gap-5 mt-3">
                                                            {productData.slice(0, 2).map((prd, index) => (
                                                                <Product key={index} data={prd} type='grid' style='style-1' />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li
                                        className={`${openSubNavMobile === 4 ? 'open' : ''}`}
                                        onClick={() => handleOpenSubNavMobile(4)}
                                    >
                                        <a href={'#!'} className='text-xl font-semibold flex items-center justify-between mt-5'>Product
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() => handleOpenSubNavMobile(4)}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full pt-3 pb-12">
                                                <div className="">
                                                    <div className="nav-link grid grid-cols-2 gap-5 gap-y-6 justify-between">
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-1">Products Features</div>
                                                            <ul>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/default'}
                                                                        className={`text-secondary duration-300 ${pathname === '/product/default' ? 'active' : ''}`}
                                                                    >
                                                                        Products Defaults
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/sale'}
                                                                        className={`text-secondary duration-300 ${pathname === '/product/sale' ? 'active' : ''}`}
                                                                    >
                                                                        Products Sale
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/countdown-timer'}
                                                                        className={`text-secondary duration-300 ${pathname === '/product/countdown-timer' ? 'active' : ''}`}
                                                                    >
                                                                        Products Countdown Timer
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/grouped'}
                                                                        className={`text-secondary duration-300 ${pathname === '/product/grouped' ? 'active' : ''}`}
                                                                    >
                                                                        Products Grouped
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/bought-together'}
                                                                        className={`text-secondary duration-300 ${pathname === '/product/bought-together' ? 'active' : ''}`}
                                                                    >
                                                                        Frequently Bought Together
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/out-of-stock'}
                                                                        className={`text-secondary duration-300 ${pathname === '/product/out-of-stock' ? 'active' : ''}`}
                                                                    >
                                                                        Products Out Of Stock
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/variable'}
                                                                        className={`text-secondary duration-300 ${pathname === '/product/variable' ? 'active' : ''}`}
                                                                    >
                                                                        Products Variable
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-1">Products Features</div>
                                                            <ul>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/external'}
                                                                        className={`text-secondary duration-300 ${pathname === '/product/external' ? 'active' : ''}`}
                                                                    >
                                                                        Products External
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/on-sale'}
                                                                        className={`text-secondary duration-300 ${pathname === '/product/on-sale' ? 'active' : ''}`}
                                                                    >
                                                                        Products On Sale
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/discount'}
                                                                        className={`text-secondary duration-300 ${pathname === '/product/discount' ? 'active' : ''}`}
                                                                    >
                                                                        Products With Discount
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/sidebar'}
                                                                        className={`text-secondary duration-300 ${pathname === '/product/sidebar' ? 'active' : ''}`}
                                                                    >
                                                                        Products With Sidebar
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/fixed-price'}
                                                                        className={`text-secondary duration-300 ${pathname === '/product/fixed-price' ? 'active' : ''}`}
                                                                    >
                                                                        Products Fixed Price
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item col-span-2">
                                                            <div className="text-button-uppercase pb-1">Products Layout</div>
                                                            <ul>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/thumbnail-left'}
                                                                        className={`link text-secondary duration-300 ${pathname === '/product/thumbnail-left' ? 'active' : ''}`}
                                                                    >
                                                                        Products Thumbnails Left
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/thumbnail-bottom'}
                                                                        className={`link text-secondary duration-300 ${pathname === '/product/thumbnail-bottom' ? 'active' : ''}`}
                                                                    >
                                                                        Products Thumbnails Bottom
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/one-scrolling'}
                                                                        className={`link text-secondary duration-300 ${pathname === '/product/one-scrolling' ? 'active' : ''}`}
                                                                    >
                                                                        Products Grid 1 Scrolling
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/two-scrolling'}
                                                                        className={`link text-secondary duration-300 ${pathname === '/product/two-scrolling' ? 'active' : ''}`}
                                                                    >
                                                                        Products Grid 2 Scrolling
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/combined-one'}
                                                                        className={`link text-secondary duration-300 ${pathname === '/product/combined-one' ? 'active' : ''}`}
                                                                    >
                                                                        Products Combined 1
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/product/combined-two'}
                                                                        className={`link text-secondary duration-300 ${pathname === '/product/combined-two' ? 'active' : ''}`}
                                                                    >
                                                                        Products Combined 2
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="recent-product pt-4">
                                                        <div className="text-button-uppercase pb-1">Recent Products</div>
                                                        <div className="list-product hide-product-sold  grid grid-cols-2 gap-5 mt-3">
                                                            {productData.slice(0, 2).map((prd, index) => (
                                                                <Product key={index} data={prd} type='grid' style='style-1' />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li
                                        className={`${openSubNavMobile === 5 ? 'open' : ''}`}
                                        onClick={() => handleOpenSubNavMobile(5)}
                                    >
                                        <a href={'#!'} className='text-xl font-semibold flex items-center justify-between mt-5'>Blog
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() => handleOpenSubNavMobile(5)}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full pt-2 pb-6">
                                                <ul className='w-full'>
                                                    <li>
                                                        <Link href="/blog/default" className={`text-secondary duration-300 ${pathname === '/blog/default' ? 'active' : ''}`}>
                                                            Blog Default
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/blog/list" className={`text-secondary duration-300 ${pathname === '/blog/list' ? 'active' : ''}`}>
                                                            Blog List
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/blog/grid" className={`text-secondary duration-300 ${pathname === '/blog/grid' ? 'active' : ''}`}>
                                                            Blog Grid
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/blog/detail1" className={`text-secondary duration-300 ${pathname === '/blog/detail1' ? 'active' : ''}`}>
                                                            Blog Detail 1
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/blog/detail2" className={`text-secondary duration-300 ${pathname === '/blog/detail2' ? 'active' : ''}`}>
                                                            Blog Detail 2
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li
                                        className={`${openSubNavMobile === 6 ? 'open' : ''}`}
                                        onClick={() => handleOpenSubNavMobile(6)}
                                    >
                                        <a href={'#!'} className='text-xl font-semibold flex items-center justify-between mt-5'>Pages
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() => handleOpenSubNavMobile(6)}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full pt-2 pb-6">
                                                <ul className='w-full'>
                                                    <li>
                                                        <Link href="/pages/about" className={`text-secondary duration-300 ${pathname === '/pages/about' ? 'active' : ''}`}>
                                                            About Us
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/contact" className={`text-secondary duration-300 ${pathname === '/pages/contact' ? 'active' : ''}`}>
                                                            Contact Us
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/store-list" className={`text-secondary duration-300 ${pathname === '/pages/store-list' ? 'active' : ''}`}>
                                                            Store List
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/page-not-found" className={`text-secondary duration-300 ${pathname === '/pages/page-not-found' ? 'active' : ''}`}>
                                                            404
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/faqs" className={`text-secondary duration-300 ${pathname === '/pages/faqs' ? 'active' : ''}`}>
                                                            FAQs
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/coming-soon" className={`text-secondary duration-300 ${pathname === '/pages/coming-soon' ? 'active' : ''}`}>
                                                            Coming Soon
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/customer-feedbacks" className={`text-secondary duration-300 ${pathname === '/pages/customer-feedbacks' ? 'active' : ''}`}>
                                                            Customer Feedbacks
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuEleven