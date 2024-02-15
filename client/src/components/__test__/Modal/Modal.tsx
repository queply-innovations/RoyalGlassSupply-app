import { ReactNode } from 'react';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
	children: ReactNode;
	title: string;
}

export const ModalTest = ({ children, title }: ModalProps) => {
	return (
		<>
			<div className="modal-header flex justify-center">
				<div className="flex w-full justify-between">
					<span className="text-lg font-bold uppercase">{title}</span>
					<button className="h-3 w-3" type="button" onClick={() => {}}>
						<IoMdClose />
					</button>
				</div>
			</div>
			{children}
		</>
	);
};
