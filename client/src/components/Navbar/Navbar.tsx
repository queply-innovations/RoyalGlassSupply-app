import { NavIcons } from './NavIcons';
import { HiUser } from 'react-icons/hi2';
import { GoHomeFill } from 'react-icons/go';
import { IoNotifications } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Inputbox } from '../Inputbox';

export const Navbar = () => {
	return (
		<div className="navbar-container flex flex-row items-center justify-between">
			<Inputbox
				variant={'searchbar'}
				buttonIcon={'outside'}
				placeholder="Search"
				className="w-1/2"
			/>
			<div className="nav-icon flex flex-row items-center justify-center gap-x-5">
				<Link to="/Dashboard">
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
				<NavIcons
					icon={<HiUser className="text-primary-dark-gray text-xl" />}
					title={'Account'}
					dropdown={true}
				/>
			</div>
		</div>
	);
};
