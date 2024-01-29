import { Button, Form } from '@/components';
import { LoginUser } from '@/api/Login';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(4),
});

type FormFields = z.infer<typeof schema>;

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<FormFields> = async data => {
		try {
			const userData = await LoginUser(data.email, data.password);
			if (userData) {
				// TODO: save token to local storage?
				const { user, token } = userData;
				console.log('User:', user);
				console.log('Token:', token);
			}
			// await LoginUser(data.email, data.password);
		} catch (error) {
			setError('root', { message: 'Invalid email or password' });
		}
	};

	return (
		<>
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
		</>
	);
};

export default LoginForm;
