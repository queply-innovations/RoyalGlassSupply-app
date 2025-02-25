import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addUser, editUser } from '../api/UserInfo';
import { useUserInfo } from '../context/UserInfoContext';
import { useState, ChangeEvent, useEffect } from 'react';
import { Roles, User } from '../types';

export const useUserInfoMutation = (selectedUser: User, roles: any) => {
  const queryClient = useQueryClient();

  const [password, setPassword] = useState('');
  const [compPassword, setCompPassword] = useState('');

  const [user, setUser] = useState({
    firstname: selectedUser.firstname,
    lastname: selectedUser.lastname,
    username: selectedUser.username,
    email: selectedUser.email,
    contact_no: selectedUser.contact_no,
    position: selectedUser.position,
    user_id: selectedUser.id,
    role_id: 0,
  });

  useEffect(() => {
    if (roles) {
      setUser(prev => ({
        ...prev,
        role_id: roles.find(
          (role: Roles) => role.title === selectedUser.position,
        )?.id,
      }));
    }
  }, [roles]);

  // const [ roleId, setRoleId ] = useState(roles.find((role: Roles) => role.title === selectedUser.position)?.id);

  const [isChanged, setIsChanged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChangeSelect = (key: string, _value: any) => {
    setIsChanged(true);
    setSuccess(null);
    setError(null);
    console.log(key, _value);
    setUser(prev => ({
      ...prev,
      [key]: _value,
    }));
  };

  const handleChange = (e: any) => {
    setIsChanged(true);
    setSuccess(null);
    if (e.target.name === 'position') {
      
      setUser(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
        role_id: roles.find((role: Roles) => role.title === e.target.value)?.id,
      }));
    } else if (e.target.name === 'new_password') {
      setPassword(e.target.value);
    } else if (e.target.name === 'confirm_password') {
      setCompPassword(e.target.value);
    } else {
      setUser(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  useEffect(() => {
    if (password != compPassword) {
      setError("Passwords don't match");
    } else {
      setError(null);
    }
  }, [password, compPassword]);

  const handleSubmit = async () => {
    if (user.contact_no?.length > 11 || user.contact_no?.length < 11) {
      setError('Contact number must be 11 digits');
    } else {
      setIsSubmitting(true);
      if (password !== '' && compPassword !== '') {
        setUser(prev => ({
          ...prev,
          password: compPassword,
        }));
      }
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      editUserMutation(user);
    }
  }, [user, isSubmitting]);

  // Configurations for mutation
  const mutationConfig = {
    onSuccess: async () => {
      // Reset loading state
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsSubmitting(false);
      setIsChanged(false);
      setSuccess('User info has been updated');
    },
    onError: (error: any) => {
      console.error(error);
      setError(error.message);
      setIsSubmitting(false);
    },
  };

  const { mutateAsync: editUserMutation } = useMutation({
    mutationKey: ['editUser'],
    mutationFn: editUser,
    ...mutationConfig,
  });

  return {
    // value,
    // setValue,
    user,
    isChanged,
    isSubmitting,
    password,
    compPassword,
    error,
    setError,
    success,
    handleSubmit,
    handleChangeSelect,
    handleChange,
    editUserMutation,
  };
};
