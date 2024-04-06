import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useExpenses } from "../context";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Expenses, ExpensesRaw } from "../types";
import { editExpenses } from "../api/Expenses";

export const useExpensesMutation = () => {
	const queryClient = useQueryClient();
	const { selectedExpenses } = useExpenses();

	const [ expensesEdit, setExpensesEdit ] = useState<Expenses>({
		id: selectedExpenses.id,
		title: selectedExpenses.title,
		date_of_operation: selectedExpenses.date_of_operation,
		amount: selectedExpenses.amount,
		notes: selectedExpenses.notes,
		created_by: selectedExpenses.created_by.id,
		created_at: selectedExpenses.created_at,
		updated_at: selectedExpenses.updated_at
	});

	const [ isChanged, setIsChanged ] = useState(false);
	const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
	const [ error, setError ] = useState<string | null>(null);
	const [ success, setSuccess ] = useState<string | null>(null);

	const isFormValid = () => {
		const headers: Array<Object> = Object.keys(expensesEdit).map(key => {
			return { text: key }
		});

		if (headers.length >= 8) {
			if (!expensesEdit.amount){
				return [false, 'Please fill up all fields (notes are optional)'];
			} else if (!expensesEdit.title) {
				return [false, 'Please fill up all fields (notes are optional)'];
			} else {
				return [true, ''];
			}
		} else {
			return [false, 'Please fill up all fields (notes are optional)'];
		}
	}

	const handleChange = (e: any) => {
		setIsChanged(true);
		setSuccess(null);
		setError(null);
		setExpensesEdit(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async () => {
		const checker: any = isFormValid();
		setIsSubmitting(true);
		if (checker[0]) {
			await editExpensesMutation(expensesEdit);
		} else {
			setError(checker[1]);
			setIsSubmitting(false);
		}
	};

	// Configurations for mutation
	const mutationConfig = {
		onSuccess: async () => {
			// Reset loading state
			await queryClient.invalidateQueries({ queryKey: ['expenses'] });
			setIsSubmitting(false);
			setIsChanged(false);
			setSuccess('Expenses info has been edited');
		},
		onError: (error: any) => {
			console.error(error);
			setError(error.message);
			setIsSubmitting(false);
		},
	};

	const { mutateAsync: editExpensesMutation } = useMutation({
		mutationKey: ['editExpenses'],
		mutationFn: editExpenses,
		...mutationConfig,
	});

	return {
		// value,
		// setValue,
		expensesEdit,
		isChanged,
		isSubmitting,
		error,
		success,
		handleSubmit,
		handleChange,
		editExpensesMutation,
	};
};