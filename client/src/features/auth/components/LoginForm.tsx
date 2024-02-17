import { Button, Form, ProgressBar } from '@/components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import { useAuth } from '@/context/__test__AuthContext';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useRef, useState } from 'react';

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

	// Function to authenticate using form fields
	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		await login(data).catch(error => {
			// Catch error on authentication and set error message
			setError('root', {
				message: error.message,
			});
		});
	};

	// Loading state
	const loading = (
		<div className="flex w-full flex-col items-center justify-center space-y-0 px-20">
			<ProgressBar />
			<h2 className="text-primary-dark-gray pb-5 text-2xl font-bold">
				Checking you in....
			</h2>
		</div>
	);

	// Login form layout
	const layout = (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<input
				className="w-full rounded-lg border border-gray-300 p-2"
				{...register('email', { required: true })}
				type="email"
				placeholder="Email"
			/>
			{errors.email && (
				<div className="text-base text-red-500">{errors.email.message}</div>
			)}
			<input
				className="w-full rounded-lg border border-gray-300 p-2"
				{...register('password', { required: true })}
				type="password"
				placeholder="Password"
			/>
			{errors.password && (
				<div className="text-base text-red-500">
					{errors.password.message}
				</div>
			)}
			<Button
				type="submit"
				disabled={isSubmitting}
				fill={'green'}
				className="mt-3 w-full"
			>
				Log In
				<input type="submit" hidden />
			</Button>
			{errors.root && (
				<div className="pt-3 text-base font-bold text-red-700">
					{errors.root.message}
				</div>
			)}
		</Form>
	);

	return <>{isSubmitting ? loading : layout}</>;
};
