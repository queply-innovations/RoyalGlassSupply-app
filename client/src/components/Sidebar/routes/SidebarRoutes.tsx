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
				path: '/app/user/information',
				sidebarProps: {
					displayText: 'User Information',
				},
			},
			{
				path: '/app/user/sales',
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
				path: '/app/user/information',
				sidebarProps: {
					displayText: 'User Information',
				},
			},
			{
				path: '/app/user/sales',
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
				path: '/app/transaction',
				sidebarProps: {
					displayText: 'Transaction',
				},
			},
			{
				path: '/app/transaction/expenses',
				sidebarProps: {
					displayText: 'Expenses',
				},
			},
		],
	},
	{
		path: '/app/transfer',
		sidebarProps: {
			displayText: 'Transfer',
			icon: <TransferIcon />,
		},
	},
	{
		path: '/app/return',
		sidebarProps: {
			displayText: 'Return',
			icon: <ReturnIcon />,
		},
	},
	{
		path: '/app/inventory',
		sidebarProps: {
			displayText: 'Inventory',
			icon: <InventoryIcon />,
		},
	},
	{
		path: '/app/finance',
		sidebarProps: {
			displayText: 'Finance',
			icon: <FinanceIcon />,
		},
	},
	{
		path: '/app/reports',
		sidebarProps: {
			displayText: 'Reports',
			icon: <ReportIcon />,
		},
	},
	{
		path: '/app/warehouse',
		sidebarProps: {
			displayText: 'Warehouse',
			icon: <TransferIcon />,
		},
	},
	{
		path: '/app/supplier',
		sidebarProps: {
			displayText: 'Supplier',
			icon: <UserIcon />,
		},
	},
	{
		path: '/app/products',
		sidebarProps: {
			displayText: 'Products',
			icon: <InventoryIcon />,
		},
	},
];
