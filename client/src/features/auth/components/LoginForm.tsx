import { Button, Form, Inputbox, ProgressBar } from '@/components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import { useAuth } from '@/context/__test__AuthContext';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { Loader2, Mail, LockKeyhole } from 'lucide-react';

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

	// Login form layout
	const layout = (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-6">
				<div className="grid gap-4">
					<div className="flex flex-row rounded-lg border border-gray-300 p-2 w-[420px] h-[56px] items-center align-center">
						<Mail size={26} strokeWidth={1} className="ml-2" />
						<input
							className="ml-4 w-full"
							{...register('email', { required: true })}
							type="email"
							placeholder="Email"
						/>
					</div>
					{errors.email && (
						<div className="text-base text-red-500">{errors.email.message}</div>
					)}
					<div className="flex flex-row rounded-lg border border-gray-300 p-2 w-[420px] h-[56px] items-center align-center">
						<LockKeyhole size={26} strokeWidth={1} className="ml-2" />
						<input
							className="ml-4 w-full"
							{...register('password', { required: true })}
							type="password"
							placeholder="Password"
						/>
					</div>
					{errors.password && (
						<div className="text-base text-red-500">
							{errors.password.message}
						</div>
					)}
				</div>
				<Button disabled={isSubmitting} 
					className="rounded-md w-[420px] h-[56px] bg-login-button hover:bg-blue-950 font-extrabold">
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
			</div>
		</Form>
	);

	return <>{isSubmitting ? loading : layout}</>;
};
