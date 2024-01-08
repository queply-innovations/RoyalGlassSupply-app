import { useState } from 'react';

interface UseModal {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
}

export const useModal = (): UseModal => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	return {
		isOpen,
		openModal,
		closeModal,
	};
};
