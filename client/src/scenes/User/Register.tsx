import { useRef, useState, useEffect } from "react";
import {
    Button,
    Grid,
    Link,
    TextField,
    Typography,
  } from '@mui/material';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import {
    faCheck,
    faInfoCircle,
    faTimes,
  } from '@fortawesome/free-solid-svg-icons';
  
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const REGISTER_URL = '/register';

const Register = () => {
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
      setErrMsg("Invalid Entry");
      return;
    }
    setSuccess(true);
    console.log({ user, pwd });
    // try {
    //     const response = await axios.post(REGISTER_URL,
    //         JSON.stringify({ user, pwd }),
    //         {
    //             headers: { 'Content-Type': 'application/json' },
    //             withCredentials: true
    //         }
    //     );
    //     console.log(response?.data);
    //     console.log(response?.accessToken);
    //     console.log(JSON.stringify(response))
    //     setSuccess(true);
    //     //clear state and controlled inputs
    //     //need value attrib on inputs for this
    //     setUser('');
    //     setPwd('');
    //     setMatchPwd('');
    // } catch (err) {
    //     if (!err?.response) {
    //         setErrMsg('No Server Response');
    //     } else if (err.response?.status === 409) {
    //         setErrMsg('Username Taken');
    //     } else {
    //         setErrMsg('Registration Failed')
    //     }
    //     errRef.current.focus();
    // }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
          <label htmlFor="username">
  Username:
  {user ? (
    <FontAwesomeIcon
      icon={validName ? faCheck : faTimes}
      className={validName ? "valid" : "invalid"}
    />
  ) : null}
</label>
<input
  type="text"
  id="username"
  autoComplete="off"
  onChange={(e) => setUser(e.target.value)}
  value={user}
  required
  aria-invalid={validName ? "false" : "true"}
  aria-describedby="uidnote"
  onFocus={() => setUserFocus(true)}
  onBlur={() => setUserFocus(false)}
/>
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="password">
  Password:
  {pwd && (
    <FontAwesomeIcon
      icon={validPwd ? faCheck : faTimes}
      className={pwd ? (validPwd ? "valid" : "invalid") : "hide"}
    />
  )}
</label>
<input
  type="password"
  id="password"
  onChange={(e) => setPwd(e.target.value)}
  value={pwd}
  required
  aria-invalid={validPwd ? "false" : "true"}
  aria-describedby="pwdnote"
  onFocus={() => setPwdFocus(true)}
  onBlur={() => setPwdFocus(false)}
/>

<label htmlFor="confirm_pwd">
  Confirm Password:
  {matchPwd && (
    <FontAwesomeIcon
      icon={validMatch ? faCheck : faTimes}
      className={
        matchPwd ? (validMatch ? "valid" : "invalid") : "hide"
      }
    />
  )}
</label>
<input
  type="password"
  id="confirm_pwd"
  onChange={(e) => setMatchPwd(e.target.value)}
  value={matchPwd}
  required
  aria-invalid={validMatch ? "false" : "true"}
  aria-describedby="confirmnote"
  onFocus={() => setMatchFocus(true)}
  onBlur={() => setMatchFocus(false)}
/>

<p
  id="confirmnote"
  className={
    matchFocus && !validMatch ? "instructions" : "offscreen"
  }
>
  <FontAwesomeIcon icon={faInfoCircle} />
  Must match the first password input field.
</p>


            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="#">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
