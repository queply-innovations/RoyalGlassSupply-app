import { Input } from '@/components/ui/input';
import { useProductPricesPaginated } from '../context/ProductPricesPaginatedContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Delete, Search } from 'lucide-react';

export const SearchProduct = () => {
	const {
		productQuery,
		setProductQuery,
		pagination,
		setPagination,
		isFetching,
	} = useProductPricesPaginated();
	const [inputValue, setInputValue] = useState<string | null>(productQuery);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setProductQuery(inputValue);
		setPagination({ ...pagination, pageIndex: 0 });
	};

	const clearQuery = () => {
		setInputValue(null);
		setProductQuery(null);
		setPagination({ ...pagination, pageIndex: 0 });
	};

	return (
		<form onSubmit={handleSubmit} className="relative">
			<Input
				id="search_product"
				className="w-80"
				placeholder="Search product name..."
				disabled={isFetching}
				value={inputValue ?? ''}
				onChange={e => {
					setInputValue(e.target.value);
				}}
				onBlur={e => {
					if (e.target.value === '') {
						clearQuery();
					}
				}}
			/>
			<Button
				size={'icon'}
				type={productQuery ? 'button' : 'submit'}
				variant={inputValue ? 'default' : 'ghost'}
				className="absolute right-0 top-0 scale-90"
				disabled={isFetching}
				onClick={() => {
					if (productQuery) {
						clearQuery();
					}
				}}
			>
				{productQuery ? (
					<Delete width={'1.3rem'} strokeWidth={2} />
				) : (
					<Search width={'1.3rem'} strokeWidth={2} />
				)}
			</Button>
		</form>
	);
};
