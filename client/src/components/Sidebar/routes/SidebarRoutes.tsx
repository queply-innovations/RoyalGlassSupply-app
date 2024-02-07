import { Dashboard } from '@/pages';
import { SidebarRoutes } from '../types';

const SidebarRoutes: SidebarRoutes[] = [
	{
		element: <Dashboard />,
		path: '/app/dashboard',
	},
];

export default SidebarRoutes;
