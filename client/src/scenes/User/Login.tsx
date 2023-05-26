import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import axios from 'axios';

const Login = ({ onLogin }: { onLogin: (childData: any) => void }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd);

    try {
      const response = await axios.post('/api/login', {
        username: user,
        password: pwd,
      });

      if (response.data.message) {
        console.log(response.data);
        setErrMsg(response.data.message);
        setLoginStatus(response.data.message);
      } else {
        console.log(response.data);
        setLoginStatus(response.data.username);
        onLogin(response.data);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setErrMsg('Échec de la connexion');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Se connecter
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nom d'utilisateur"
            name="username"
            autoComplete="username"
            autoFocus
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Se souvenir de moi"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Se connecter
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Mot de passe oublié ?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/Register" variant="body2" color={colors.primary[100]}>
                Vous n'avez pas de compte ? S'inscrire
              </Link>
            </Grid>
          </Grid>
          {errMsg && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {errMsg}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;