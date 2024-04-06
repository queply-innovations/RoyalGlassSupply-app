import { Button } from '@/components/ui/button';
import { useAddProductPos } from '@/features/pos/add-product';
import {
	AddInventoryProductsPOS,
	MainMenuButtons,
} from '@/features/pos/add-product/components';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProductsTablePos } from './AddProduct/AddProductPos';
import { useModal } from '@/utils/Modal';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { useState } from 'react';
import { Product as IProduct } from '@/features/product/__test__/types';
import { AddProductForm } from '@/features/product/__test__/components/forms/AddProdForm';

export const AddProductMain = () => {
	const { activeTab, setActiveTab } = useAddProductPos();
	const navigate = useNavigate();

	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');
	const modalHandler = (product: IProduct, action: string) => {
		openModal();
		setModalAction(action);
	};
	return (
		<>
			<div className="flex w-full flex-row items-start justify-between">
				<h1 className="text-3xl font-bold">Add Product</h1>
				<Button
					className="flex flex-row items-center gap-2 bg-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-300 hover:text-gray-700"
					onClick={() => {
						activeTab === 'main'
							? navigate('/pos/add-order')
							: setActiveTab('main');
					}}
				>
					<ChevronLeft size={20} strokeWidth={2.5} />
					{activeTab === 'main' ? 'Go back' : 'Main menu'}
				</Button>
			</div>
			{(activeTab === 'main' || activeTab === undefined) && (
				<MainMenuButtons />
			)}
			{activeTab === 'select_inventory' && <AddInventoryProductsPOS />}{' '}
			{activeTab === 'add_product' && (
				<ProductsTablePos openModal={modalHandler} />
			)}
			<div>
				<ModalTest
					isOpen={isOpen}
					onClose={closeModal}
					title={modalAction === 'add' ? 'Add Product' : 'Edit Product'}
				>
					<>
						{modalAction === 'add' && (
							<AddProductForm onClose={closeModal} />
						)}
					</>
				</ModalTest>
			</div>
		</>
	);
};
