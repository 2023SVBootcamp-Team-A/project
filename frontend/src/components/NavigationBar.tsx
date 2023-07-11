import React from 'react';
import NavigationBarBtn from './NavigationBarBtn';

export default function NavigationBar() {
    return(
        <>
            <div className="w-5/6 h-16 top-3.5 absolute">
                <div className='flex'>
                    <div className='flex-1'>
                        <div className="w-2/12 h-full py-4 flex-1 absolute text-3xl font-medium text-center text-white rounded-bl-20 bg-beige">
                            MyW
                        </div>
                    </div>
                    <div className='w-4/6 h-16 bg-[#BCBAB8] flex flex-row items-center'>
                        
                        <div className='flex-1 flex flex-col items-center'>
                            <NavigationBarBtn link='/'>
                                Home
                            </NavigationBarBtn>
                        </div>
                        <div className='flex-1 flex flex-col items-center'>
                            <NavigationBarBtn link='/mypage'>
                                My page
                            </NavigationBarBtn>
                        </div>
                        <div className='flex-1 flex flex-col items-center'>
                            <NavigationBarBtn link='/bookshelf'>
                                Bookshelf
                            </NavigationBarBtn>
                        </div>
                        <div className='flex-1 flex flex-col items-center'>
                            <NavigationBarBtn link='/login'>
                                Log in
                            </NavigationBarBtn>
                        </div>
                        
                    </div>
                    <div className='w-2/12 h-full flex-1 rounded-br-20 text-right text-2xl text-white bg-beige'>
                        <span className='flex flex-col items-center'>
                            Make your<br/>
                            World
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-screen h-3.5 absolute left-0 top-0 bg-beige" />
        </>
    );
}