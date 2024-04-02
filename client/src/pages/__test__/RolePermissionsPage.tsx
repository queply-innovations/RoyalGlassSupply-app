import RolePermissionsForm from '@/features/userinfo/components/RolePermissionsForm2';
import { UserInfoProvider } from '@/features/userinfo/context/UserInfoContext';
import { MainLayout } from '@/layouts/MainLayout';

export const RolePermissions = () => {
	return (
		<>
			<MainLayout title="Role Permissions">
				<UserInfoProvider>
					<div className="flex h-full max-h-full flex-1 flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<RolePermissionsForm />
						</div>
					</div>
				</UserInfoProvider>
			</MainLayout>
		</>
	);
};
