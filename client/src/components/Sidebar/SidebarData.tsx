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
				link: '/app/user/information',
			},
			{
				title: 'User Sales',
				link: '/app/user/sales',
			},
		],
	},
	{
		title: 'Pending',
		icon: <PendingIcon />,
		subMenu: [
			{
				title: 'Pending Inventory',
				link: '/app/pending/inventory',
			},
			{
				title: 'Pending Transfer',
				link: '/app/pending/transfer',
			},
			{
				title: 'Pending Return',
				link: '/app/pending/return',
			},
		],
	},
	{
		title: 'Transaction',
		icon: <TransactionIcon />,
		subMenu: [
			{
				title: 'Transaction',
				link: '/app/transaction',
			},
			{
				title: 'Expenses',
				link: '/app/transaction/expenses',
			},
		],
	},
	{
		title: 'Transfer',
		icon: <TransferIcon />,
		link: '/app/transfer',
	},
	{
		title: 'Return',
		icon: <ReturnIcon />,
		link: '/app/return',
	},
	{
		title: 'Inventory',
		icon: <InventoryIcon />,
		link: '/app/inventory',
	},
	{
		title: 'Finance',
		icon: <FinanceIcon />,
		link: '/app/finance',
	},
	{
		title: 'Reports',
		icon: <ReportIcon />,
		link: '/app/reports',
	},
	{
		title: 'Warehouse',
		icon: <TransferIcon />,
		link: '/app/warehouse',
	},
	{
		title: 'Supplier',
		icon: <UserIcon />,
		link: '/app/supplier',
	},
	{
		title: 'Products',
		icon: <InventoryIcon />,
		link: '/app/products',
	},
];

export default SidebarData;
