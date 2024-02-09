import {
	FinanceIcon,
	InventoryIcon,
	PendingIcon,
	ReportIcon,
	ReturnIcon,
	TransactionIcon,
	TransferIcon,
	UserIcon,
} from '@/assets/icons';
import { SidebarRoutes } from '../types';

export const SidebarRoute: SidebarRoutes[] = [
	{
		sidebarProps: {
			displayText: 'User',
			icon: <UserIcon />,
		},
		child: [
			{
				path: '/user/information',
				sidebarProps: {
					displayText: 'User Information',
				},
			},
			{
				path: '/user/sales',
				sidebarProps: {
					displayText: 'User Sales',
				},
			},
		],
	},
	{
		sidebarProps: {
			displayText: 'Pending',
			icon: <PendingIcon />,
		},
		child: [
			{
				path: '/user/information',
				sidebarProps: {
					displayText: 'User Information',
				},
			},
			{
				path: '/user/sales',
				sidebarProps: {
					displayText: 'User Sales',
				},
			},
		],
	},
	{
		sidebarProps: {
			displayText: 'Transaction',
			icon: <TransactionIcon />,
		},
		child: [
			{
				path: '/transaction',
				sidebarProps: {
					displayText: 'Transaction',
				},
			},
			{
				path: '/transaction/expenses',
				sidebarProps: {
					displayText: 'Expenses',
				},
			},
		],
	},
	{
		path: '/transfer',
		sidebarProps: {
			displayText: 'Transfer',
			icon: <TransferIcon />,
		},
	},
	{
		path: '/return',
		sidebarProps: {
			displayText: 'Return',
			icon: <ReturnIcon />,
		},
	},
	{
		path: '/inventory',
		sidebarProps: {
			displayText: 'Inventory',
			icon: <InventoryIcon />,
		},
	},
	{
		path: '/finance',
		sidebarProps: {
			displayText: 'Finance',
			icon: <FinanceIcon />,
		},
	},
	{
		path: '/reports',
		sidebarProps: {
			displayText: 'Reports',
			icon: <ReportIcon />,
		},
	},
];
