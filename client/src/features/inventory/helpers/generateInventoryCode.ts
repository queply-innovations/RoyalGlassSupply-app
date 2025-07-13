/**
 * Generates an inventory code based on the warehouse code, date, and inventory index.
 *
 * @param warehouseCode - The code of the warehouse.
 * @param inventoryIndex - The index of the inventory. If creating new inventory, this should be the total number of inventories + 1.
 * @param dateCreated - Optional. The date of the inventory is created. If not provided, the current date will be used.
 * @returns The generated inventory code. Returns with the format `XXX-YYYY-MM-DD-NNNN` (warehouseCode-date-inventoryIndex).
 */
export const generateInventoryCode = (
	warehouseCode: string,
	inventoryIndex: number,
	dateCreated?: Date,
) => {
	// Date formatting, if dateCreated is not provided, use current date
	const setDate = dateCreated ? dateCreated : new Date();
	const date =
		setDate.getFullYear() +
		'-' +
		('0' + (setDate.getMonth() + 1)).slice(-2) +
		'-' +
		('0' + setDate.getDate()).slice(-2);

	// Warehouse code, total inventory => slice to first 3 characters
	const warehouse = warehouseCode.slice(0, 3); //
	const index = inventoryIndex.toString().padStart(4, '0');

	return `${warehouse}-${date}-${index}`.toUpperCase();
};
