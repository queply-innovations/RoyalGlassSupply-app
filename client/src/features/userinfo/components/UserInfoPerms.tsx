import { useEffect } from 'react';
import { Button, Inputbox, Selectbox, Loading } from '@/components';
import { Button as LegacyButton } from '@/components';
import { UseModalProps } from '@/utils/Modal';
import { useUserInfoAddition, useUserRoleMutation } from '../hooks';
import { useUserInfo } from '../context/UserInfoContext';
import { Roles, Permissions } from '../types';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface UserInfoPermsProps {
	onClose: UseModalProps['closeModal'];
}
const UserInfoPerms = ({
	onClose
}: UserInfoPermsProps) => {

	const { selectedUser } = useUserInfo();
	const { 
		permissions, 
		allPermissions, 
		permissionChange,
		isChanged, 
		isSubmitting, 
		error, 
		success, 
		handleChange, 
		handleSubmit 
	} = useUserRoleMutation();
	const { auth } = useAuth();
	const userMgmt = allPermissions.filter(o =>
		Object.keys(o).some(keyVal => 
			!o.title.includes("view".toLowerCase()) &&
			o.title.includes("users".toLowerCase())
		)
	);

	const prdctMgmt = allPermissions.filter(o =>
		Object.keys(o).some(keyVal => 
			!o.title.includes("view".toLowerCase()) &&
			o.title.includes("product".toLowerCase()) ||
			o.title.includes("catalog".toLowerCase())
		)
	);

	const viewMgmt = allPermissions.filter(o =>
		Object.keys(o).some(keyVal => 
			o.title.includes("view".toLowerCase())
		)
	);

	success && setTimeout(() => {
		onClose();
	}, 3000);

	return (
		<>
			<div className="flex flex-col grid-cols-12">
				<p className="text-xl font-bold">Current user role: { selectedUser.position.toUpperCase() }</p>
				{selectedUser.position === auth.role && (
					<div className="mt-3 grid w-full grid-flow-row grid-cols-6 gap-4">
						<div className="flex flex-col col-span-6 font-bold text-red-700 text-start">
							Warning: Be careful! You are editing a user with the same role as you.
							<br />
							You are at risk of locking yourself out.
						</div>
					</div>
				)}
				<br />
				<p className="text-lg">
					Note: After saving changes, the affected user(s) need to log out 
					<br />
					and log in again for changes to take effect.
				</p>
				<br />

				<div className="flex flex-col col-span-12">
					
					<p className="text-lg">	User Management </p>

					<div className="flex flex-row mt-4 mx-2 justify-evenly">
						
						{userMgmt.length === 0 ? (
							<div className="flex flex-col items-center">
								<Loader2 
									size={28}
									strokeWidth={2}
									className="animate-spin" />
							</div>
						) : userMgmt.map((perm, index) => {
							return (
								<div key={index} className="flex rounded-lg items-center content-center p-2">
									<input 
										className="w-5 h-5 mr-2" 
										type="checkbox" 
										name={perm.title} 
										value={perm.id} 
										onChange={handleChange}
										checked={
											permissionChange.some((perms) => {
												return perms.permission_id === perm.id ? true : false
											})
										}
										/>
									<label htmlFor={perm.title} className="self-center">{perm.title}</label>
								</div>
							);
						})}

					</div>
				</div>
				<hr className="my-2 h-px w-full border-0 bg-gray-800" />
				
				<div className="flex flex-col col-span-12">

					<p className="text-lg">	Products </p>

					<div className="flex flex-row flex-wrap mt-4 mx-2 justify-evenly">

						{prdctMgmt.length === 0 ? (
							<div className="flex flex-col items-center">
								<Loader2 
									size={28}
									strokeWidth={2}
									className="animate-spin" />
							</div>
						) : prdctMgmt.map((perm, index) => {
							const check = permissionChange.some((perms) => {
								return perms.permission_id === perm.id ? true : false
							});
							return (
								<div key={index} className="flex rounded-lg items-center content-center p-2">
									<input 
										className="w-5 h-5 mr-2" 
										type="checkbox" 
										name={perm.title} 
										value={perm.id} 
										onChange={handleChange}
										checked={check}
										/>
									<label htmlFor={perm.title} className="self-center">{perm.title}</label>
								</div>
							);
						})}

					</div>
				</div>
				<hr className="my-2 h-px w-full border-0 bg-gray-800" />

				<div className="flex flex-col col-span-12">

					<p className="text-lg">	Views </p>

					<div className="flex flex-row flex-wrap mt-4 mx-2 justify-evenly">

						{viewMgmt.length === 0 ? (
							<div className="flex flex-col items-center">
								<Loader2 
									size={28}
									strokeWidth={2}
									className="animate-spin" />
							</div>
						) : viewMgmt.map((perm, index) => {
							const check = permissionChange.some((perms) => {
								return perms.permission_id === perm.id ? true : false
							});
							return (
								<div key={index} className="flex rounded-lg items-center content-center p-2">
									<input 
										className="w-5 h-5 mr-2" 
										type="checkbox" 
										name={perm.title} 
										value={perm.id} 
										onChange={handleChange}
										checked={check}
										/>
									<label htmlFor={perm.title} className="self-center">{perm.title}</label>
								</div>
							);
						})}

					</div>
				</div>
				<hr className="my-2 h-px w-full border-0 bg-gray-800" />
			</div>

			<div className="flex flex-row justify-center gap-1">
				<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-4 text-center">
					<div className="flex flex-col col-span-3 gap-3">
						<Button
							type="submit"
							fill={isChanged ? 'green' : null}
							// fill={'green'}
							disabled={isChanged ? false : true}
							onClick={handleSubmit}
						>
							{!isSubmitting ? 'Edit Permission' : 'Submitting'}
						</Button>
					</div>
					<div className="flex flex-col col-span-6 items-start align-center">
						{success && (
							<div className="font-bold text-green-700">{success}</div>
						)}
						{error && (
							<div className="font-bold text-red-700">{error}</div>
						)}
						{!isSubmitting ? '' : 
							<div className="flex flex-col flex-wrap items-start"> 
								<Loading width={30} height={30} /> 
							</div> }
					</div>
					<div className="flex flex-col col-span-3 gap-3 items-end">
						<Button
							type="reset"
							fill={'red'}
							onClick={onClose}
						>
							Cancel
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
export default UserInfoPerms;