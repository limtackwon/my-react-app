import axios from 'axios';

const api = axios.create({ baseURL: '' });

export const getStats        = ()            => api.get('/api/v1/stats');
export const getActivities   = (limit = 5)   => api.get(`/api/v1/activities?limit=${limit}`);
export const getActivity     = (id)          => api.get(`/api/v1/activities/${id}`);
export const getPayments     = ()            => api.get('/api/v1/payments');
export const getDonations    = ()            => api.get('/api/csr/donations');
export const submitVolunteer = (data)        => api.post('/api/csr/volunteer', data);
