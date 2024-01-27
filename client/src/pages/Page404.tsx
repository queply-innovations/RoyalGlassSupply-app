import { Button } from '@/components/Button';

const NotFound = () => {
	return (
		<>
			<div className="flex h-screen w-screen flex-col items-center justify-center">
				<h1 className="text-primary-dark-gray text-9xl font-bold">404</h1>
				<h2 className="text-primary-dark-gray text-3xl font-bold">
					Page Not Found
				</h2>
				<p className="text-primary-dark-gray text-xl">
					Sorry, the page you're looking for doesn't exist.
				</p>
				<Button fill={'red'} onClick={() => window.history.back()}>
					Go Back
				</Button>
			</div>
		</>
	);
};

export default NotFound;
