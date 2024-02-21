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
		allowedRoles: ['super_admin', 'admin', 'manager'],
		sidebarProps: {
			displayText: 'User',
			icon: <UserIcon />,
		},
		child: [
			{
				allowedRoles: ['super_admin', 'admin', 'manager'],
				path: '/user/information',
				sidebarProps: {
					displayText: 'User Information',
				},
			},
			{
				allowedRoles: ['super_admin', 'admin', 'manager'],
				path: '/user/sales',
				sidebarProps: {
					displayText: 'User Sales',
				},
			},
		],
	},
	{
		allowedRoles: ['super_admin', 'admin', 'manager'],
		sidebarProps: {
			displayText: 'Pending',
			icon: <PendingIcon />,
		},
		child: [
			{
				allowedRoles: ['super_admin', 'admin', 'manager'],
				path: '/pending/inventory',
				sidebarProps: {
					displayText: 'Pending Inventory',
				},
			},
			{
				allowedRoles: ['super_admin', 'admin', 'manager'],
				path: '/pending/transfer',
				sidebarProps: {
					displayText: 'Pending Transfer',
				},
			},
			{
				allowedRoles: ['super_admin', 'admin', 'manager'],
				path: '/pending/return',
				sidebarProps: {
					displayText: 'Pending Return',
				},
			},
		],
	},
	{
		allowedRoles: [
			'super_admin',
			'admin',
			'manager',
			'encoder',
			'sales_person',
		],
		sidebarProps: {
			displayText: 'Transaction',
			icon: <TransactionIcon />,
		},
		child: [
			{
				allowedRoles: [
					'super_admin',
					'admin',
					'manager',
					'encoder',
					'sales_person',
				],
				path: '/transaction',
				sidebarProps: {
					displayText: 'Transaction',
				},
			},
			{
				allowedRoles: ['super_admin', 'admin'],
				path: '/transaction/expenses',
				sidebarProps: {
					displayText: 'Expenses',
				},
			},
		],
	},
	{
		allowedRoles: ['super_admin', 'admin', 'manager', 'encoder'],
		path: '/transfer',
		sidebarProps: {
			displayText: 'Transfer',
			icon: <TransferIcon />,
		},
	},
	{
		allowedRoles: [
			'super_admin',
			'admin',
			'manager',
			'encoder',
			'sales_person',
		],
		path: '/return',
		sidebarProps: {
			displayText: 'Return',
			icon: <ReturnIcon />,
		},
	},
	{
		allowedRoles: ['super_admin', 'admin', 'manager', 'encoder'],
		path: '/inventory',
		sidebarProps: {
			displayText: 'Inventory',
			icon: <InventoryIcon />,
		},
	},
	{
		allowedRoles: ['super_admin', 'admin', 'manager'],
		path: '/finance',
		sidebarProps: {
			displayText: 'Finance',
			icon: <FinanceIcon />,
		},
	},
	{
		allowedRoles: ['super_admin', 'admin', 'manager'],
		path: '/reports',
		sidebarProps: {
			displayText: 'Reports',
			icon: <ReportIcon />,
		},
	},
	{
		allowedRoles: ['super_admin', 'admin'],
		path: '/warehouse',
		sidebarProps: {
			displayText: 'Warehouse',
			icon: <TransferIcon />,
		},
	},
	{
		allowedRoles: ['super_admin', 'admin'],
		path: '/supplier',
		sidebarProps: {
			displayText: 'Supplier',
			icon: <UserIcon />,
		},
	},
	{
		allowedRoles: ['super_admin', 'admin', 'manager', 'encoder'],
		path: '/products',
		sidebarProps: {
			displayText: 'Products',
			icon: <InventoryIcon />,
		},
	},
];
