import axios from 'axios';
import apiUrl from '../../utils/apiConfig'; // Importamos apiUrl

export const createCompanyRequest = () => ({ type: 'CREATE_COMPANY_REQUEST' });
export const createCompanySuccess = (company) => ({ type: 'CREATE_COMPANY_SUCCESS', payload: company });
export const createCompanyFailure = (error) => ({ type: 'CREATE_COMPANY_FAILURE', payload: error });

export const createCompany = (companyData) => {
  return async (dispatch) => {
    dispatch(createCompanyRequest());

    const token = localStorage.getItem('token');
    const headers = { headers: { 'Authorization': `Bearer ${token}` } };

    try {
      // Usamos apiUrl para construir la URL
      const response = await axios.post(`${apiUrl}companies/create`, companyData, headers);
      dispatch(createCompanySuccess(response.data));
    } catch (error) {
      dispatch(createCompanyFailure(error.response?.data?.message || 'Something went wrong'));
    }
  };
};