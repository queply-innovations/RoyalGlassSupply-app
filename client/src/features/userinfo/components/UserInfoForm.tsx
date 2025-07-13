import { useEffect } from 'react';
import { Button, Inputbox, Selectbox, Loading } from '@/components';
import { UseModalProps } from '@/utils/Modal';
// import { useWarehouse } from '..';
// import { addWarehouse, updateWarehouse } from '../api/Warehouse';
import { useUserInfoAddition } from '../hooks';
import { useUserInfo } from '../context/UserInfoContext';
import { Roles } from '../types';
import { Loader2 } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface UserInfoFormProps {
	isUpdate?: boolean;
	onClose: UseModalProps['closeModal'];
	isDelete?: boolean;
}
const UserInfoForm = ({
	onClose,
}: UserInfoFormProps) => {
	const {
		user,
		isChanged,
		isSubmitting,
		error,
		setError,
		success,
		handleSubmit,
		handleChange,
		handleChangeSelect
	} = useUserInfoAddition();
	// TODO: Need to handle setValue when isUpdate and isDelete is true to pass data to form
	// TODO: maybe need to pass UserInfoData selected from Context to setValue
	//TODO: Check what's wrong with form when filling up values
	const { roles } = useUserInfo();
	const rolesFilter = roles?.filter((role: Roles) => role.title !== "super_admin");
	const rolesArr: string[] = rolesFilter ? rolesFilter.map((role: Roles) => 
			role.title.replace("_", " ")
		) : [];

	success && setTimeout(() => {
		onClose();
	}, 1000);

	
	return (
		<>
			<form
				onSubmit={e => {
					e.preventDefault();
				}}
			>
				<div className="flex flex-col gap-5">
					<div className="flex flex-row gap-3">
						<div className="flex flex-col gap-1">
							<span className="text-sm font-bold uppercase">
								User ID
							</span>
							<Inputbox
								name="id"
								value={user.id}
								type="number"
								disabled
								readOnly
							/>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-bold uppercase">
								User First Name
							</span>
							<Inputbox
								name="firstname"
								placeholder="User First Name"
								value={user.firstname || ''}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-bold uppercase">
								User Last Name
							</span>
							<Inputbox
								name="lastname"
								placeholder="User Last Name"
								value={user.lastname || ''}
								onChange={handleChange}
								required
							/>
						</div>
					</div>

					<div className="flex flex-row gap-3">
						<div className="flex flex-col gap-1">
							<span className="text-sm font-bold uppercase">
								User Email Address
							</span>
							<Inputbox
								name="email"
								placeholder="User Email Address"
								type="email"
								value={user.email || ''}
								onChange={handleChange}
								onKeyDown={(e) => { 
									if (e.code === 'Space') {
										e.preventDefault(); 
										setError("Space not allowed"); 
									} else {
										setError(null);
									}
								}}
								required
							/>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-bold uppercase">
								User Contact Number
							</span>
							<Inputbox
								name="contact_no"
								placeholder="User Contact Number"
								type="number"
								value={user.contact_no || ''}
								onChange={handleChange}
								onKeyDown={(e) => { 
									if (e.code === 'Space') {
										e.preventDefault(); 
										setError("Space not allowed"); 
									} else {
										setError(null);
									}
								}}
								required
							/>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-bold uppercase">
								User Position
							</span>
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
									{roles?.length > 0 ? (
										roles.map((role: Roles) => {
											if (role.title !== 'super_admin'){
												return (
													<SelectItem
														key={role.id}
														value={role.title}>
															{role.title.charAt(0).toUpperCase() + 
																role.title.slice(1).replace("_", " ")}
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

					<div className="flex flex-row gap-3">
						<div className="flex flex-col gap-1">
							<span className="text-sm font-bold uppercase">
								User Username
							</span>
							<Inputbox
								name="username"
								placeholder="User Username"
								type="string"
								value={user.username || ''}
								onChange={handleChange}
								onKeyDown={(e) => { 
									if (e.code === 'Space') {
										e.preventDefault(); 
										setError("Space not allowed"); 
									} else {
										setError(null);
									}
								}}
								required
							/>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-bold uppercase">
								User Password
							</span>
							<Inputbox
								name="password"
								placeholder="User Password"
								type="password"
								value={user.password || ''}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm font-bold uppercase">
								Confirm Password
							</span>
							<Inputbox
								name="password_confirmation"
								placeholder="Confirm Password"
								type="password"
								value={user.password_confirmation || ''}
								onChange={handleChange}
								required
							/>
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
								<div className="flex flex-row gap-4">
									<Button
										type="reset"
										fill={'default'}
										className="flex-1 py-2 text-sm font-bold text-gray-700 hover:text-white"
										onClick={onClose}
									>
										Cancel
									</Button>

									{isChanged && (<Button
										type="submit"
										fill={'green'}
										onClick={handleSubmit}
									>
										{!isSubmitting ? 'Add User' : 'Submitting'}
									</Button>)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};
export default UserInfoForm;