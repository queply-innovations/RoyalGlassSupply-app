import axios from 'axios';
import { API_HEADERS, API_URLS } from '@/api';
import { InvoiceItems, InvoiceProps, Invoices } from '../types';

export const fetchInvoices = async (page = 1, limit = 10, search = null) => {

    try {
        const response = await axios.get(`${API_URLS.INVOICE}?page=${page}&limit=${limit}&search=${search}`, {
            headers: API_HEADERS(),
        });
        console.log('response of axios: ', response);
        return response.data; // this includes: data, meta, links
    } catch (error: any) {
        console.error('Error fetching invoices:', error.message);
        throw error;
    }
};

export const fetchInvoiceById = async (id: number): Promise<Invoices> => {
    return await axios
        .get(`${API_URLS.INVOICE}/${id}`, {
            headers: API_HEADERS(),
        })
        .then(response => {
            return response.data.data;
        })
        .catch((error: Error) => {
            console.error('Error fetching invoice by code:', error);
            throw error;
        });
};
export const fetchInvoiceItemsById = async (
    id: number,
): Promise<InvoiceItems[]> => {
    return await axios
        .post(
            `${API_URLS.INVOICE_ITEMS}/searches-filters-sorts`,
            {
                invoice_id: id,
            },
            {
                headers: API_HEADERS(),
            },
        )
        .then(response => {
            return response.data.data;
        })
        .catch(error => {
            console.error('Error fetching invoice items by id:', error);
            throw error;
        });
};

export const fetchInvoiceByCode = async (code: string): Promise<any> => {
    return await axios
        .get(`${API_URLS.INVOICE}/search/code?search=${code}`, {
            headers: API_HEADERS(),
        })
        .then(response => {
            return response.data.data;
        })
        .catch(error => {
            throw error.response.data;
        });
};

export const addInvoice = (data: Partial<Invoices>) => {
    return axios
        .post(API_URLS.INVOICE, data, {
            headers: API_HEADERS(),
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error adding invoice:', error);
            throw error;
        });
};

export const updateInvoice = (data: Invoices) => {
    return axios
        .put(`${API_URLS.INVOICE}/${data.id}`, data, {
            headers: API_HEADERS(),
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error updating invoice:', error);
            throw error;
        });
};

export const removeInvoice = (id: number) => {
    return axios
        .delete(`${API_URLS.INVOICE}/${id}`, {
            headers: API_HEADERS(),
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error removing invoice:', error);
            throw error;
        });
};

export const updatePendingInvoice = ({
                                         id,
                                         data,
                                     }: {
    id: number;
    data: Partial<Invoices>;
}) => {
    return axios
        .put(`${API_URLS.INVOICE}/${id}`, data, {
            headers: API_HEADERS(),
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error updating invoice:', error);
            throw error;
        });
};
