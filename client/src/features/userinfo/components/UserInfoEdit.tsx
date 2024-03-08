import { UseModalProps } from '@/utils/Modal';
import { Button, Loading } from '@/components';
import { formatUTCDate } from '@/utils/timeUtils';
import { useUserInfo } from '../context/UserInfoContext';
import { getRoles } from '../api/UserInfo';
import { useEffect, useState } from 'react';
import { Roles, User } from '../types';
import { useUserInfoMutation } from '../hooks';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface UserInfoProps {
	onClose: UseModalProps['closeModal'];
}

export const UserInfoEdit = ({ onClose }: UserInfoProps) => {
	const { selectedUser, roles } = useUserInfo();
	const { auth } = useAuth();

	const {
		user,
		isChanged,
		isSubmitting,
		error,
		success,
		handleSubmit,
		handleChange,
	} = useUserInfoMutation(selectedUser, roles);

	return (
		<>
			{selectedUser.id === auth.user.id && (
				<div className="mt-3 grid w-full grid-flow-row grid-cols-6 gap-4">
					<div className="flex flex-col col-span-6 font-bold text-red-700 text-start">
						Warning: Be careful! You are editing your own account.
						<br />
						You are at risk of locking yourself out.
					</div>
				</div>
			)}
			<form
				onSubmit={async e => {e.preventDefault(); handleSubmit;}}
			>
				<div className="flex flex-col gap-5">
					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-4">
						<div className="flex flex-col col-span-4 gap-3">
							<label htmlFor="id" className="text-sm font-bold uppercase">User ID</label>
							<input
								type="text"
								name="id"
								placeholder="User ID"
								className="inputbox"
								value={user.user_id}
								disabled
							/>
						</div>
						<div className="flex flex-col col-span-4 gap-3">
							<label htmlFor="firstname" className="text-sm font-bold uppercase">First name</label>
							<input
								type="text"
								name="firstname"
								placeholder="First name"
								className="inputbox"
								value={user.firstname}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col col-span-4 gap-3">
							<label htmlFor="lastname" className="text-sm font-bold uppercase">Last name</label>
							<input
								type="text"
								name="lastname"
								placeholder="Last name"
								className="inputbox"
								value={user.lastname}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-4">
						<div className="flex flex-col col-span-4 gap-3">
							<label htmlFor="username" className="text-sm font-bold uppercase">Username</label>
							<input
								type="text"
								name="username"
								placeholder="Username"
								className="inputbox"
								value={user.username}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col col-span-4 gap-3">
							<label htmlFor="email" className="text-sm font-bold uppercase">Email address</label>
							<input
								type="email"
								name="email"
								placeholder="Email address"
								className="inputbox"
								value={user.email}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col col-span-4 gap-3">
							<label htmlFor="email" className="text-sm font-bold uppercase">Contact number</label>
							<input
								type="number"
								name="contact_no"
								placeholder="09XXXXXXXXX"
								className="inputbox"
								value={user.contact_no}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div>
						<label htmlFor="position" className="text-sm font-bold uppercase">Position</label>
						<div id="position" className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-4">
							{/* TODO: set array for collecting of all checked positions???? */}
							{roles ? (
								roles.map((role: Roles) => {
									const spanning = 12/roles.length;
									const cn = `flex flex-row col-span-${spanning} gap-3`;
									return (
										<div className={cn} key={role.id + role.title}>
											<input 
												type="checkbox" 
												key={role.id} 
												name={role.title} 
												value={role.title}
												defaultChecked={
													role.title.toLowerCase().replace(/[\s_]/g, '') === 
													user.position.toLowerCase().replace(/[\s_]/g, '')
													} 
												
												/>
											<label htmlFor={role.title}>
												{role.title.charAt(0).toUpperCase() + 
												role.title.slice(1).replace(/_/g, '')}
											</label>
										</div>
									);
								})
							) : (
								<div className="flex h-12 w-full items-center justify-center">
									<Loader2
										size={22}
										strokeWidth={2.5}
										className="animate-spin text-slate-700/50"
									/>
								</div>
							)}
						</div>
					</div>
					
					<div className="mt-3 grid w-full grid-flow-row grid-cols-8 gap-4 text-center">
						<div className="flex flex-col col-span-2 gap-3">
							<Button
								type="submit"
								fill={isChanged ? 'green' : null}
								disabled={isChanged ? false : true}
								onClick={handleSubmit}
							>
								{!isSubmitting ? 'Edit User' : 'Submitting'}
							</Button>
						</div>
						<div className="flex flex-col col-span-3 items-start">
							{success && (
								<div className="font-bold text-green-700">{success}</div>
							)}
							{error && (
								<div className="font-bold text-red-700">{error}</div>
							)}
							{!isSubmitting ? '' : 
								<div className="flex flex-col flex-wrap items-start"> 
									<Loading width={30} height={30} /> 
								</div>}
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
			</form>
		</>
	);
};
