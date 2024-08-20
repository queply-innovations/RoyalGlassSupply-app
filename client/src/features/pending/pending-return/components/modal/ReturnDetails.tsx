import { useReturn } from '../../context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { InvoiceDetails } from './InvoiceDetails';
import { ReturnItemsTable } from './ReturnItemsTable';

export const ReturnDetails = () => {
	const { selectedReturn } = useReturn();

	// Tab state management
	const [tab, setTab] = useState<'details' | 'items'>('details');

	return (
		<div className="flex min-w-[720px] flex-col gap-4">
			<Tabs
				value={tab}
				onValueChange={value => {
					setTab(value as 'details' | 'items');
				}}
			>
				<TabsList className="flex w-full flex-row">
					<TabsTrigger value="details" className="flex-1">
						Details
					</TabsTrigger>
					<TabsTrigger value="items" className="flex-1">
						Items
					</TabsTrigger>
				</TabsList>

				<TabsContent value="details">
					<InvoiceDetails selectedReturn={selectedReturn} />
				</TabsContent>
				<TabsContent value="items" className="w-[1240px]">
					<ReturnItemsTable selectedReturn={selectedReturn} />
				</TabsContent>
			</Tabs>
		</div>
	);
};
