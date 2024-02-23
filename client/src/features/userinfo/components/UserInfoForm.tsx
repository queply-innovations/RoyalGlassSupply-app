//TODO: ADD FORM FOR FILL UP HERE
import { useEffect } from 'react';
import { Button, Inputbox } from '@/components';
import { UseModalProps } from '@/utils/Modal';
// import { useWarehouse } from '..';
// import { addWarehouse, updateWarehouse } from '../api/Warehouse';
import { useUserInfoMutation } from '../hooks';

interface UserInfoFormProps {
	isUpdate?: boolean;
	onClose: UseModalProps['closeModal'];
	isDelete?: boolean;
}

const UserInfoForm = ({
	onClose,
}: UserInfoFormProps) => {
	const {
		value: userInfoForm,
		setValue: setUserInfoForm,
		handleChange,
		addUserMutation,
	} = useUserInfoMutation();

	// TODO: Need to handle setValue when isUpdate and isDelete is true to pass data to form
	// TODO: maybe need to pass UserInfoData selected from Context to setValue

	const handleSubmit = async () => {
		console.log('userInfoForm:', userInfoForm);
		try {
			await new Promise(resolve => setTimeout(resolve, 1000));
			// * call addUserMutation to Add User
			await addUserMutation(userInfoForm);
			onClose();
		} catch (error) {
			console.error('User Data submission failed', error);
		}
	};

	//TODO: Check what's wrong with form when filling up values

	return (
		<>
			<>
				<form
					onSubmit={e => {
						e.preventDefault();
						handleSubmit();
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
									value={userInfoForm?.id || 0}
									type="number"
									disabled={true}
								/>
							</div>
							<div className="flex flex-col gap-1">
								<span className="text-sm font-bold uppercase">
									User First Name
								</span>
								<Inputbox
									name="firstName"
									placeholder="User First Name"
									value={userInfoForm?.firstName || ''}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="flex flex-col gap-1">
								<span className="text-sm font-bold uppercase">
									User Last Name
								</span>
								<Inputbox
									name="lastName"
									placeholder="User Last Name"
									value={userInfoForm?.lastName || ''}
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
									type="string"
									value={userInfoForm?.email || ''}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="flex flex-col gap-1">
								<span className="text-sm font-bold uppercase">
									User Contact Number
								</span>
								<Inputbox
									name="contactNumber"
									placeholder="User Contact Number"
									type="string"
									value={userInfoForm?.contactNumber || ''}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="flex flex-col gap-1">
								<span className="text-sm font-bold uppercase">
									User Position
								</span>
								<Inputbox
									name="posiiton"
									placeholder="User Position"
									type="string"
									value={userInfoForm?.position || ''}
									onChange={handleChange}
									required
								/>
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
									value={userInfoForm?.username || ''}
									onChange={handleChange}
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
									value={userInfoForm?.password || ''}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="flex flex-col gap-1">
								<span className="text-sm font-bold uppercase">
									Confirm Password
								</span>
								<Inputbox
									name="password"
									placeholder="Confirm Password"
									type="password"
									value={''}
									onChange={handleChange}
									required
								/>
							</div>
						</div>
						
						<div className="flex flex-row justify-center gap-1">
							<Button
								fill={'green'}
								className=""
								type="submit"
								// onClick={handleSubmit}
							>
								{'Add Warehouse'}
							</Button>
							<Button
								fill={'red'}
								className=""
								onClick={onClose}
								type="reset"
							>
								Cancel
							</Button>
							<Button
								onClick={() => console.log(userInfoForm)}
								type="button"
							>
								console form
							</Button>
						</div>
					</div>
				</form>
			</>
		</>
	);
};

export default UserInfoForm;
