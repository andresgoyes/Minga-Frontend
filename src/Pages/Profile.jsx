import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/Rectangle10.png";
import fondo1 from "../assets/Rectangle606.png";
import location from "../assets/location-marker.png";
import icon1 from "../assets/icon.png";
import Swal from 'sweetalert2';
import apiUrl from "../utils/apiConfig"; // Importa la configuración de la API

const EditAuthor = () => {
    const token = localStorage.getItem("token");
    const [authorData, setAuthorData] = useState({
        name: "",
        last_name: "",
        city: "",
        country: "",
        formattedDate: "",
        photo: ""
    });
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const convertToDateFormat = (date) => {
        return date.split("/").reverse().join("-");
    };

    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await axios.get(`${apiUrl}/users/validateToken`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const user = response.data.response;
                localStorage.setItem("userId", user._id);
                return user;
            } catch (error) {
                console.error("Error validating the token:", error);
                toast.error("Invalid token, please log in again.");
                return null;
            }
        };

        const fetchAuthor = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) throw new Error("User ID not found in localStorage.");
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const response = await axios.get(`${apiUrl}authors/byUser/${userId}`, config);
                const authorData = response.data.response[0];
                if (authorData) {
                    const formattedDate = formatDate(authorData.date);
                    setAuthorData({ ...authorData, formattedDate });
                } else {
                    toast.error("No author found for the user.");
                }
            } catch (err) {
                console.error("Error fetching author:", err);
            }

        };

        if (token) {
            validateToken().then(fetchAuthor);
        } else {
            toast.error("Token not found. Please log in.");
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            name: authorData.name,
            last_name: authorData.last_name,
            city: authorData.city,
            country: authorData.country,
            date: convertToDateFormat(authorData.formattedDate),
            photo: authorData.photo,
        };

        try {
            if (authorData._id) {
                const response = await axios.put(
                    `${apiUrl}authors/update/${authorData._id}`,
                    updatedData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success(response.data.message || "Author details updated successfully.");
            } else {
                const userId = localStorage.getItem("userId");
                const newAuthorData = { ...updatedData, user_id: userId };
                const response = await axios.post(
                    `${apiUrl}authors/create`,
                    newAuthorData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success(response.data.message || "Author created successfully.");
                setAuthorData({ ...response.data.response, formattedDate: formatDate(response.data.response.date) });
            }
        } catch (error) {
            console.error("Error saving author:", error);
            toast.error("Failed to save author details.");
        }
    };
    
    const handleDelete = async () => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'Are you sure you want to delete your account? This action cannot be undone.',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(
                        `${apiUrl}authors/delete/${authorData._id}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    Swal.fire(
                        'Deleted!',
                        response.data.message || 'Your account has been deleted.',
                        'success'
                    ).then(() => {
                        window.location.href = '/';
                    });
                } catch (error) {
                    console.error("Error deleting account:", error);
                    Swal.fire(
                        'Error!',
                        'Failed to delete account. Please try again later.',
                        'error'
                    );
                }
            }
        });
    };


    return (
        <div className="relative">
            <div className="hidden sm:block h-[60vh] bg-cover relative px-8" style={{ backgroundImage: `url(${fondo1})`, backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative h-full flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">Profile</h1>
                </div>
            </div>
            <div className="relative bg-white/90 backdrop-blur-sm flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-around lg:-mt-10 lg:my-10 lg:rounded-3xl bottom-0 left-1/2 transform -translate-x-1/2 w-screen h-screen lg:w-[80%] lg:h-[60vh] shadow-lg z-10">
                <div className="p-6">
                    <img
                        src={authorData.photo || img1}
                        alt="User Profile"
                        className="w-36 h-36 rounded-full mb-4"
                    />
                    <h2 className="text-lg font-semibold">{authorData.name} {authorData.last_name}</h2>
                    <div className="flex items-center text-gray-600 text-sm mt-2">
                        <img src={location} alt="Location Icon" className="w-5 h-5 mr-2" />
                        <span>{authorData.city} {authorData.country}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                        <img src={icon1} alt="Calendar Icon" className="w-5 h-5 mr-2" />
                        <span>{authorData.formattedDate}</span>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col items-center p-2 rounded-lg w-2/3 lg:w-96 sm:mt-2 lg:mt-0">
                    <input
                        type="text"
                        name="name"
                        value={authorData.name}
                        onChange={(e) => setAuthorData({ ...authorData, name: e.target.value })}
                        className="w-full mb-4 border-b-2 border-gray-500 focus:outline-none focus:border-green-500"
                        placeholder="First Name"
                        required
                    />
                    <input
                        type="text"
                        name="last_name"
                        value={authorData.last_name}
                        onChange={(e) => setAuthorData({ ...authorData, last_name: e.target.value })}
                        className="w-full mb-4 border-b-2 border-gray-500 focus:outline-none focus:border-green-500"
                        placeholder="Last Name"
                        required
                    />
                    <input
                        type="text"
                        name="city"
                        value={authorData.city}
                        onChange={(e) => setAuthorData({ ...authorData, city: e.target.value })}
                        className="w-full mb-4 border-b-2 border-gray-500 focus:outline-none focus:border-green-500"
                        placeholder="City"
                        required
                    />
                    <input
                        type="text"
                        name="country"
                        value={authorData.country}
                        onChange={(e) => setAuthorData({ ...authorData, country: e.target.value })}
                        className="w-full mb-4 border-b-2 border-gray-500 focus:outline-none focus:border-green-500"
                        placeholder="Country"
                        required
                    />
                    <input
                        type="date"
                        name="date"
                        value={convertToDateFormat(authorData.formattedDate)}
                        onChange={(e) => setAuthorData({ ...authorData, formattedDate: e.target.value })}
                        className="w-full mb-4 border-b-2 border-gray-500 focus:outline-none focus:border-green-500"
                        required
                    />
                    <input
                        type="url"
                        name="photo"
                        value={authorData.photo}
                        onChange={(e) => setAuthorData({ ...authorData, photo: e.target.value })}
                        className="w-full mb-4 border-b-2 border-gray-500 focus:outline-none focus:border-green-500"
                        placeholder="URL Profile Image"
                    />
                    <button
                        type="submit"
                        className="w-full h-10 p-1 mb-4 font-semibold text-white text-2xl bg-[#34D399] rounded-full hover:bg-[#4de0aa]"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="w-full h-10 p-1 text-[#EE8380] font-semibold text-2xl bg-[#FBDDDC] rounded-full hover:bg-[#ed7a76] hover:text-white"
                    >
                        Delete
                    </button>
                </form>
                <Toaster position="top-center" reverseOrder={false} />
            </div>
        </div>
    );
};

export default EditAuthor;