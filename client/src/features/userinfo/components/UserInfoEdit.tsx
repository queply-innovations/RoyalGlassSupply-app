import { UseModalProps } from '@/utils/Modal';
import { Button, Inputbox, Loading } from '@/components';
import { formatUTCDate } from '@/utils/timeUtils';
import { useUserInfo } from '../context/UserInfoContext';
import { getRoles } from '../api/UserInfo';
import { useEffect, useState } from 'react';
import { Roles, User } from '../types';
import { useUserInfoMutation } from '../hooks';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

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
		password,
		compPassword,
		error,
		setError,
		success,
		handleSubmit,
		handleChange,
		handleChangeSelect,
	} = useUserInfoMutation(selectedUser, roles);

	// Pasword show state
	const [showPass, setShowPass] = useState<boolean>(false);
	const changeStat = () => {
		setShowPass(!showPass);
	};

	const [showPass2, setShowPass2] = useState<boolean>(false);
	const changeStat2 = () => {
		setShowPass2(!showPass2);
	};

	success && setTimeout(() => {
		onClose();
	}, 1000);
	
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
						<div className="flex flex-col col-span-3 gap-3">
							<label htmlFor="id">User ID</label>
							<Inputbox
								type="text"
								name="id"
								placeholder="User ID"
								className="inputbox"
								value={user.user_id}
								disabled
							/>
						</div>
						<div className="flex flex-col col-span-3 gap-3">
							<label htmlFor="firstname">First name</label>
							<Inputbox
								type="text"
								name="firstname"
								placeholder="First name"
								className="inputbox rounded-md bg-slate-100"
								value={user.firstname}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col col-span-3 gap-3">
							<label htmlFor="lastname">Last name</label>
							<Inputbox
								type="text"
								name="lastname"
								placeholder="Last name"
								className="inputbox rounded-md bg-slate-100"
								value={user.lastname}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col col-span-3 gap-3">
							<label htmlFor="username">Username</label>
							<Inputbox
								type="text"
								name="username"
								placeholder="Username"
								className="inputbox rounded-md bg-slate-100"
								value={user.username}
								onChange={handleChange}
								onKeyDown={(e) => { 
									if (e.code === 'Space') {
										e.preventDefault(); 
										setError("Space not allowed"); 
									} else {
										setError(null);
									}
								}}
							/>
						</div>
					</div>

					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-4">
						<div className="flex flex-col col-span-4 gap-3">
							<label htmlFor="email">Email address</label>
							<Inputbox
								type="email"
								name="email"
								placeholder="Email address"
								className="inputbox rounded-md bg-slate-100"
								value={user.email}
								onChange={handleChange}
								onKeyDown={(e) => { 
									if (e.code === 'Space') {
										e.preventDefault(); 
										setError("Space not allowed"); 
									} else {
										setError(null);
									}
								}}
							/>
						</div>
						<div className="flex flex-col col-span-4 gap-3">
							<label htmlFor="email">Contact number</label>
							<Inputbox
								type="number"
								name="contact_no"
								placeholder="09XXXXXXXXX"
								className="inputbox rounded-md bg-slate-100"
								value={user.contact_no}
								onChange={handleChange}
								onKeyDown={(e) => { 
									if (e.code === 'Space') {
										e.preventDefault(); 
										setError("Space not allowed"); 
									} else {
										setError(null);
									}
								}}
							/>
						</div>
						<div className="flex flex-col col-span-4 gap-3">
							<label htmlFor="position">Position</label>
							<Select
								onValueChange={value =>
									handleChangeSelect('position', value)
								}
							>
								<SelectTrigger
									name="position"
									className="flex flex-row items-center gap-3 truncate text-md rounded-md bg-slate-100"
								>
									<SelectValue placeholder={
										user.position ? 
											user.position.charAt(0).toUpperCase() +
											user.position.slice(1) :
										'Choose position...'
									} />
								</SelectTrigger>

								<SelectContent className="bg-white font-medium text-md">
									{roles.length > 0 ? (
										roles.map((role: Roles) => {
											if (role.title !== 'super_admin'){
												return (
													<SelectItem
														key={role.id}
														value={role.title}>
															{role.title.charAt(0).toUpperCase() + 
																role.title.slice(1)}
													</SelectItem>
												);
											}
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
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-4">
						<div className="flex flex-col col-span-6 gap-3">
							<label htmlFor="email">Change password (optional)</label>
							<div className="flex flex-row">
								<Inputbox
									type={showPass ? 'text' : 'password'}
									name="new_password"
									placeholder="New pasword"
									className="inputbox rounded-md bg-slate-100"
									value={password || ''}
									onChange={handleChange}
									onKeyDown={(e) => { 
										if (e.code === 'Space') {
											e.preventDefault(); 
											setError("Space not allowed"); 
										} else {
											setError(null);
										}
									}}
								/>
								{showPass ? (
									<Eye
										size={26}
										strokeWidth={1}
										className="relative flex flex-row mt-2 cursor-pointer"
										onClick={changeStat}
									/>
								) : (
									<EyeOff
										size={26}
										strokeWidth={1}
										className="relative flex flex-row mt-2 cursor-pointer"
										onClick={changeStat}
									/>
								)}
							</div>
						</div>
						<div className="flex flex-col col-span-6 gap-3">
							<label htmlFor="email">Confirm new password</label>
							<div className="flex flex-row">
								<Inputbox
									type={showPass2 ? 'text' : 'password'}
									name="confirm_password"
									placeholder="Confirm password"
									className="inputbox rounded-md bg-slate-100"
									value={compPassword}
									onChange={handleChange}
									onKeyDown={(e) => { 
										if (e.code === 'Space') {
											e.preventDefault(); 
											setError("Space not allowed"); 
										} else {
											setError(null);
										}
									}}
								/>
								{showPass2 ? (
									<Eye
										size={26}
										strokeWidth={1}
										className="relative flex flex-row mt-2 cursor-pointer"
										onClick={changeStat2}
									/>
								) : (
									<EyeOff
										size={26}
										strokeWidth={1}
										className="relative flex flex-row mt-2 cursor-pointer"
										onClick={changeStat2}
									/>
								)}
							</div>
						</div>
					</div>

					<div className="flex flex-row justify-center gap-1">
						<div className="mt-3 grid w-full grid-flow-row grid-cols-10 gap-4 text-center">
							<div className="flex flex-col col-span-5 items-start">
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
							<div className="flex flex-col col-span-5 gap-3 items-end">
								<div className="flex flex-row">
									<Button
										type="reset"
										fill={'default'}
										className="flex-1 py-2 text-sm font-bold text-gray-700 hover:text-white"
										onClick={onClose}
									>
										Cancel
									</Button>

									{isChanged && password === compPassword && (
										<Button
											type="submit"
											fill={isChanged ? 'green' : null}
											disabled={isChanged ? false : true}
											onClick={handleSubmit}
										>
											{!isSubmitting ? 'Edit User' : 'Submitting'}
										</Button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};