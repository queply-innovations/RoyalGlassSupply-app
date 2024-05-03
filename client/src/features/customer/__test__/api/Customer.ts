import axios from 'axios';
import { API_URLS, API_HEADERS } from '@/api';
import { Customer } from '../types';

export const fetchCustomers = async (): Promise<Customer[]> => {
  return await axios
    .get(API_URLS.CUSTOMERS, {
      headers: API_HEADERS(),
    })
    .then(response => {
      return response.data.data;
    })
    .catch(error => {
      console.error('Error fetching customers:', error);
      throw error;
    });
};

export const addCustomer = async (data: Partial<Customer>) => {
  return await axios
    .post(API_URLS.CUSTOMERS, data, {
      headers: API_HEADERS(),
    })
    .then(response => {
      return { status: response.status, data: response.data };
    })
    .catch((error: Error) => {
      console.error('Error adding customer:', error.message);
      throw error;
    });
};

export const searchCustomer = async (fullName: string): Promise<Customer[]> => {
  return await axios
    .post(
      `${API_URLS.CUSTOMERS}/searches-filters-sorts`,
      {
        searchName: {
          name: fullName,
        },
      },
      {
        headers: API_HEADERS(),
      },
    )
    .then(response => {
      return response.data.data;
    })
    .catch(error => {
      console.error('Error searching customers:', error);
      throw error;
    });
};
