import { useState, useEffect } from "react";
import { tokens } from "../../theme";
import {
  Box,
  useTheme,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Container from '@mui/material/Container';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const REGISTER_URL = '/register';

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Entrée invalide");
      return;
    }
    setSuccess(true);
    console.log({ user, pwd });
    axios.post("/api/register", {
      username: user,
      password: pwd,
    }).then((response) => {
      console.log(response);
      navigate('/');
    });
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Succès !</h1>
          <p>
            <a href="/">Se connecter</a>
          </p>
        </section>
      ) : (
        <section>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <p
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                S'inscrire
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Nom d'utilisateur"
                  name="username"
                  type="text"
                  autoFocus
                  id="username"
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  error={!validName}
                  helperText={
                    userFocus && user && !validName ? (
                      <span>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 à 24 caractères.
                        <br />
                        Doit commencer par une lettre.
                        <br />
                        Lettres, chiffres, traits de soulignement et tirets autorisés.
                      </span>
                    ) : null
                  }
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <TextField
                  name="password"
                  label="Mot de passe"
                  margin="normal"
                  fullWidth
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  error={!validPwd}
                  helperText={
                    pwdFocus && pwd ? (
                      <span>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Doit contenir de 8 à 24 caractères.
                        <br />
                        Doit inclure au moins une lettre majuscule, une lettre minuscule,
                        un chiffre et un caractère spécial.
                      </span>
                    ) : null
                  }
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <TextField
                  name="confirmpassword"
                  label="Confirmer le mot de passe"
                  type="password"
                  fullWidth
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  error={!validMatch}
                  helperText={
                    matchFocus && !validMatch ? (
                      <span>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Doit correspondre au premier champ de mot de passe.
                      </span>
                    ) : null
                  }
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <Button
                  type="submit"
                  disabled={!validName || !validPwd || !validMatch}
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  S'inscrire
                </Button>
              </Box>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link href="/" variant="body2" color={colors.primary[100]}>
                    Vous avez déjà un compte ? Se connecter
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </section>
      )}
    </>
  );
};

export default Register;
