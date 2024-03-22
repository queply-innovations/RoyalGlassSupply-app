import { UseModalProps } from '@/utils/Modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import UserInfoForm from './UserInfoForm';
import { useUserInfo } from '../context/UserInfoContext';
import UserInfoPerms from './UserInfoPerms';

interface UserInfoMainModalProps {
	onClose: UseModalProps['closeModal'];
}

export const UserInfoMainModal = ({ onClose }: UserInfoMainModalProps) => {
	const [openedTab, setOpenedTab] = useState('userinfo');
	// const { users, isFetching, progress, progress2, setSelectedUser } = useUserInfo();

	return (
		<>
			<Tabs
				defaultValue="userinfo"
				className="min-w-[42rem] max-w-2xl space-y-4"
				value={openedTab}
				onValueChange={value => setOpenedTab(value)}
			>
				<TabsList className="grid h-fit w-full grid-flow-row grid-cols-2 rounded-md bg-slate-200/50">
					<TabsTrigger
						value="userinfo"
						className="rounded-md py-1 text-sm font-semibold text-slate-700"
					>
						User Information
					</TabsTrigger>
					<TabsTrigger
						value="userperms"
						className="rounded-md py-1 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						User permissions
					</TabsTrigger>
				</TabsList>
				<TabsContent value="userinfo">
					<UserInfoForm onClose={onClose} setOpenedTab={setOpenedTab} />
				</TabsContent>
				<TabsContent value="userperms">
					<UserInfoPerms onClose={onClose} setOpenedTab={setOpenedTab} />
				</TabsContent>
			</Tabs>
		</>
	);
};
