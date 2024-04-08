import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useExpenses } from "../context";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Expenses, ExpensesRaw } from "../types";
import { addExpenses, editExpenses } from "../api/Expenses";

export const useExpensesAddition = () => {
	const queryClient = useQueryClient();
	const { expenses, dateToday } = useExpenses();
	
	const id = expenses.length + 1;
	const { auth } = useAuth();

	const [ expensesAdd, setExpensesAdd ] = useState<Expenses>({
		id: id,
		title: '',
		date_of_operation: dateToday,
		amount: 0,
		notes: '',
		created_by: auth.user.id,
		created_at: '',
		updated_at: '',
	});

	
	const [ isChanged, setIsChanged ] = useState(false);
	const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
	const [ error, setError ] = useState<string | null>(null);
	const [ success, setSuccess ] = useState<string | null>(null);

	const isFormValid = () => {
		const headers: Array<Object> = Object.keys(expensesAdd).map(key => {
			return { text: key }
		});

		if (headers.length >= 5) {
			if (!expensesAdd.amount){
				return [false, 'Please fill up all fields (notes are optional)'];
			} else if (!expensesAdd.title) {
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
		setExpensesAdd(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async () => {
		const checker: any = isFormValid();
		setIsSubmitting(true);
		if (checker[0]) {
			await addExpensesMutation(expensesAdd);
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
			setSuccess('Expenses info has been added');
		},
		onError: (error: any) => {
			console.error(error);
			setError(error.message);
			setIsSubmitting(false);
		},
	};

	const { mutateAsync: addExpensesMutation } = useMutation({
		mutationKey: ['addExpenses'],
		mutationFn: addExpenses,
		...mutationConfig,
	});

	return {
		// value,
		// setValue,
		dateToday,
		expensesAdd,
		isChanged,
		isSubmitting,
		error,
		success,
		handleSubmit,
		handleChange,
		addExpensesMutation,
	};
};