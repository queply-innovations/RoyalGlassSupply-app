import { Link } from 'react-router-dom';
import Logo from '/RGSLOGO.png';

const SidebarLogo = () => {
	return (
		<>
			<Link to="/dashboard">
				<img src={Logo} alt="RoyalGlassSupply-Logo" />
			</Link>
		</>
	);
};

export default SidebarLogo;
