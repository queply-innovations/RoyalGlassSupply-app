import { NavIcons } from './NavIcons';
import { HiUser } from 'react-icons/hi2';
import { GoHomeFill } from 'react-icons/go';
import { IoNotifications } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Inputbox } from '../Inputbox';
import { Button } from '..';
import { useAuth } from '@/context/AuthContext';

export const Navbar = () => {
	const { logout } = useAuth();
	return (
		// <div className="navbar-container flex flex-row items-end place-content-end justify-between">
			<div className="nav-icon flex flex-row items-end justify-end gap-x-5">
				<Link to="/dashboard">
					<NavIcons
						icon={
							<GoHomeFill className="text-primary-dark-gray text-xl" />
						}
						title={'Home'}
					/>
				</Link>
				<Link to="/Notifications">
					<NavIcons
						icon={
							<IoNotifications className="text-primary-dark-gray text-xl" />
						}
						title={'Notification'}
					/>
				</Link>
			</div>
		// </div>
	);
};
