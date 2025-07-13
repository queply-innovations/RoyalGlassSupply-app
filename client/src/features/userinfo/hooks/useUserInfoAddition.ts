import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addUser } from '../api/UserInfo';
import { useUserInfo } from '../context/UserInfoContext';
import { useEffect, useState } from 'react';
import { UserAdd } from '../types';
import { User } from '@/entities';

export const useUserInfoAddition = () => {
   const queryClient = useQueryClient();
   const { users } = useUserInfo();
   const { roles } = useUserInfo();

   const [user, setUser] = useState({} as UserAdd);
   useEffect(() => {
      setUser(prev => ({
         ...prev,
         active_status: 'active',
         // id: lastId,
      }));
   }, []);

   const [isChanged, setIsChanged] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);
   const [success, setSuccess] = useState<string | null>(null);
   // const [ status, setStatus ] = useState<string | null>(null);

   const isFormValid = () => {
      const headers: Array<Object> = Object.keys(user).map(key => {
         return { text: key };
      });

      const formChecker = headers.length === 10 ? true : false;

      if (formChecker) {
         const passwordChecker =
            user.password === user.password_confirmation ? true : false;
         if (!passwordChecker)
            return [passwordChecker, 'Passwords do not match'];

         const numberChecker =
            user.contact_no?.length > 11 || user.contact_no?.length < 11
               ? false
               : true;
         if (!numberChecker)
            return [numberChecker, 'Please input a valid contact number'];

         const checker = formChecker && passwordChecker && numberChecker;
         return [checker, ''];
      } else {
         const positionChecker = user.position ? true : false;
         if (!positionChecker)
            return [positionChecker, 'Please choose a position'];
         else {
            return [formChecker, 'Please correctly fill up all fields'];
         }
      }
   };

   const handleChange = (e: any) => {
      setIsChanged(true);
      setSuccess(null);
      setError(null);
      setUser(prev => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };

   const handleChangeSelect = (key: string, _value: any) => {
      setIsChanged(true);
      setSuccess(null);
      setError(null);
      setUser(prev => ({
         ...prev,
         [key]: _value,
         role_id: roles.find((role: any) => role.title === _value)?.id,
      }));
   };

   const handleSubmit = async () => {
      const checker: any = isFormValid();
      setIsSubmitting(true);
      if (checker[0]) {
         return await addUserMutation(user);
      } else {
         setError(checker[1]);
         setIsSubmitting(false);
      }
   };

   // Configurations for mutation
   const mutationConfig = {
      onSuccess: async () => {
         // Reset loading state
         await queryClient.invalidateQueries({ queryKey: ['users'] });
         setIsSubmitting(false);
         setIsChanged(false);
         setSuccess('User info has been added');
      },
      onError: (error: any) => {
         console.error(error);
         setError(error.response.data.message);
         setIsSubmitting(false);
      },
   };

   const { mutateAsync: addUserMutation } = useMutation({
      mutationKey: ['addUser'],
      mutationFn: addUser,
      ...mutationConfig,
   });

   return {
      // value,
      // setValue,
      user,
      isChanged,
      isSubmitting,
      error,
      setError,
      success,
      handleSubmit,
      handleChange,
      handleChangeSelect,
      addUserMutation,
   };
};
