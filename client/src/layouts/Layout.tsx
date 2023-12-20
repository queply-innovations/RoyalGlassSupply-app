import { ReactNode, FC } from 'react';

interface LayoutProps {
	children: ReactNode;
}

const LayoutWrapper: FC<LayoutProps> = ({ children }) => {
	return <div className="flex flex-row">{children}</div>;
};

export default LayoutWrapper;
