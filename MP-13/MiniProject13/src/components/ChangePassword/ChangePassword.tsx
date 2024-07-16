// import React from 'react';
import { useState } from 'react';
import { changePassword } from '@services/index';
import { Button } from '@nextui-org/react';
import toast from 'react-hot-toast';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isloading, setIsLoading] = useState(false);

  const handleSavePassword = async () => {
    setIsLoading(true);
    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      toast.error(`New password and confirm password do not match.`, { duration: 2000, position: 'top-center',});
      setIsLoading(false);
      return;
    }

    const result = await changePassword(oldPassword, newPassword);
    if (result === 'success') {
      toast.success(`Password changed successfully!`, { duration: 2000, position: 'top-center',});
      setIsLoading(false);
      setOldPassword('');
      setNewPassword(''); 
      setConfirmPassword('');
    } else {
      toast.error(`Failed to change password. Please try again. ${result}`, { duration: 2000, position: 'top-center',});
      setIsLoading(false);
      setOldPassword('');
      setNewPassword(''); 
      setConfirmPassword('');
    }
  };

  return (
    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-md">
      <h2 className="text-lg dark:text-white font-semibold mb-4">Change your password</h2>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-white font-semibold mb-2">Current password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
          Forgot password?
        </a>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-white font-semibold mb-2">New password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border dark:border-neutral-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-white font-semibold mb-2">Confirm password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border dark:border-neutral-800  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {
        isloading === false ?
          <Button
            radius="full"
            className="rounded-full bg-sky-500 text-white border-none font-bold"
            onClick={handleSavePassword}
          >
            Update password
          </Button>
          :
          <Button
            radius="full"
            className="rounded-full bg-sky-500 text-white border-none font-bold"
            isDisabled
          >
            Update password
          </Button>
      }
    </div>
  );
};

export default ChangePassword;