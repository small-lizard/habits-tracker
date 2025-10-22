import './sideBar.css';
import { CalendarIcon, CheckSquareIcon } from "./Icons";
import { NavLink } from "react-router-dom";

export const LeftSideBar = () => (
    <div className="out">
        <nav className="nav">
            <ul className="nav-list">
                <li>
                    <NavLink to='/' className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>
                        <CheckSquareIcon />
                        <span className='nav-item-text'>This week</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/calendar' className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>
                        <CalendarIcon />
                        <span className='nav-item-text'>Calendar</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    </div>
);