import { Link } from 'react-router-dom';
import Logo from '/RGS-logo.png';

const SidebarLogo = () => {
	return (
		<>
			<div className="">
				<Link to="/dashboard">
					<img src={Logo} alt="RoyalGlassSupply-Logo" />
				</Link>
			</div>
		</>
	);
};

export default SidebarLogo;
