import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import { AiOutlineHome } from 'react-icons/ai';
import { FaTasks } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import { LuFiles } from "react-icons/lu";
import { RiLogoutCircleRLine, RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import AuthService from "../services/auth.service";

function Sidebar() {
    const performLogout = () => {
        AuthService.logout();
    }

    const [collapsed, setCollapsed] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState('');

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const iconStyle = {
        color: 'aliceblue',
        height: '20px',
        width: '20px',
        paddingRight: '10px',
    }

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>

            <div className='sidebar-menu'>

                {/* Sidebar header */}
                <div className='sidebar-header'>

                    {collapsed ?
                        <div className="toggle-btn" onClick={toggleCollapse}>
                            <RiMenuUnfoldFill style={iconStyle} />
                        </div> :
                        <>
                            <div className='sidebar-header-text'>
                                TaskMaster
                            </div>
                            <div className="toggle-btn" onClick={toggleCollapse}>
                                <RiMenuFoldFill style={iconStyle} />
                            </div>
                        </>
                    }
                </div>

                {/* Side bar menu */}
                <div className={`menu-items ${activeMenuItem == 'home' ? 'active' : ''}`}>
                    <Link to="/home" onClick={() => setActiveMenuItem("home")}>
                        {
                            collapsed ?
                                <AiOutlineHome style={iconStyle} /> :
                                <>
                                    <AiOutlineHome style={iconStyle} />
                                    <span className='menu-text'>Home</span>
                                </>
                        }
                    </Link>
                </div>

                <div className={`menu-items ${activeMenuItem == 'mytask' ? 'active' : ''}`}>
                    <Link to="/mytask" onClick={() => setActiveMenuItem("mytask")}>
                        {collapsed
                            ? <FaTasks style={iconStyle} /> :
                            <>
                                <FaTasks style={iconStyle} />
                                <span className='menu-text'>My Task</span>
                            </>
                        }
                    </Link>
                </div>

                <div className={`menu-items ${activeMenuItem == 'portfolio' ? 'active' : ''}`}>
                    <Link to="/portfolio" onClick={() => setActiveMenuItem("portfolio")}>
                        {collapsed ?
                            <LuFiles style={iconStyle} /> :
                            <>
                                <LuFiles style={iconStyle} />
                                <span className='menu-text'>Portfolio</span>
                            </>
                        }
                    </Link>
                </div>

                <div className={`menu-items ${activeMenuItem == 'goal' ? 'active' : ''}`}>
                    <Link to="/goal" onClick={() => setActiveMenuItem("goal")}>
                        {collapsed
                            ? <IoMdTimer style={iconStyle} /> :
                            <>
                                <IoMdTimer style={iconStyle} />
                                <span className='menu-text'>Goal</span>
                            </>
                        }
                    </Link>
                </div>

                <div className={`menu-items ${activeMenuItem == 'contactUs' ? 'active' : ''}`}>
                    <Link to="/contactUs" onClick={() => setActiveMenuItem("contactUs")}>
                        {collapsed
                            ? <MdOutlineConnectWithoutContact style={iconStyle} /> :
                            <>
                                <MdOutlineConnectWithoutContact style={iconStyle} />
                                <span className='menu-text'>Contact Us</span>
                            </>
                        }
                    </Link>
                </div>



                {/* Side bar footer */}
                <div className='sidebar-footer menu-items'>
                    <Link className='menu-text' to="/" onClick={() => performLogout()}>
                        {collapsed
                            ? <RiLogoutCircleRLine style={iconStyle} /> :
                            <>
                                <RiLogoutCircleRLine style={iconStyle} />
                                <span className='menu-text'>Log out</span>
                            </>
                        }
                    </Link>
                </div>
            </div>
        </div >
    );
}

export default Sidebar;

