import { Button, Form, ProgressBar } from '@/components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import { useAuth } from '@/context/__test__AuthContext';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useRef, useState } from 'react';

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(4),
});

type FormFields = z.infer<typeof schema>;
interface LoginFormProps {
	onSuccess: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
	const { login } = useAuth();
	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		resolver: zodResolver(schema),
	});

	//const [ completed, setCompleted ] = useState(1);
	//const ref = useRef(null);

	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		await login(data).then(() => {
			onSuccess();
		});
		// setLoading(true);
		// ref.current.continuousStart();
		// setTimeout(() => {
		// 	ref.current.complete();
		// 	// setLoading(false);
		// }, 4000);

		
	};

	const loading = (
		<div className="flex flex-col w-full px-20 space-y-0 justify-center items-center">
			<ProgressBar />
			<h2 className='text-primary-dark-gray text-2xl font-bold'>Checking you in....</h2>
		</div>
	);

	const layout = (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<input
				className="w-full rounded-lg border border-gray-300 p-2"
				{...register('email', { required: true })}
				type="email"
				placeholder="Email"
			/>
			{errors.email && (
				<div className="text-base text-red-500">
					{errors.email.message}
				</div>
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
			<Button type="submit" disabled={isSubmitting} fill={'green'}>
				Login
			</Button>
			{errors.root && (
				<div className="text-base text-red-500">
					{errors.root.message}
				</div>
			)}
		</Form>
	);

	return (
		<>
			{isSubmitting ? loading : layout}
		</>
	);
};
