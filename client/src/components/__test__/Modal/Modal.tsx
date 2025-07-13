import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { X } from 'lucide-react';

interface ModalProps {
	children: ReactElement;
	title: string;
	isOpen: boolean;
	onClose: () => void;
	closeOnOverlayClick?: boolean; // pass this prop to allow closing the modal when clicking the overlay
}

export const ModalTest = ({
	children,
	title,
	isOpen,
	onClose,
	closeOnOverlayClick,
}: ModalProps) => {
	const modalRef = useRef<HTMLDivElement | null>(null);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const modalAnimation = isOpen ? 'animate-fade-in' : 'animate-fade-out';

	useEffect(() => {
		if (isOpen) {
			setIsVisible(true);
		} else {
			modalRef.current?.classList.add('fade-out');

			const timeoutId = setTimeout(() => {
				setIsVisible(false);
				onClose();
			}, 300);

			return () => clearTimeout(timeoutId);
		}
	}, [isOpen, onClose]);

	return (
		<>
			{isVisible && (
				<>
					<div
						ref={modalRef}
						className={`modal-content ${modalAnimation} absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-5 rounded-md bg-white stroke-1 p-5 pb-10 shadow-2xl`}
					>
						<div className="flex w-full justify-between">
							<span className="text-lg font-bold uppercase tracking-tight text-gray-800">
								{title}
							</span>
							<span
								className="close-button relative right-0 top-0 flex-none cursor-pointer justify-end"
								onClick={onClose}
							>
								<X strokeWidth={2} size={28} />
							</span>
						</div>
						{children}
					</div>
					<div
						className={`modal-overlay fixed left-0 top-0 z-30 h-full w-full bg-black bg-opacity-70 ${modalAnimation}`}
						onClick={closeOnOverlayClick ? onClose : () => {}}
					/>
				</>
			)}
		</>
	);
};
