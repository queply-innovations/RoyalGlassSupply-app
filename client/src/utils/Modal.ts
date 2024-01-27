import { useState } from 'react';

export interface UseModalProps {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
}

export const useModal = (): UseModalProps => {
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
