/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode } from 'react';
import FinanceIcon from '@assets/icons/iconFinance';
import InventoryIcon from '@assets/icons/iconInventory';
import PendingIcon from '@assets/icons/iconPending';
import ReportIcon from '@assets/icons/iconReports';
import ReturnIcon from '@assets/icons/iconReturn';
import TransactionIcon from '@assets/icons/iconTransaction';
import TransferIcon from '@assets/icons/iconTransfer';
import UserIcon from '@assets/icons/iconUser';

export const SidebarData = [
	{
		title: 'User',
		icon: <UserIcon />,
		subMenu: [
			{
				title: 'User Information',
				link: '/user/information',
			},
			{
				title: 'User Sales',
				link: '/user/sales',
			},
		],
	},
	{
		title: 'Pending',
		icon: <PendingIcon />,
		subMenu: [
			{
				title: 'Pending Inventory',
				link: '/pending/pendinginventory',
			},
			{
				title: 'Pending Transfer',
				link: '/pending/pendingtransfer',
			},
			{
				title: 'Pending Return',
				link: '/pending/pendingreturn',
			},
		],
	},
	{
		title: 'Transaction',
		icon: <TransactionIcon />,
		subMenu: [
			{
				title: 'Transaction',
				link: '/transactions/transaction',
			},
			{
				title: 'Expenses',
				link: '/transactions/expenses',
			},
		],
	},
	{
		title: 'Transfer',
		icon: <TransferIcon />,
		link: '/transfer',
	},
	{
		title: 'Return',
		icon: <ReturnIcon />,
		link: '/return',
	},
	{
		title: 'Inventory',
		icon: <InventoryIcon />,
		link: '/inventory',
	},
	{
		title: 'Finance',
		icon: <FinanceIcon />,
		link: '/finance',
	},
	{
		title: 'Reports',
		icon: <ReportIcon />,
		link: '/reports',
	},
	{
		title: 'Warehouse',
		icon: <TransferIcon />,
		link: '/warehouse',
	},
	{
		title: 'Supplier',
		icon: <UserIcon />,
		link: '/supplier',
	},
	{
		title: 'Products',
		icon: <InventoryIcon />,
		link: '/products',
	},
];

export default SidebarData;
