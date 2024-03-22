import { useEffect } from 'react';
import { Button, Inputbox, Selectbox, Loading } from '@/components';
import { Button as LegacyButton } from '@/components';
import { useRoleInfoMutation } from '../hooks';
import { Roles, Permissions } from '../types';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const RolePermissionsForm = () => {

	const { 
		roles,
		roleSelect,
		permissions, 
		allPermissions, 
		permissionChange,
		roleId,
		isChanged, 
		isSubmitting, 
		error, 
		success, 
		handleChange, 
		handleChangeSelect,
		handleSubmit 
	} = useRoleInfoMutation();
	const { auth } = useAuth();

	// console.log(permissions);
	// console.log(allPermissions);

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

	return (
		<>
			<div className="flex flex-col">
				<div className="flex flex-row mt-4 ml-4 justify-between">
					<Select
						onValueChange={value => handleChangeSelect('roles', value)}
						name="roles"
						value={roleSelect?.title || ''}
					>
						<SelectTrigger
							name="roles"
							className="flex flex-row items-left bg-white text-2xl w-72 h-auto drop-shadow-md"
						>
							<SelectValue placeholder={
								roleSelect?.title ?
								roleSelect?.title.charAt(0).toUpperCase() +
								roleSelect?.title.slice(1) 
								: 'Choose role...'
							} />
							<SelectContent className="bg-white font-medium">
								{roles ? roles.map((role: Roles) => (
									<SelectItem
										value={role.title}
										key={role.id}
										className="text-xl font-medium text-slate-700"
									>
										{role.title.charAt(0).toUpperCase() + role.title.slice(1)}
									</SelectItem>
								)) : (
									<div className="flex flex-col items-center">
										<Loader2 
											size={28}
											strokeWidth={2}
											className="animate-spin" />
									</div>
								)}
							</SelectContent>
						</SelectTrigger>
					</Select>

					<div className="flex flex-row items-center align-center text-lg">
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

					<div className="flex flex-row justify-end items-center">
						<Button
							type="submit"
							className={
								`rounded-md w-[250px] h-[56px] 
								${isChanged ? `bg-login-button hover:bg-blue-950` : `hidden`} 
								font-extrabold uppercase`}
							disabled={isChanged ? false : true}
							onClick={handleSubmit}
						>
							{!isSubmitting ? 'Apply changes' : 'Submitting'}
						</Button>
					</div>
				</div>
			</div>
			<div className={`flex flex-col grid-cols-12 mx-8 ${roleId === 0 ? 'blur-sm' : 'blur-none'}`}>
				
				{roleSelect?.title === auth.role && (
					<div className="mt-3 grid w-full grid-flow-row grid-cols-6 gap-4">
						<div className="flex flex-col col-span-6 font-bold text-red-700 text-start text-lg">
							Warning: Be careful! You are editing the role which you have right now. 
							You are at risk of locking yourself out.
						</div>
					</div>
				)}

				<br />
				<p className="text-xl">
					Note: After saving changes, the affected user(s) need to log out and log in again for changes to take effect.
				</p>
				<br />

				<div className="flex flex-col col-span-12 mx-4">
					
					<p className="text-2xl"> User Management </p>

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
								<div key={index} className="flex rounded-lg text-xl items-center content-center p-4">
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
				
				<div className="flex flex-col col-span-12 mx-4">

					<p className="text-2xl"> Products </p>

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
								<div key={index} className="flex rounded-lg text-xl items-center content-center p-4">
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

				<div className="flex flex-col col-span-12 mx-4">

					<p className="text-2xl"> Views </p>

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
								<div key={index} className="flex rounded-lg text-xl items-center content-center p-4">
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
		</>
	);
};
export default RolePermissionsForm;