import { UseModalProps } from '@/utils/Modal';
import { Button } from '@/components';
import { formatUTCDate } from '@/utils/timeUtils';
import { useUserInfo } from '../context/UserInfoContext';
import { getRoles } from '../api/UserInfo';
import { useEffect, useState } from 'react';
import { Roles } from '../types';

interface UserInfoProps {
	onClose: UseModalProps['closeModal'];
}

export const UserInfoEdit = ({ onClose }: UserInfoProps) => {
	const { selectedUser, roles } = useUserInfo();

	//TODO: onChange handler for the form
	//TODO: useUserInfoMutation in hooks

	return (
		<>
			<div className="flex flex-col gap-5">
				<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-4">
					<div className="flex flex-col col-span-3 gap-3">
						<label htmlFor="id">User ID</label>
						<input
							type="text"
							id="name"
							placeholder="User ID"
							className="inputbox"
							value={selectedUser.id}
						/>
					</div>
					<div className="flex flex-col col-span-3 gap-3">
						<label htmlFor="firstname">First name</label>
						<input
							type="text"
							id="firstname"
							placeholder="First name"
							className="inputbox"
							value={selectedUser.firstname}
						/>
					</div>
					<div className="flex flex-col col-span-3 gap-3">
						<label htmlFor="lastname">Last name</label>
						<input
							type="text"
							id="lastname"
							placeholder="Last name"
							className="inputbox"
							value={selectedUser.lastname}
						/>
					</div>
					<div className="flex flex-col col-span-3 gap-3">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							placeholder="Username"
							className="inputbox"
							value={selectedUser.username}
						/>
					</div>
				</div>

				<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-4">
					<div className="flex flex-col col-span-4 gap-3">
						<label htmlFor="email">Email address</label>
						<input
							type="email"
							id="email"
							placeholder="Email address"
							className="inputbox"
							value={selectedUser.email}
						/>
					</div>
					<div className="flex flex-col col-span-4 gap-3">
						<label htmlFor="email">Contact number</label>
						<input
							type="number"
							id="contact_no"
							placeholder="09XXXXXXXXX"
							className="inputbox"
							value={selectedUser.contact_no}
						/>
					</div>
					<div className="flex flex-col col-span-4 gap-3">
						<label htmlFor="position">Position</label>
						<select className="flex flex-col gap-5">
							{roles.map((role: Roles) => {
								return (
									role.title === selectedUser.position ? (
										<option 
											key={role.id} 
											value={role.title}
											selected
											>
											{role.title.charAt(0).toUpperCase() + 
											role.title.slice(1)}
										</option>
									) : (
										<option 
											key={role.id} 
											value={role.title}
											>
											{role.title.charAt(0).toUpperCase() + 
											role.title.slice(1)}
										</option>
									)
								);
							})}
						</select>
					</div>
				</div>
			</div>
		</>
	);
};
