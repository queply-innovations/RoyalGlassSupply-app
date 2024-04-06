import { Navbar } from '@/features/pos/__test__/components/Navbar/Navbar';
import { AddProductPosProvider } from '@/features/pos/add-product';
import { ToastContainer } from 'react-toastify';
import { AddProductMain } from '@/features/pos/add-product/components';

export const AddProductPOSPage = () => {
	return (
		<div className="flex h-screen w-screen flex-row">
			<Navbar />
			<AddProductPosProvider>
				<div className="max-h-full w-full overflow-y-auto p-6 pt-12 text-slate-700">
					<div className="mx-auto max-w-[1024px] space-y-6">
						<AddProductMain />
					</div>
				</div>
				<ToastContainer />
			</AddProductPosProvider>
		</div>
	);
};
