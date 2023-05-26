import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import Header from '../../components/Header';

const Settings = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender);
  const [birthday, setBirthday] = useState(user.birthday);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      // Make an API call to update the user's information
      await axios.put(`/api/user/${user.id}`, {
        username,
        email,
        gender,
        birthday,
      });

      // Show a success message or perform any other actions after successful update
      console.log('User information updated successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m={'20px'} >
      <Header title={'Paramètres du compte'} subtitle={'Ajouter, Supprimer et Modifier toutes vos informations personnelles.'} addlink={''} withbtn={false} variant={''}/>
    <Box m={'20px'} sx={{ maxWidth: 500, margin: 'auto', textAlign: 'center' }} mt={'100px'}>
      <Typography variant="h4" gutterBottom>
      Paramètres du compte
      </Typography>

      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <TextField
            label="Nom d'utilisateur"
            variant="outlined"
            fullWidth
            value={username}
            onChange={handleUsernameChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleEmailChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Genre</InputLabel>
            <Select value={gender} onChange={handleGenderChange} label="Genre">
              <MenuItem value="Male">Homme</MenuItem>
              <MenuItem value="Female">Femme</MenuItem>
              <MenuItem value="Other">Autre</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="date"
            label="Date de naissance"
            variant="outlined"
            fullWidth
            value={birthday}
            onChange={handleBirthdayChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSaveChanges}>
            Enregistrer les modifications
          </Button>
        </Grid>
      </Grid>
    </Box>
    </Box>
  );
};

export default Settings;
