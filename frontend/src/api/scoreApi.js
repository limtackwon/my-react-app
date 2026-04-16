import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

export const getScores = () =>
  api.get('/scores').then(r => r.data);

export const submitScore = (username, score) =>
  api.post('/scores', { username, score }).then(r => r.data);
