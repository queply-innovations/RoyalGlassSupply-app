import { Roles, Permissions } from '../types';
import { useRoleInfoMutation } from '../hooks';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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
		handleSubmit,
	} = useRoleInfoMutation();
	const { auth } = useAuth();

	const userMgmt = allPermissions.filter(o =>
		Object.keys(o).some(
			keyVal =>
				!o.title.includes('view'.toLowerCase()) &&
				o.title.includes('users'.toLowerCase()),
		),
	);

	const prdctMgmt = allPermissions.filter(o =>
		Object.keys(o).some(
			keyVal =>
				(!o.title.includes('view'.toLowerCase()) &&
					!o.title.includes('transfer'.toLowerCase()) &&
					o.title.includes('product'.toLowerCase())) ||
				o.title.includes('catalog'.toLowerCase()),
		),
	);

	const trnfrMgmt = allPermissions.filter(o =>
		Object.keys(o).some(
			keyVal =>
				!o.title.includes('view'.toLowerCase()) &&
				o.title.includes('transfer'.toLowerCase()),
		),
	);

	const viewMgmt = allPermissions.filter(o =>
		Object.keys(o).some(keyVal => o.title.includes('view'.toLowerCase())),
	);

	// ! Returns error 500 when submitting only 1 change?

	// ? Maybe, when roleSelect is super_admin or admin,
	// ? user management toggles should be disabled

	return (
		<>
			<div className="mx-auto flex h-full max-h-full w-full flex-row divide-x">
				<div className="flex w-60 flex-none flex-col p-2 pt-8">
					<h3 className="ml-4 pb-1 text-xs font-semibold text-slate-500/80">
						Roles
					</h3>
					<div className="w-full">
						{roles ? (
							roles.map(
								(role: Roles) =>
									role.title !== 'super_admin' && (
										<Button
											key={role.id + role.title}
											variant={'ghost'}
											className={`w-full justify-start capitalize text-slate-700 ${roleSelect?.title === role.title && 'bg-slate-300/40'}`}
											onClick={() =>
												handleChangeSelect('roles', role.title)
											}
										>
											{role.title.split('_').join(' ')}
										</Button>
									),
							)
						) : (
							<div className="flex h-16 w-full items-center justify-center text-slate-500">
								<Loader2
									size={28}
									strokeWidth={2}
									className="animate-spin"
								/>
							</div>
						)}
					</div>
					<p className="ml-4 pt-6 text-xs font-semibold text-slate-500/80">
						After saving changes, affected users must log out and log back
						in to apply the changes.
					</p>
					{roleSelect?.title === auth.role && (
						<p className="ml-4 pt-6 text-xs font-semibold text-red-500/80">
							You are editing your current role. Review your changes
							carefully.
						</p>
					)}
					<div className="mt-auto w-full space-y-3">
						<div className="text-sm font-semibold">
							{success && <p className="text-green-600">{success}</p>}
							{error && <p className="text-red-600">{error}</p>}
						</div>
						{isChanged && (
							<Button
								type="submit"
								className="w-full disabled:cursor-not-allowed"
								disabled={isSubmitting ? true : false}
								onClick={handleSubmit}
							>
								{!isSubmitting ? 'Save changes' : 'Saving...'}
							</Button>
						)}
					</div>
				</div>

				{!roleSelect ? (
					<div className="flex flex-1 items-center justify-center">
						<p className="text-lg font-medium text-slate-700/50">
							Select a role to view and modify permissions
						</p>
					</div>
				) : (
					<ScrollArea
						className="w-full"
						type="auto"
						style={{ '--border': '216 12% 84%' } as React.CSSProperties}
					>
						<div
							className={`mx-auto flex w-full max-w-[700px] flex-1 flex-col gap-8 p-6 pt-8 ${!roleSelect || isSubmitting ? 'pointer-events-none opacity-50' : null}`}
						>
							<div className="space-y-1">
								<p className="ml-4 text-sm font-semibold text-slate-500/80">
									User Management
								</p>
								<div className="w-full divide-y rounded-lg border">
									{userMgmt.length === 0 ? (
										<div className="flex flex-col items-center">
											<Loader2
												size={28}
												strokeWidth={2}
												className="animate-spin"
											/>
										</div>
									) : (
										userMgmt.map(perm => {
											return (
												<div
													key={perm.id}
													className="flex w-full flex-row items-center justify-between p-4"
												>
													<Label
														htmlFor={perm.title}
														className={`${
															!(
																roleSelect?.title ===
																	'super_admin' ||
																roleSelect?.title === 'admin'
															) && 'cursor-pointer'
														} text-sm capitalize text-slate-700`}
													>
														{perm.title.split('_').join(' ')}
													</Label>
													<Switch
														id={perm.title}
														name={perm.title}
														value={perm.id}
														disabled={
															roleSelect?.title ===
																'super_admin' ||
															roleSelect?.title === 'admin'
														}
														className="data-[state=checked]:bg-primary-green data-[state=unchecked]:bg-gray-300"
														checked={permissionChange.some(
															perms => {
																return perms.permission_id ===
																	perm.id
																	? true
																	: false;
															},
														)}
														// onChange={handleChange}
														onCheckedChange={checked =>
															handleChange(checked, perm.id)
														}
													/>
												</div>
											);
										})
									)}
								</div>
							</div>
							<div className="space-y-1">
								<p className="ml-4 text-sm font-semibold text-slate-500/80">
									Products
								</p>
								<div className="w-full divide-y rounded-lg border">
									{prdctMgmt.length === 0 ? (
										<div className="flex flex-col items-center">
											<Loader2
												size={28}
												strokeWidth={2}
												className="animate-spin"
											/>
										</div>
									) : (
										prdctMgmt.map(perm => {
											return (
												<div
													key={perm.id}
													className="flex w-full flex-row items-center justify-between p-4"
												>
													<Label
														htmlFor={perm.title}
														className="cursor-pointer text-sm capitalize text-slate-700"
													>
														{perm.title.split('_').join(' ')}
													</Label>
													<Switch
														id={perm.title}
														name={perm.title}
														value={perm.id}
														className="data-[state=checked]:bg-primary-green data-[state=unchecked]:bg-gray-300"
														checked={permissionChange.some(
															perms => {
																return perms.permission_id ===
																	perm.id
																	? true
																	: false;
															},
														)}
														onCheckedChange={checked =>
															handleChange(checked, perm.id)
														}
													/>
												</div>
											);
										})
									)}
								</div>
							</div>
							<div className="space-y-1">
								<p className="ml-4 text-sm font-semibold text-slate-500/80">
									Transfers
								</p>
								<div className="w-full divide-y rounded-lg border">
									{trnfrMgmt.length === 0 ? (
										<div className="flex flex-col items-center">
											<Loader2
												size={28}
												strokeWidth={2}
												className="animate-spin"
											/>
										</div>
									) : (
										trnfrMgmt.map(perm => {
											return (
												<div
													key={perm.id}
													className="flex w-full flex-row items-center justify-between p-4"
												>
													<Label
														htmlFor={perm.title}
														className="cursor-pointer text-sm capitalize text-slate-700"
													>
														{perm.title.split('_').join(' ')}
													</Label>
													<Switch
														id={perm.title}
														name={perm.title}
														value={perm.id}
														className="data-[state=checked]:bg-primary-green data-[state=unchecked]:bg-gray-300"
														checked={permissionChange.some(
															perms => {
																return perms.permission_id ===
																	perm.id
																	? true
																	: false;
															},
														)}
														// onChange={handleChange}
														onCheckedChange={checked =>
															handleChange(checked, perm.id)
														}
													/>
												</div>
											);
										})
									)}
								</div>
							</div>
							<div className="space-y-1">
								<p className="ml-4 text-sm font-semibold text-slate-500/80">
									Views
								</p>
								<div className="w-full divide-y rounded-lg border">
									{viewMgmt.length === 0 ? (
										<div className="flex flex-col items-center">
											<Loader2
												size={28}
												strokeWidth={2}
												className="animate-spin"
											/>
										</div>
									) : (
										viewMgmt.map(perm => {
											return (
												<div
													key={perm.id}
													className="flex w-full flex-row items-center justify-between p-4"
												>
													<Label
														htmlFor={perm.title}
														className="cursor-pointer text-sm capitalize text-slate-700"
													>
														{perm.title.split('_').join(' ')}
													</Label>
													<Switch
														id={perm.title}
														name={perm.title}
														value={perm.id}
														className="data-[state=checked]:bg-primary-green data-[state=unchecked]:bg-gray-300"
														checked={permissionChange.some(
															perms => {
																return perms.permission_id ===
																	perm.id
																	? true
																	: false;
															},
														)}
														onCheckedChange={checked =>
															handleChange(checked, perm.id)
														}
													/>
												</div>
											);
										})
									)}
								</div>
							</div>
						</div>
					</ScrollArea>
				)}
			</div>
		</>
	);
};

export default RolePermissionsForm;
