import {
    READ_COMPANIES_REQUEST,
    READ_COMPANIES_SUCCESS,
    READ_COMPANIES_ERROR,
    CREATE_COMPANY_REQUEST,
    CREATE_COMPANY_SUCCESS,
    CREATE_COMPANY_ERROR,
  } from '../actions/companyActions';
  
  const initialState = {
    companies: [],
    loading: false,
    error: null,
  };
  
  const companyReducer = (state = initialState, action) => {
    switch (action.type) {
      // Leer empresas
      case READ_COMPANIES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case READ_COMPANIES_SUCCESS:
        return {
          ...state,
          companies: action.payload,
          loading: false,
          error: null,
        };
      case READ_COMPANIES_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      // Crear empresa
      case CREATE_COMPANY_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CREATE_COMPANY_SUCCESS:
        return {
          ...state,
          companies: [...state.companies, action.payload],
          loading: false,
          error: null,
        };
      case CREATE_COMPANY_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default companyReducer;  