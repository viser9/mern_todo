import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

import { toast, Toaster } from "react-hot-toast";
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Todo Site
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function List() {
  const[task,setTask] = React.useState();
  const[description,setDescription] = React.useState(); 
  const[todos,setTodos] = React.useState([]); 

  function render(){
    axios.get('/user/todo',{
        params:{
            token : localStorage.getItem('token')
        }
    }).then((res)=>{
        let goodData = res.data;
        setTodos(goodData.todos)
    }).catch((err)=>{
        console.log(err);
    }
    )
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/user/todo',{
        token : localStorage.getItem('token'),
        title : task,
        description : description
    }).then((res)=>{
        console.log(res.data.todos);
        render();
        toast.success('new todo added')
        setTodos([...todos,res.data.todos]);
        setTask('');
        setDescription('');
      }).catch((err)=>{
        console.log(err)
      })
  };

  function deleteTodo(id){
    console.log(id)
    axios.post('/user/deleteTodo',{
        id : id
    }).then((res)=>{
        console.log('item deleted');
        toast.error('Todo deleted')
        setTodos(todos.filter(todo => todo._id !== id));
    }).catch((err)=>{
        console.log(err);
    })
  }

  React.useEffect(()=>{
    render();
  },[])


  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            
          }}
        >
            <Box sx={{my:8,mx: 20}}>
                {
                    todos.map((item,index)=>(
                        <Box
                        sx={{
                            display:'flex',
                            alignItems:'space-around'
                        }}>
                            <Box
                            sx={{
                                my:2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                border:1,
                                borderRadius:1,
                                background:"#d8d8d8",
                                width:"100%",
                                opacity:"90%"
                            }}
                            >
                            {<div key={item.index}><b>TASK  : </b>{item.title}</div>}
                            {<div key={item.index}><b>DESCRIPTION : </b>{item.description}</div>}
                            </Box>
                            <IconButton aria-label="delete" onClick={() => deleteTodo(item._id)} sx={{opacity:"100%"}}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                        
                    ))
                }
            </Box>
            
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 25,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <AddTaskIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Todo List
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="task"
                label="Task"
                name="task"
                autoComplete="text"
                autoFocus
                onChange={(e)=>setTask(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="description"
                label="Description"
                type="text"
                id="description"
                autoComplete="text"
                onChange={(e)=>setDescription(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Toaster position="bottom-right" toastOptions={{ duration: 2000 }}/>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}