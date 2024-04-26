import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { CommandReturnItems } from './CommandReturnItems';

interface ReturnItemsProps {}

export const ReturnItems = ({}: ReturnItemsProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between">
          Select Items...
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-[1024px] p-0 text-sm font-medium text-slate-700">
        <Command>
          <CommandInput placeholder="Search Items..." />
          <CommandEmpty>No match found</CommandEmpty>
          <ScrollArea className="max-h-[300px] overflow-y-scroll">
            <CommandGroup>
              <CommandReturnItems isOpen={setOpen} />
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
