import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Recipe from './Recipe';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 3px',
    display: 'flex',
    margin: '10px auto',
    alignItems: 'center',
    width: 300,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  
}));

function App() {
  const APP_ID = "1dccf99d";
  const APP_KEY = "c704e40263df7dd231004c206cf5e2c6";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  const classes = useStyles();

  useEffect(() => {
    getRecipe();
  }, [query]);

  const getRecipe = async () => {
    const response = await axios.get(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&imageSize=REGULAR`
      );
      setRecipes(response.data.hits);
      console.log(response.data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  const updateQuery = (e) =>{
    e.preventDefault();
    setQuery(search);
  }

  return (
    <div className='App'>
      <h2>Food Search App</h2>

    <Paper onSubmit={updateQuery} component="form" className={classes.root}>
      <InputBase
        type="text" 
        value={search} 
        onChange={updateSearch}
        className={classes.input}
        placeholder="Search Recipe"
        inputProps={{ 'roboto': 'Search Recipe' }}
      />
      <IconButton 
        type="submit" 
        className={classes.iconButton} 
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
      
      {/* <form onSubmit={updateQuery}>
        <input type="text" value={search} onChange={updateSearch} />
        <button type="submit">Search</button>
      </form> */}

      <Grid container>
      {recipes.map((recipe) => (
          <Grid item xs={3}>
          <Recipe
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
          />
          </Grid>
      ))};
      </Grid>
    </div>
  );
}
export default App;
