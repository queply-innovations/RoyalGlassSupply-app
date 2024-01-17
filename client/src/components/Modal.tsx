import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactElement;
	title?: string;
	closeButton?: boolean;
}

const Modal: FC<ModalProps> = ({
	title,
	isOpen,
	onClose,
	children,
	closeButton,
}) => {
	const modalRef = useRef<HTMLDivElement | null>(null);
	const [isVisible, setIsVisible] = useState<boolean>(false);

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

	const modalAnimation = isOpen ? 'animate-fade-in' : 'animate-fade-out';

	return (
		<>
			{isVisible && (
				<>
					<div
						ref={modalRef}
						className={`modal-content ${modalAnimation} absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-5 rounded-md bg-slate-50 stroke-1 p-5`}
					>
						{!title && (
							<div className="modal-header flex justify-center"></div>
						)}
						{closeButton && (
							<div className="modal-header flex justify-center">
								<div className="flex w-full justify-between">
									<span></span>
									<span className="text-lg font-bold uppercase">
										{title}
									</span>
									<span
										className="close-button relative right-0 top-0 flex-none cursor-pointer justify-end p-1"
										onClick={onClose}
									>
										<IoMdClose />
									</span>
								</div>
							</div>
						)}

						{children}
					</div>
					<div
						className="modal-overlay fixed left-0 top-0 z-30 h-full w-full bg-black bg-opacity-50"
						onClick={onClose}
					/>
				</>
			)}
		</>
	);
};

export default Modal;
