import { SidebarListItems } from '../types';
import {
  CircleUserRound,
  Clock,
  ArrowRightLeft,
  ExternalLink,
  Undo2,
  ClipboardList,
  Banknote,
  BarChartBig,
  Warehouse,
  Truck,
  Boxes,
  Laptop2,
  Calculator,
  BookUser,
  HandCoins,
} from 'lucide-react';

interface SidebarGroup {
  groupName?: string;
  items: SidebarListItems[];
}

export const SidebarRoutesGrouped: SidebarGroup[] = [
  {
    groupName: 'Operations',
    items: [
      {
        id: 'pendings',
        permissionId: [13],
        itemProps: {
          title: 'Pendings',
          icon: <Clock size={20} strokeWidth={1.75} />,
        },
        children: [
          {
            id: 'pending-inventory',
            permissionId: [13],
            path: '/pending/inventory',
            itemProps: {
              title: 'Pending Inventory',
            },
          },
          {
            id: 'pending-transfer',
            permissionId: [13],
            path: '/pending/transfer',
            itemProps: {
              title: 'Pending Transfer',
            },
          },
          {
            id: 'pending-return',
            permissionId: [13],
            path: '/pending/return',
            itemProps: {
              title: 'Pending Return',
            },
          },
          // {
          // 	id: 'pending-listing',
          // 	permissionId: [13],
          // 	path: '/pending/product-listing',
          // 	itemProps: {
          // 		title: 'Pending Listing',
          // 	},
          // },
        ],
      },
      {
        id: 'transactions',
        permissionId: [11],
        path: '/transaction',
        itemProps: {
          title: 'Transaction',
          icon: <HandCoins size={20} strokeWidth={1.75} />,
        },
      },
      // {
      //   id: 'transactions',
      //   permissionId: [11],
      //   itemProps: {
      //     title: 'Transactions',
      //     icon: <ArrowRightLeft size={20} strokeWidth={1.75} />,
      //   },
      //   children: [
      // {
      // 	id: 'transaction-return',
      // 	permissionId: [11, 17],
      // 	path: '/transaction/return',
      // 	itemProps: {
      // 		title: 'Transaction Return',
      // 	},
      // },
      // ],
      // },
      {
        id: 'inventories',
        permissionId: [18],
        path: '/inventory',
        itemProps: {
          title: 'Inventories',
          icon: <ClipboardList size={20} strokeWidth={1.75} />,
        },
      },
      {
        id: 'transfers',
        permissionId: [12],
        path: '/transfer',
        itemProps: {
          title: 'Transfers',
          icon: <ExternalLink size={20} strokeWidth={1.75} />,
        },
      },
      {
        id: 'returns',
        permissionId: [17],
        path: '/returns',
        itemProps: {
          title: 'Returns',
          icon: <Undo2 size={20} strokeWidth={1.75} />,
        },
      },
      {
        id: 'pos',
        permissionId: [25],
        path: '/pos',
        itemProps: {
          title: 'POS',
          icon: <Laptop2 size={20} strokeWidth={1.75} />,
        },
      },
    ],
  },
  {
    groupName: 'Management',
    items: [
      {
        id: 'users',
        permissionId: [9],
        itemProps: {
          title: 'Users',
          icon: <CircleUserRound size={20} strokeWidth={1.75} />,
        },
        children: [
          {
            id: 'user-information',
            permissionId: [9, 1, 3],
            path: '/user/information',
            itemProps: {
              title: 'User Information',
            },
          },
          {
            id: 'user-sales',
            permissionId: [9],
            path: '/user/sales',
            itemProps: {
              title: 'User Sales',
            },
          },
          {
            id: 'role-perms',
            permissionId: [9, 2],
            path: '/user/role-perms',
            itemProps: {
              title: 'Role Permissions',
            },
          },
        ],
      },
      {
        id: 'expenses',
        permissionId: [10],
        path: '/expenses',
        itemProps: {
          title: 'Expenses',
          icon: <Banknote size={20} strokeWidth={1.75} />,
        },
      },
      {
        id: 'customers',
        permissionId: [26],
        path: '/customers',
        itemProps: {
          title: 'Customers',
          icon: <BookUser size={20} strokeWidth={1.75} />,
        },
      },
      //TODO: add invoice page,
      // {
      // 	id: 'invoices',
      // 	permissionId: [10], //TODO EDIT PERMISSION ID
      // 	path: '/invoice',
      // 	itemProps: {
      // 		title: 'Invoices',
      // 		icon: <Calculator size={20} strokeWidth={1.75} />,
      // 	},
      // },
      {
        id: 'reports',
        permissionId: [19],
        path: '/reports',
        itemProps: {
          title: 'Reports',
          icon: <BarChartBig size={20} strokeWidth={1.75} />,
        },
      },
      {
        id: 'warehouses',
        permissionId: [14],
        path: '/warehouse',
        itemProps: {
          title: 'Warehouses',
          icon: <Warehouse size={20} strokeWidth={1.75} />,
        },
      },
      {
        id: 'suppliers',
        permissionId: [15],
        path: '/supplier',
        itemProps: {
          title: 'Suppliers',
          icon: <Truck size={20} strokeWidth={1.75} />,
        },
      },
      {
        id: 'products',
        permissionId: [16],
        itemProps: {
          title: 'Products',
          icon: <Boxes size={20} strokeWidth={1.75} />,
        },
        children: [
          {
            id: 'product-items',
            permissionId: [16],
            path: '/products',
            itemProps: {
              title: 'Product Items',
            },
          },
          {
            id: 'product-listings',
            permissionId: [16],
            path: '/products/listings',
            itemProps: {
              title: 'Product Listings',
            },
          },
        ],
      },
    ],
  },
];
