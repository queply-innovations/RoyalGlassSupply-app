import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ItemStocksCountProps {}

export const ItemStocksCount = ({}: ItemStocksCountProps) => {
   return (
      <>
         <div className="relative flex w-1/2 flex-col justify-center gap-1">
            <Label
               htmlFor="stocks_count"
               className="text-sm font-bold text-gray-600">
               Stocks Count
            </Label>
            <Input
               id="stocks_count"
               name="stocks_count"
               type="number"
               min={0}
               max={9999999}
               step={1}
               value={''}
               required
               onChange={() => {}}
            />
            <span className="absolute bottom-0 left-0 pb-[0.65rem] pl-3 text-sm font-semibold text-gray-500"></span>
         </div>
      </>
   );
};
