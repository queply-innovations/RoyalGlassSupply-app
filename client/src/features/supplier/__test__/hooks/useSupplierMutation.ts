import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSupplier, updateSupplier } from '../api/Supplier';
import { useSupplier } from '../context/SupplierContext';
import { useEffect, useState } from 'react';
import { Supplier } from '../../types';
import { set } from 'react-hook-form';

export const useSupplierMutation = () => {
	const queryClient = useQueryClient();
	const { selectedSupplier, setSelectedSupplier } = useSupplier();

	const [ supplier, setSupplier ] = useState<Supplier>({} as Supplier);
	useEffect(() => {
		if (selectedSupplier) {
			setSupplier(selectedSupplier);
		}
	}, [selectedSupplier]);

	const [ newSupplier, setNewSupplier ] = useState<Supplier>({} as Supplier);

	const [ isChanged, setIsChanged ] = useState(false);
	const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
	const [ error, setError ] = useState<string | null>(null);
	const [ success, setSuccess ] = useState<string | null>(null);

	const isFormValid = (isUpdate: boolean) => {
		if (isUpdate) {
			const headers: Array<Object> = Object.keys(supplier).map(key => {
				return { text: key }
			});
	
			const formChecker = headers.length === 3 || headers.length > 3 ? true : false;

			if (formChecker) {
				const checker = supplier.contact_no?.length > 11 || supplier.contact_no?.length < 11 ? false : true;
				if (checker) {
					return [ checker, "" ];
				} else {
					return [ checker, "Contact number must be 11 digits" ];
				}
			} else {
				return [ formChecker, "Please fill up all fields" ];
			}
		} else {
			const headers: Array<Object> = Object.keys(newSupplier).map(key => {
				return { text: key }
			});
	
			const formChecker = headers.length === 3 || headers.length > 3 ? true : false;

			if (formChecker) {
				const checker = newSupplier.contact_no?.length > 11 || newSupplier.contact_no?.length < 11 ? false : true;
				if (checker) {
					return [ checker, "" ];
				} else {
					return [ checker, "Contact number must be 11 digits" ];
				}
			} else {
				return [ formChecker, "Please fill up all fields" ];
			}
		}
	};

	const handleChange = (e: any, isUpdate: boolean) => {
		setIsChanged(true);
		setSuccess(null);
		setError(null);
		if (isUpdate) {
			setSupplier(prev => ({
				...prev,
				[e.target.name]: e.target.value,
			}));
		} else {
			setNewSupplier(prev => ({
				...prev,
				[e.target.name]: e.target.value,
			}));
		}
		
	};

	// useEffect(() => {
	// 	console.log(newSupplier);
	// }, [newSupplier]);

	const handleSubmit = async (isUpdate: boolean) => {
		const checker: any = isFormValid(isUpdate);
		setIsSubmitting(true);
		if (checker[0]) {
			if (isUpdate) {
				return await editSupplierMutation(supplier);
			} else {
				return await addSupplierMutation(newSupplier);
			}
		} else {
			setError(checker[1]);
			setIsSubmitting(false);
			console.log(newSupplier);
		}
	};

	// Configurations for mutation
	const mutationConfig = {
		onSuccess: async () => {
			// Reset loading state
			await queryClient.invalidateQueries({ queryKey: ['supplier'] });
			setIsSubmitting(false);
			setIsChanged(false);
			setSuccess('Supplier info has been edited');
		},
		onError: (error: any) => {
			console.error(error);
			setError(error.message);
			setIsSubmitting(false);
		},
	};

	const { mutateAsync: editSupplierMutation } = useMutation({
		mutationKey: ['updateSupplier'],
		mutationFn: updateSupplier,
		...mutationConfig,
	});

	// Configurations for addition
	const mutationConfig2 = {
		onSuccess: async () => {
			// Reset loading state
			await queryClient.invalidateQueries({ queryKey: ['supplier'] });
			setIsSubmitting(false);
			setIsChanged(false);
			setSuccess('Supplier info has been added');
		},
		onError: (error: any) => {
			console.error(error);
			setError(error.message);
			setIsSubmitting(false);
		},
	};

	const { mutateAsync: addSupplierMutation } = useMutation({
		mutationKey: ['addSupplier'],
		mutationFn: addSupplier,
		...mutationConfig2,
	});

	
	// return useMutation({
	// 	mutationKey: ['removeSupplier:', selectedSupplier],
	// 	mutationFn: removeSupplier,
	// 	onSuccess: async () => {
	// 		await queryClient.invalidateQueries({ queryKey: ['supplier'] });
	// 		console.log('Supplier removed');
	// 	},
	// 	onError: error => {
	// 		console.error('Supplier Data submission failed', error);
	// 	},
	// });

	return {
		// value,
		// setValue,
		supplier,
		selectedSupplier,
		newSupplier,
		isChanged,
		isSubmitting,
		error,
		success,
		handleSubmit,
		handleChange,
		editSupplierMutation,
	};
};
