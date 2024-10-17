"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

async function fetchUsers() {
  try {
    const res = await fetch("http://localhost:3000/api");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

async function deleteUser(userId) {
  try {
    const res = await fetch(`http://localhost:3000/api?id=${userId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete user");
    }
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
}

function AddUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };

    getUsers();
  }, []);

  const handleDelete = async (userId) => {
    const isDeleted = await deleteUser(userId);
    if (isDeleted) {
      setUsers(users.filter((user) => user.id !== userId));
    } else {
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">User List</h2>
      <div className="bg-white shadow-md rounded-lg p-4 overflow-hidden">
        {users.length === 0 ? (
          <div className="text-center text-red-600 flex items-center justify-center mb-4">
            <span className="text-2xl mr-2">⚠️</span>
            <strong>No data available. Please add some users.</strong>
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-2 py-1 text-center">Name</th>
                    <th className="border border-gray-300 px-2 py-1 text-center">Email</th>
                    <th className="border border-gray-300 px-2 py-1 text-center">Phone Number</th>
                    <th className="border border-gray-300 px-2 py-1 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border border-gray-300">
                      <td className="border border-gray-300 px-2 py-1 text-center">{user.name}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">
                        {user.email.split("@")[0]}
                        <br />
                        <span className="text-gray-500">{`@${user.email.split("@")[1]}`}</span>
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-center">{user.phone}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">
                        <Link href={`/editTopic/${user.id}`}>
                          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2">
                            Edit
                          </button>
                        </Link>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden">
              {users.map((user) => (
                <div key={user.id} className="bg-gray-100 shadow-md rounded-lg p-4 mb-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-gray-300 pb-2">
                    <div className="text-center font-bold py-1">Name:</div>
                    <div className="text-center py-1">{user.name}</div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-gray-300 pb-2">
                    <div className="text-center font-bold py-1">Email:</div>
                    <div className="text-center py-1">
                      {user.email.split("@")[0]}
                      <br />
                      <span className="text-gray-500">{`@${user.email.split("@")[1]}`}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-gray-300 pb-2">
                    <div className="text-center font-bold py-1">Phone:</div>
                    <div className="text-center py-1">{user.phone}</div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 pb-2">
                    <div className="text-center font-bold py-1">Actions:</div>
                    <div className="text-center">
                      <Link href={`/editTopic?id=${user.id}`}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AddUser;
