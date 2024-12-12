import axios from "axios";

export const createCompanyRequest = () => ({ type: 'CREATE_COMPANY_REQUEST' });
export const createCompanySuccess = (company) => ({ type: 'CREATE_COMPANY_SUCCESS', payload: company });
export const createCompanyFailure = (error) => ({ type: 'CREATE_COMPANY_FAILURE', payload: error });

export const createCompany = (companyData) => {
  return async (dispatch) => {
    dispatch(createCompanyRequest());

    const token = localStorage.getItem('token');
    const headers = { headers: { 'Authorization': `Bearer ${token}` } };

    try {
      const response = await axios.post('http://localhost:8080/api/companies/create', companyData, headers);
      dispatch(createCompanySuccess(response.data));
    } catch (error) {
      dispatch(createCompanyFailure(error.response?.data?.message || 'Something went wrong'));
    }
  };
};
