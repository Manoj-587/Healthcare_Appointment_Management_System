import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  registerDoctor: (doctorData) => api.post('/auth/register/doctor', doctorData),
  registerAdmin: (adminData) => api.post('/auth/register/admin', adminData),
};

export const doctorAPI = {
  getAll: () => api.get('/doctors'),
  search: (params) => api.get('/doctors/search', { params }),
  getProfile: () => api.get('/doctors/profile'),
  updateProfile: (data) => api.put('/doctors/profile', data),
  updateAvailability: (availability) => api.put('/doctors/availability', availability),
};

export const appointmentAPI = {
  book: (appointmentData) => api.post('/appointments/patient/book', appointmentData),
  getPatientAppointments: () => api.get('/appointments/patient/my-appointments'),
  getDoctorAppointments: () => api.get('/appointments/doctor/my-appointments'),
  approve: (id) => api.put(`/appointments/doctor/${id}/approve`),
  reject: (id) => api.put(`/appointments/doctor/${id}/reject`),
  cancel: (id) => api.put(`/appointments/${id}/cancel`),
  getAll: () => api.get('/appointments/admin/all'),
};

export const patientAPI = {
  getProfile: () => api.get('/patient/profile'),
  updateProfile: (data) => api.put('/patient/profile', data),
};

export const adminAPI = {
  createDoctor: (doctorData) => api.post('/admin/doctors', doctorData),
  getAllDoctors: () => api.get('/admin/doctors'),
  updateDoctor: (id, data) => api.put(`/admin/doctors/${id}`, data),
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  getAllAppointments: () => api.get('/admin/appointments'),
};

export default api;