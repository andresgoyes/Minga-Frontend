import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {  User, Users, MapPin, ToggleLeft, ToggleRight } from 'lucide-react';
import backgroundImage from '../assets/junta_de_trabajo.jpeg';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('companies');
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const filterBySearchTerm = (data) => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredCompanies = useMemo(() => filterBySearchTerm(companies), [companies, searchTerm]);
  const filteredAuthors = useMemo(() => filterBySearchTerm(authors), [authors, searchTerm]);

  const fetchDataForTab = async (tab) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const endpoint = tab === 'companies' ? '/api/dashboard/companies' : '/api/dashboard/authors';
      const { data } = await axios.get(`http://localhost:8080${endpoint}`, config);
      tab === 'companies' ? setCompanies(data.response.companies) : setAuthors(data.response.authors);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataForTab(activeTab);
  }, [activeTab]);

  const toggleStatus = async (id, type) => {
    const newStatus = type === 'companies' ? companies : authors;
    const updatedData = newStatus.map((item) =>
      item._id === id ? { ...item, active: !item.active } : item
    );
    type === 'companies' ? setCompanies(updatedData) : setAuthors(updatedData);

    const data = {
      id,
      active: !newStatus.find(item => item._id === id).active,
    };

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const url = type === 'companies'
        ? 'http://localhost:8080/api/dashboard/companies/toggle'
        : 'http://localhost:8080/api/dashboard/authors/toggle';

      await axios.put(url, data, config);
    } catch (err) {
      setError('Failed to update status. Please try again later.');
    }
  };

  const authorColors = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
  };

  const getAuthorColor = (color) => authorColors[color] || 'bg-gray-500';

  const getTeamColor = (teamName) => {
    const colors = {
      'Blue Team': 'bg-blue-500',
      'Red Team': 'bg-red-500',
      'Orange Team': 'bg-orange-500',
      'Purple Team': 'bg-purple-500'
    };
    return colors[teamName] || 'bg-gray-500';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const TableRow = ({ item, type }) => (
    <tr key={item._id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {type === 'companies' ? <Building2 className="h-5 w-5 text-gray-400 mr-3" /> : <Users className="h-5 w-5 text-gray-400 mr-3" />}
          <span className="text-sm text-gray-900">{item.name}</span>
        </div>
      </td>
      {type === 'companies' ? (
        <>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-500">{item.website}</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <img src={item.photo || '/default-avatar.png'} alt={item.name} className="w-10 h-10 rounded-full mr-3" />
            </div>
          </td>
        </>
      ) : (
        <>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-sm text-gray-500">{formatDate(item.date)}</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-900">{item.city}</span>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <img src={item.photo || '/default-avatar.png'} alt={item.name} className="w-10 h-10 rounded-full mr-3" />
            </div>
          </td>
        </>
      )}
      <td className="px-6 py-4 whitespace-nowrap">
        <button onClick={() => toggleStatus(item._id, type)} className="text-gray-400 hover:text-gray-500 transition-colors duration-200">
          {item.active ? <ToggleRight className="h-6 w-6 text-blue-500" /> : <ToggleLeft className="h-6 w-6" />}
        </button>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="h-[60vh] bg-cover relative px-8" style={{ backgroundImage: `url(${backgroundImage})`, backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Panel</h1>
        </div>
      </div>

      {/* Panel Container */}
      <div className="mx-auto px-8 -mt-20 relative z-10 max-w-4xl">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6">
          {/* Title */}
          <h2 className="text-center text-xl font-semibold mb-2">Entities</h2>
          
          {/* Purple line under Entities */}
          <div className="w-16 h-1 bg-indigo-600 mx-auto mb-6"></div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-6 border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('companies')} 
              className={`flex-1 py-2 text-sm font-medium ${
                activeTab === 'companies' 
                  ? 'bg-indigo-600 text-white rounded-t-lg' 
                  : 'text-gray-600'
              }`}
            >
              Companies
            </button>
            <button 
              onClick={() => setActiveTab('authors')} 
              className={`flex-1 py-2 text-sm font-medium ${
                activeTab === 'authors' 
                  ? 'bg-indigo-600 text-white rounded-t-lg' 
                  : 'text-gray-600'
              }`}
            >
              Authors
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                {activeTab === 'companies' ? (
                  // Companies table rows
                  companies.map((company) => (
                    <tr key={company._id} className="text-sm">
                      <td className="py-3 pl-4">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <Users className={`h-5 w-5 ${getTeamColor(company.team)} text-white rounded-sm p-1`} />
                            <span>{company.name}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-gray-500">{company.website}</td>
                      <td className="py-3">
                        <div className="flex justify-start ml-10">
                          <img 
                            src={company.photo || "/api/placeholder/40/40"} 
                            alt={company.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                          />
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <button onClick={() => toggleStatus(company._id, 'companies')} className="ml-auto">
                          {company.active ? (
                            <ToggleRight className="h-6 w-6 text-indigo-600" />
                          ) : (
                            <ToggleLeft className="h-6 w-6 text-gray-400" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  // Authors table rows
                  authors.map((author) => (
                    <tr key={author._id} className="text-sm">
                      <td className="py-3 pl-4">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <User className={`h-5 w-5 ${getAuthorColor(author.color)} text-white rounded-sm p-1`} />
                            <span>{author.name}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-gray-500">
                        {formatDate(author.date)}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {author.city}
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex justify-center">
                          <img 
                            src={author.photo || "/api/placeholder/40/40"} 
                            alt={author.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                          />
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <button onClick={() => toggleStatus(author._id, 'authors')} className="ml-auto">
                          {author.active ? (
                            <ToggleRight className="h-6 w-6 text-indigo-600" />
                          ) : (
                            <ToggleLeft className="h-6 w-6 text-gray-400" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;