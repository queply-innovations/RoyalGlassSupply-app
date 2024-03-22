import { Button, Inputbox } from '@/components';
import { UserInfoTable } from '@/features/userinfo/components/UserInfoTable';
import UserInfoForm from '@/features/userinfo/components/UserInfoForm';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { UserInfoProvider } from '@/features/userinfo/context/UserInfoContext';
import { User as IUserInfo } from '@/features/userinfo/types';
import { MainLayout } from '@/layouts/MainLayout';
import { useModal } from '@/utils/Modal';
import { useState } from 'react';
import { set } from 'react-hook-form';
import { UserInfoEdit } from '@/features/userinfo/components/UserInfoEdit';
import UserInfoPerms from '@/features/userinfo/components/UserInfoPerms';
// import { MainLayout } from '@/layouts/MainLayout';

export const UserInfo = () => {
	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');

	const openUserInfoModal = (users: IUserInfo, action: string) => {
		openModal();
		setModalAction(action);
	};

	const openUserPermsModal = (users: IUserInfo, action: string) => {
		openModal();
		setModalAction(action);
	};

	return (
		<>
			<MainLayout title="User Information">
				<UserInfoProvider>
					<div className="flex flex-auto flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<UserInfoTable openModal={openUserInfoModal}/>
						</div>
					</div>
					<ModalTest
						isOpen={isOpen}
						onClose={closeModal}
						title={
							modalAction === 'edit'
								? 'Edit User'
								: modalAction === 'add' 
									? 'Add User'
									: 'Edit User Role Permissions'
						}
					>
						<>
							{modalAction === 'add' && (
								<UserInfoForm
									onClose={closeModal}
								/>
							)}
							{modalAction === 'edit' && (
								<UserInfoEdit onClose={closeModal} />
								// <></>
							)}
							{modalAction === 'editPerms' && (
								<UserInfoPerms onClose={closeModal} />
								// <></>
							)}
						</>
					</ModalTest>
				</UserInfoProvider>
			</MainLayout>
		</>
	);
};
