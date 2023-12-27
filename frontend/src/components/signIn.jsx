import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Link ,useNavigate } from 'react-router-dom';

import { toast, Toaster } from "react-hot-toast";


const defaultTheme = createTheme();

export default function SignIn() {
  const [userName,setUserName] = React.useState();
  const [password,setPassword] = React.useState();
  const navigateTo = useNavigate();

  function putData(){
    return new Promise((resolve)=>{
      axios.post('/user/signin',{
        username : userName,
        password : password
      }).then((res)=>{
        resolve("User created Successfully")
        console.log(res.data);
      }).catch((err)=>{
        toast.error('Enter valid username or password')
        console.log(err)
      })
    })
  }

  async function handleSubmit(event){
    event.preventDefault();
    try{
      const result = await putData();
      toast.success('new user added')
      console.log(result);
      setTimeout(()=>{
        navigateTo('/login');
      },2000)
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <HowToRegIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onChange={(e)=>setUserName(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Toaster toastOptions={{ duration: 4000 }} />
            <Grid container>
              <Grid item>
                <Link to="/login" variant="body2">
                  {"Already have an account? Log In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}