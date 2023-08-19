import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Snackbar, Alert, Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { UserAuth } from '../../../context/AuthContext';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------
//
export default function LoginForm() {
 
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal,open } = state;
 
  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField value={email} name="email" label="Email address" onChange={(e) => setEmail(e.target.value)} />

          <TextField
            name="password"
            label="Password"
            type={'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <Iconify icon={'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Checkbox name="remember" label="Remember me" />
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton  fullWidth size="large" type="submit" variant="contained">
          Login
        </LoadingButton>
        {error && (
          <Snackbar
            autoHideDuration={2000}
            anchorOrigin={{ vertical, horizontal }}
            open={ handleClick}
            onClose={handleClose}
            key={vertical + horizontal}
          >
            <Alert severity="error" sx={{ width: '100%' }}>
              Error al iniciar sesion!
            </Alert>
          </Snackbar>
        )}
      </form>
    </>
  );
}
