import { FC, ReactElement } from 'react';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactElement;
	title: string;
}

const Modal: FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
	if (!isOpen) {
		return null;
	}

	return (
		<>
			<div className="modal-content absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-5 rounded-md bg-slate-50 stroke-1 p-5">
				<div className="modal-header flex justify-between">
					<span></span>
					<span className="text-lg font-bold uppercase">{title}</span>
					<span
						className="close-button relative right-0 top-0 flex-none cursor-pointer justify-end p-1"
						onClick={onClose}
					>
						<IoMdClose />
					</span>
				</div>

				{children}
			</div>
			<div
				className="modal-overlay fixed left-0 top-0 z-30 h-full w-full bg-black bg-opacity-50"
				onClick={onClose}
			/>
		</>
	);
};

export default Modal;
