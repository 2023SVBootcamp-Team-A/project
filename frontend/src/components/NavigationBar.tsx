import React, { useState } from 'react';
import NavigationBarBtn from './NavigationBarBtn';
import classNames from "classnames";

export default function NavigationBar() {
    const [menuToggle, setMenuToggle] = useState(false);
    return(
        <>
            <div className="w-5/6 h-16 top-3.5 absolute">
                <div className='flex'>
                    <div className='flex-1 flex-col items-center'>
                        <div className="hidden md:flex w-2/12 h-full py-4 flex-1 flex-col items-center absolute text-3xl font-medium text-center text-white rounded-bl-20 bg-beige">
                            <NavigationBarBtn link='/'>
                                <div className='flex'>
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    // svg에도 CSS 클래스를 적용할 수 있습니다.
                                    className="h-5 w-5 mr-1 white"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                        clipRule="evenodd"
                                    />
                                    </svg>
                                    <span className='text-2xl'>
                                        MyW
                                    </span>
                                </div>
                            </NavigationBarBtn>
                        </div>
                    </div>
                    <div className='hidden md:flex w-4/6 h-16 bg-[#BCBAB8] flex-row items-center'>
                        <div className='flex-1 flex flex-col items-center'>
                            <NavigationBarBtn link='/'>
                                Home
                            </NavigationBarBtn>
                        </div>
                        <div className='hidden md:flex flex-1 flex-col items-center'>
                            <NavigationBarBtn link='/mypage'>
                                My page
                            </NavigationBarBtn>
                        </div>
                        <div className='hidden md:flex flex-1 flex-col items-center'>
                            <NavigationBarBtn link='/bookshelf'>
                                Bookshelf
                            </NavigationBarBtn>
                        </div>
                        <div className='hidden md:flex flex-1 flex-col items-center'>
                            <NavigationBarBtn link='/login'>
                                Log in
                            </NavigationBarBtn>
                        </div>
                        
                    </div>
                    <div className='w-2/12 h-full flex-1 rounded-br-20 text-right text-2xl text-white bg-beige'>
                        <span className='hidden md:flex flex-1 flex-col items-center'>
                            Make your<br/>
                            World
                        </span>
                    </div>
                </div>
            </div>
            {/* mobile menu */}
            <div className='w-screen h-3.5 absolute left-0 top-0'>
                <div className="md:hidden  bg-beige">
                    <div className='flex '>
                        <div className='flex w-screen items-center justify-center p-4 pl-20 text-white text-2xl'>
                            <NavigationBarBtn link='/'>
                                <div className='flex'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        // svg에도 CSS 클래스를 적용할 수 있습니다.
                                        className="flex h-5 w-5 mr-1 mt white"
                                        viewBox="0 0 20 20"
                                        fill="white"
                                        >
                                        <path
                                            fillRule="inherit"
                                            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                            clipRule="inherit"
                                        />
                                    </svg>
                                    Make Your World
                                </div>
                            </NavigationBarBtn>
                        </div>
                        <button
                        onClick={() => setMenuToggle(!menuToggle)}
                        className='flex-1 flex-col items-center p-4'
                        >
                            
                            {menuToggle ? (
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="white"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                                </svg>
                            ) : (
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="white"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                </svg>
                                
                            )}
                        </button>
                    </div>
                    <div className='w-full bg-[#BCBAB8]'>
                        <div className={classNames("md:hidden", { hidden: !menuToggle })}>
                            <a href="mypage" className="block py-2 px-4 text-sm hover:bg-gray-200">
                                my page
                            </a>
                            <a href="bookshelf" className="block py-2 px-4 text-sm hover:bg-gray-200">
                                bookshelf
                            </a>
                            <a href="logout" className="block py-2 px-4 text-sm hover:bg-gray-200">
                               logout
                            </a>
                        </div>
                    </div>

                </div>
            </div>
            <div className='hidden md:flex'>
                <div className="w-screen h-3.5 absolute left-0 top-0 bg-beige" />
            </div>
        </>
    );
}