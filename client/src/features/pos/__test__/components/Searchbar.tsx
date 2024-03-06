import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { Box, Boxes } from 'lucide-react';
import { useState } from 'react';
import { usePos } from '../context/PosContext';
import { Items } from '../types';

interface SearchBarProps {}

export const SearchBar = ({}: SearchBarProps) => {
	const [search, setSearch] = useState('');
	const { productInfo, isLoading, selectedProducts, setSelectedProducts } =
		usePos();

	return (
		<div className="relative z-50 border pb-10">
			<div className="absolute box-content flex w-full ">
				<Command className="rounded-lg border p-1 shadow-md">
					<CommandInput
						value={search}
						onValueChange={setSearch}
						placeholder={
							isLoading
								? 'Loading Products'
								: 'Enter Serial Number / Brand / Product Name'
						}
						disabled={isLoading}
					/>
					<CommandList className="">
						{!search ? null : (
							<>
								<CommandEmpty>Product Not Found</CommandEmpty>
								{productInfo.map((product, index) => {
									return (
										<CommandItem
											className=""
											key={index}
											value={
												product.type === 'retail'
													? `${product.product.name} (Retail)`
													: `${product.product.name} (Wholesale)`
											}
											onSelect={value => {
												const match = value.match(/\(([^)]+)\)/);
												const type = match ? match[1] : '';
												const selectedProductIndex =
													selectedProducts.findIndex(
														item =>
															item.product.id === product.id,
													);

												if (selectedProductIndex !== -1) {
													// If product already exists, update quantity
													const updatedSelectedProducts = [
														...selectedProducts,
													];
													updatedSelectedProducts[
														selectedProductIndex
													].quantity++;
													setSelectedProducts(
														updatedSelectedProducts,
													);
												} else {
													// If product doesn't exist, add it
													setSelectedProducts([
														...selectedProducts,
														{
															product: product,
															quantity: 1,
															price: product.price,
															name: product.product.name,
															type: type,
															subtotal: product.price,
														} as Items,
													]);
												}
												setSearch('');
											}}
										>
											<div className="flex flex-1 flex-row justify-between">
												<div className="flex flex-row items-center gap-2">
													{product.type === 'retail' ? (
														<Box strokeWidth={1} />
													) : (
														<Boxes strokeWidth={1} />
													)}
													<span>{product.product.name}</span>
													<span className="text-xs text-gray-600 ">
														({product.type})
													</span>
												</div>
												<div>
													<span>₱ {product.price}</span>
												</div>
											</div>
										</CommandItem>
									);
								})}
							</>
						)}
					</CommandList>
				</Command>
			</div>
		</div>
	);
};
