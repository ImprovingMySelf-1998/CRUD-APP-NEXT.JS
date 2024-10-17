"use client"
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

function EditUser({ userId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const fetchUserData = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/user?id=${userId}`
      );
      if (response.ok) {
        const userData = await response.json();
        setName(userData.name || "");
        setEmail(userData.email || "");
        setPhone(userData.phone || "");
      } else {
        setMessage("Failed to fetch user data.");
      }
    } catch (error) {
      setMessage("Error fetching user data.");
    }
  }, [userId]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  async function handleSubmit(e) {
    e.preventDefault();

    const requestData = {
      name,
      email,
      phone,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/user?id=${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        setMessage("Success: User updated.");
        fetchUserData();
        router.refresh();
        router.push("/");
      } else {
        setMessage("Error updating user data.");
      }
    } catch (error) {
      setMessage("Error updating user data.");
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>
      {message && <div className="mb-4 text-green-500">{message}</div>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="w-full p-2 border border-gray-300 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditUser;
