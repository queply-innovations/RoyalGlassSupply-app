/* eslint-disable @typescript-eslint/no-explicit-any */
import {  API_URLS } from '@/api';
import { User, UserAdd } from '../types';
import storage from '@/utils/storage';
import axios from 'axios';
import { RolePermissions, Permissions, Roles } from '../types';

export const fetchUsers = async (updateProgress: any): Promise<User[]> => {
   return await axios
      .get(API_URLS.USERS, {
         headers: {
            Authorization: `Bearer ${storage.getToken()}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
         },
         onDownloadProgress: progress => {
            const percentCompleted = Math.round(
               (progress.loaded / (progress.total ?? 1)) * 100,
            );
            updateProgress(percentCompleted);
         },
      })
      .then(response => {
         return response.data.data;
      })
      .catch(error => {
         console.error('Error fetching users:', error);
         throw error;
      });
};

export const getUser = async (id: number): Promise<User[]> => {
   return axios.get(`${API_URLS.USERS}/${id}`, {
      headers: {
         Authorization: `Bearer ${storage.getToken()}`,
         'Content-Type': 'application/json',
         'ngrok-skip-browser-warning': '69420',
      },
   });
};

export const getUserRole = async (id: number): Promise<Roles['title']> => {
   try {
      const response = await axios.post(
         `${API_URLS.USER_ROLES}/searches-filters-sorts`,
         { user_id: id },
         {
            headers: {
               Authorization: `Bearer ${storage.getToken()}`,
               'Content-Type': 'application/json',
               'ngrok-skip-browser-warning': '69420',
            },
         },
      );
      // Data contains object with an array of one object
      return response.data.data[0].role.title;
   } catch (e) {
      console.log(e);
      throw e;
   }
};

export const getUserRolePermissions = async (
   id: number,
): Promise<RolePermissions> => {
   return axios.get(`${API_URLS.ROLE_PERMISSIONS}/${id}`, {
      headers: {
         Authorization: `Bearer ${storage.getToken()}`,
         'Content-Type': 'application/json',
         'ngrok-skip-browser-warning': '69420',
      },
   });
};

export const getUsers = async (): Promise<User[]> => {
   return axios.get(`${API_URLS.USERS}`, {
      headers: {
         Authorization: `Bearer ${storage.getToken()}`,
         'Content-Type': 'application/json',
         'ngrok-skip-browser-warning': '69420',
      },
   });
};

export const getRoles = async (): Promise<Roles> => {
   return await axios
      .get(`${API_URLS.ROLES}`, {
         headers: {
            Authorization: `Bearer ${storage.getToken()}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
         },
      })
      .then(response => {
         return response.data.data;
      })
      .catch(error => {
         console.error('Error fetching roles:', error);
         throw error;
      });
};

export const editUser = async (data: any) => {
   console.log(data);
   return await axios
      .put(`${API_URLS.USERS}/${data.user_id}`, data, {
         headers: {
            Authorization: `Bearer ${storage.getToken()}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
         },
      })
      .then(async () => {
         return await axios
            .post(
               `${API_URLS.USER_ROLES}/searches-filters-sorts`,
               { user_id: data.user_id },
               {
                  headers: {
                     Authorization: `Bearer ${storage.getToken()}`,
                     'Content-Type': 'application/json',
                     'ngrok-skip-browser-warning': '69420',
                  },
               },
            )
            .then(async response2 => {
               const data2 = { user_id: data.user_id, role_id: data.role_id };
               if (response2) {
                  return await axios
                     .put(
                        `${API_URLS.USER_ROLES}/${response2.data.data[0].id}`,
                        data2,
                        {
                           headers: {
                              Authorization: `Bearer ${storage.getToken()}`,
                              'Content-Type': 'application/json',
                              'ngrok-skip-browser-warning': '69420',
                           },
                        },
                     )
                     .then(response => {
                        // console.log(response);
                        return response.data.data;
                     })
                     .catch(error => {
                        console.error('Error putting user changes:', error);
                        throw error;
                     });
               } else {
                  return await axios
                     .post(`${API_URLS.USER_ROLES}`, data2, {
                        headers: {
                           Authorization: `Bearer ${storage.getToken()}`,
                           Accept: 'application/json',
                           'ngrok-skip-browser-warning': '69420',
                        },
                     })
                     .then(async response2 => {
                        return response2.data.data;
                     })
                     .catch(error => {
                        console.error('Error posting user_roles:', error);
                        throw error;
                     });
               }
            })
            .catch(error => {
               console.error('Error getting user_roles:', error);
               throw error;
            });
      })
      .catch(error => {
         console.error('Error putting user changes:', error);
         throw error;
      });
};

export const addUser = async (data: UserAdd) => {
   try {
      await axios
         .post(API_URLS.REGISTER, data, {
            headers: {
               // Authorization: `Bearer ${storage.getToken()}`,
               Accept: 'application/json',
               'ngrok-skip-browser-warning': '69420',
            },
         })
         .then(async response => {
            const data2 = {
               user_id: response.data.user.id,
               role_id: data.role_id,
            };
            return await axios
               .post(`${API_URLS.USER_ROLES}`, data2, {
                  headers: {
                     Authorization: `Bearer ${storage.getToken()}`,
                     Accept: 'application/json',
                     'ngrok-skip-browser-warning': '69420',
                  },
               })
               .then(async response2 => {
                  return response2.data.data;
               })
               .catch(error => {
                  console.error('Error posting user_roles:', error);
                  throw error;
               });
         });
   } catch (error) {
      console.error('Error adding user:', error);
      throw error;
   }
};

export const fetchPermissions = async (): Promise<Permissions[]> => {
   return await axios
      .get(API_URLS.PERMISSIONS, {
         headers: {
            Authorization: `Bearer ${storage.getToken()}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
         },
      })
      .then(response => {
         return response.data.data;
      })
      .catch(error => {
         console.error('Error fetching permissions:', error);
         throw error;
      });
};

export const getPermissions = async (
   role_id: number,
): Promise<RolePermissions[]> => {
   return await axios
      .post(
         `${API_URLS.ROLE_PERMISSIONS}/searches-filters-sorts`,
         { role_id: role_id },

         {
            headers: {
               Authorization: `Bearer ${storage.getToken()}`,
               'Content-Type': 'application/json',
               'ngrok-skip-browser-warning': '69420',
            },
         },
      )

      .then(response => {
         return response.data.data;
      })

      .catch(error => {
         console.error('Error fetching role permissions:', error);
         throw error;
      });
};

export const addPermissions = async (data: any): Promise<RolePermissions[]> => {
   console.log("FUCK YOU MSU IIT GRADUATES BITCHES BUGOK", data);
   return await axios
      .post(API_URLS.ROLE_PERMISSIONS, data, {
         headers: {
            Authorization: `Bearer ${storage.getToken()}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
         },
      })
      .then(response => {
         return response.data.data;
      })
      .catch(error => {
         console.error('Error adding permissions:', error);
         throw error;
      });
};

export const removePermissions = async (
   data: RolePermissions,
): Promise<RolePermissions[]> => {
   return await axios
      .delete(`${API_URLS.ROLE_PERMISSIONS}/${data.id}`, {
         headers: {
            Authorization: `Bearer ${storage.getToken()}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
         },
      })
      .then(response => {
         return response.data.data;
      })
      .catch(error => {
         console.error('Error adding permissions:', error);
         throw error;
      });
};
