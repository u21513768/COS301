import { Nav, Search, TrendingTopics, WhoToFollow } from '@components/index'
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

type Props = {
    children: React.ReactNode
}

const AppLayout = (props: Props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    // Check if the current path is "/settings"
    const isSettingsPage = pathname === '/settings';
    
    const handleNavigation = (path: any) => {
        navigate(path);
    };

    return (
        <div className="w-full h-full flex justify-center align-middle">
            <div className="container flex w-full justify-center dark:bg-black">
                <div className="nav flex justify-end w-1/5 m-0 p-0 mr-[2vh] pr-10">
                    <Nav />
                </div>
                {
                    isSettingsPage ? props.children :
                    <>
                    <div className="main-content w-2/5 m-0 p-0 border dark:border-neutral-800 dark:bg-black">
                        {props.children}
                    </div>
                    <div className="sidebar-right w-1/4 ml-7 mt-2 pl-1 pr-2 dark:bg-black">
                        <div className="mb-3">
                            <Search />
                        </div>
                        <TrendingTopics onNavigate={handleNavigation} />
                        <WhoToFollow users={[]} />
                    </div>
                    </>
                }
            </div>
        </div>
    )
}

export default AppLayout