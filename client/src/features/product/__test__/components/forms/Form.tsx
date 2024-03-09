import { useMultistepForm } from '@/utils/MultiStepForm';
import { FormEvent } from 'react';
import { ProductForm } from './ProductForm';
import { ProductPricesForm } from './ProductPricesForm';
import { UseModalProps } from '@/utils/Modal';
import { useProducts } from '../../context/ProductContext';

interface FormProps {
	isUpdate?: boolean;
	onClose: UseModalProps['closeModal'];
	isDelete?: boolean;
}

export const Form = ({
	isUpdate = false,
	onClose,
	isDelete = false,
}: FormProps) => {
	const { selectedProduct } = useProducts();

	const {
		steps,
		currentStepIndex,
		step,
		isFirstStep,
		isLastStep,
		back,
		next,
	} = useMultistepForm([<ProductForm />, <ProductPricesForm />]);

	function onSubmit(e: FormEvent) {
		e.preventDefault();
		if (!isLastStep) return next();
	}
	return (
		<>
			<form onSubmit={onSubmit}>
				{step}
				{!isFirstStep && (
					<button type="button" onClick={back}>
						Back
					</button>
				)}
				<button type="submit">{isLastStep ? 'Finish' : 'Next'}</button>
			</form>
		</>
	);
};
