import { Button } from '@/components';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
	children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
	const navigate = useNavigate();

	return (
		<>
			<div className="flex h-screen w-screen items-center justify-center">
				<div className="flex flex-col items-center gap-5 rounded-md border-[0.5px] bg-white px-16 py-5 shadow-md">
					<div>
						<img
							src="/RGS-logo.png"
							alt="RGS Logo"
							className="h-20 w-20"
						/>
					</div>
					<div className="text-3xl font-bold">Royal Glass Supply</div>
					{children}
					<Button onClick={() => navigate('/dashboard')} fill={'yellow'}>
						Dashboard
					</Button>
				</div>
			</div>
		</>
	);
};
