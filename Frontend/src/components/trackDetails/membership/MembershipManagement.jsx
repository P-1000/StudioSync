import React, { useState, useEffect } from "react";

const MembershipManagement = () => {
  
  return (
    <div className="w-full max-w-4xl h-full p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Members</h1>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">John Doe</h2>
            <button className="text-red-600 font-semibold hover:underline">
              Remove
            </button>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-4">Add Members</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Email"
            className="flex-1 p-2 border border-gray-300 rounded-lg"
          />
          <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipManagement;
