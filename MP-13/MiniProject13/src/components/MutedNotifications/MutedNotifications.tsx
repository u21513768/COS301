// import React from 'react';

const MutedNotifications = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Muted notifications</h2>
      <h3 className="text-gray-700 font-semibold mb-2">Mute notifications from people:</h3>
      <div className="flex flex-col">
        <label className="flex items-center mb-2">
          <input type="checkbox" className="mr-2" />
          <span className="text-gray-600">You don't follow</span>
        </label>
        <label className="flex items-center mb-2">
          <input type="checkbox" className="mr-2" />
          <span className="text-gray-600">Who don't follow you</span>
        </label>
        <label className="flex items-center mb-2">
          <input type="checkbox" className="mr-2" />
          <span className="text-gray-600">With a new account</span>
        </label>
        <label className="flex items-center mb-2">
          <input type="checkbox" className="mr-2" />
          <span className="text-gray-600">Who have a default profile photo</span>
        </label>
        <label className="flex items-center mb-2">
          <input type="checkbox" className="mr-2" />
          <span className="text-gray-600">Who haven't confirmed their email</span>
        </label>
        <label className="flex items-center mb-2">
          <input type="checkbox" className="mr-2" />
          <span className="text-gray-600">Who haven't confirmed their phone number</span>
        </label>
      </div>
      <p className="text-gray-600 mt-4">
        These filters won't affect notifications from people you follow.{' '}
        <a href="#" className="text-blue-500 hover:text-blue-700">
          Learn more
        </a>
      </p>
    </div>
  );
};

export default MutedNotifications;