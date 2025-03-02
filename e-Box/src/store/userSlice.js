import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../components/Axios';

// Verify Token Thunk Action
export const verifyToken = createAsyncThunk(
  'user/verify',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/verify');
      return response.data;
    } catch (error) {
      // Token geçersizse localStorage ve axios header'dan temizle
      localStorage.removeItem('token');
      delete axiosInstance.defaults.headers.common['Authorization'];
      return rejectWithValue(error.response?.data?.message || 'Token verification failed');
    }
  }
);

// Login Thunk Action
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log('Login attempt:', { email, password });
      const response = await axiosInstance.post('/login', { email, password });
      console.log('API Response:', response.data);
      
      // Login başarılı olduğunda token'ı axios header'a ekle
      if (response.data.token) {
        axiosInstance.defaults.headers.common['Authorization'] = response.data.token;
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem('token');
      delete axiosInstance.defaults.headers.common['Authorization'];
    },
  },
  extraReducers: (builder) => {
    builder
      // Login reducers
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = {
          name: action.payload.role_id === '3' ? 'Customer' : action.payload.name,
          email: action.payload.email,
          role_id: action.payload.role_id,
        };
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Verify reducers
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = {
          name: action.payload.role_id === '3' ? 'Customer' : action.payload.name,
          email: action.payload.email,
          role_id: action.payload.role_id,
        };
        // Token'ı yenile
        if (action.payload.token) {
          state.token = action.payload.token;
          localStorage.setItem('token', action.payload.token);
          axiosInstance.defaults.headers.common['Authorization'] = action.payload.token;
        }
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentUser = null;
        state.token = null;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer; 