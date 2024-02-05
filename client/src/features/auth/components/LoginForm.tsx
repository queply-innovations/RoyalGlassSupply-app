import { Button, Form } from '@/components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';

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
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<FormFields> = async data => {
		try {
			await login(data);
			onSuccess();
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
