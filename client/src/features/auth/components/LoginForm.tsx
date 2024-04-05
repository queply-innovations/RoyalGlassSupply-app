import { Button, Form, Inputbox, ProgressBar } from '@/components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import { useAuth } from '@/context/__test__AuthContext';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { Loader2, Mail, LockKeyhole, Eye, EyeOff } from 'lucide-react';

// Define the form schema
const schema = z.object({
	email: z.string().email(),
	password: z.string().min(4),
});

// Infer the `FormFields` type using zod
type FormFields = z.infer<typeof schema>;

export const LoginForm = () => {
	// Import login method from useAuth hook
	const { login } = useAuth();
	// React-hook-form methods
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		resolver: zodResolver(schema),
	});

	const [progress, setProgress] = useState(0);

	// Function to authenticate using form fields
	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		await login(data, setProgress).catch(error => {
			// Catch error on authentication and set error message
			setError('root', {
				message: error.message,
			});
		});
	};

	// Loading state
	const loading = (
		<div className="flex w-full flex-col items-center justify-center space-y-0 px-20">
			<ProgressBar progress={progress} />
			<h2 className="text-primary-dark-gray pb-5 text-2xl font-bold">
				Checking you in....
			</h2>
		</div>
	);

	// Pasword show state
	const [showPass, setShowPass] = useState<boolean>(false);
	const changeStat = () => {
		setShowPass(!showPass);
	};

	// Login form layout
	const layout = (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-8">
				<div className="grid gap-2">
					<div className="space-y-1">
						<div className="relative h-[56px] w-[420px]">
							<Mail
								size={24}
								strokeWidth={1}
								className="pointer-events-none absolute left-0 top-1/2 mx-4 -translate-y-1/2"
							/>
							<input
								className="h-full w-full rounded-lg border border-gray-300 pl-14"
								{...register('email', { required: true })}
								type="email"
								placeholder="Email"
							/>
						</div>
						{errors.email && (
							<div className="text-base font-medium text-red-500">
								{errors.email.message}
							</div>
						)}
					</div>
					<div className="space-y-1">
						<div className="relative h-[56px] w-[420px]">
							<LockKeyhole
								size={26}
								strokeWidth={1}
								className="pointer-events-none absolute left-0 top-1/2 mx-4 -translate-y-1/2"
							/>
							<input
								className="h-full w-full rounded-lg border border-gray-300 px-14"
								{...register('password', { required: true })}
								type={showPass ? 'text' : 'password'}
								placeholder="Password"
							/>
							{showPass ? (
								<Eye
									size={26}
									strokeWidth={1}
									className="absolute right-0 top-1/2 mx-4 -translate-y-1/2 cursor-pointer"
									onClick={changeStat}
								/>
							) : (
								<EyeOff
									size={26}
									strokeWidth={1}
									className="absolute right-0 top-1/2 mx-4 -translate-y-1/2 cursor-pointer"
									onClick={changeStat}
								/>
							)}
						</div>
						{errors.password && (
							<div className="text-base font-medium text-red-500">
								{errors.password.message}
							</div>
						)}
					</div>
				</div>
				<Button
					disabled={isSubmitting}
					className="bg-login-button h-[56px] w-[420px] rounded-md font-extrabold hover:bg-blue-950"
				>
					{isSubmitting && (
						<div className="flex items-center justify-center text-slate-800/60">
							<Loader2
								size={28}
								strokeWidth={2}
								className="animate-spin"
							/>
						</div>
					)}
					Log in
				</Button>
				{
					// Error message
					errors.root && (
						<div className="text-center text-base font-medium text-red-500">
							{errors.root.message?.includes('credentials')
								? 'Invalid login credentials'
								: errors.root.message}
						</div>
					)
				}
			</div>
		</Form>
	);

	return <>{isSubmitting ? loading : layout}</>;
};
