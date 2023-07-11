import React from "react";
import { Link } from 'react-router-dom';

interface NavigationBarProps {
	children: React.ReactNode;
    link: string;
}

export default function NavigationBarBtn({ children, link }: NavigationBarProps) {
    return (
        <div className='text-27 font-medium text-left text-white'>
            <Link to={link}>
                { children }
            </Link>
        </div>
    );
}