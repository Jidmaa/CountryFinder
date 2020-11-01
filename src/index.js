import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import GithubCorner from 'react-github-corner';
import axios from "axios";
import {
  TextField,
  Container,
  ListItem,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  Toolbar,
  Grid,
  CardContent,
  AppBar,
  Box,
  Modal,
  Paper,
  List,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import "fontsource-roboto";
const SearchCountries = ({ searchedCountry, shownCountries }) => {
  function getModalStyle() {
    const top = 30;
    const left = 25;

    return {
      top: `${top}%`,
      margin: "auto",
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const [modalStyle] = useState(getModalStyle);
  const showCountry = (searchedCountry) => (
    <Card>
      <CardActionArea onClick={() => handleOpen()}>
        <CardMedia
          component="img"
          image={searchedCountry.flag}
          width="50"
          height="30"
          style={stylesCountry.media}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {searchedCountry.name}
          </Typography>
          <Typography variant="h5">
            Capital :
            <Typography variant="h6">{searchedCountry.capital}</Typography>
          </Typography>
          <br />
          <Typography variant="h5">
            Population :
            <Typography variant="h6">{searchedCountry.population}</Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const styles = {
    media: {
      height: 450,
      width: 650,
    },
  };
  const stylesCountry = {
    media: {
      height: 300,
      width: 500,
    },
  };
 
  if (searchedCountry)
    return (
      <>
        {showCountry(searchedCountry)}
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card>
              <Grid container direction="row" spacing={2} alignItems="center">
                <Grid item>
                  <Card>
                    <CardMedia
                      component="img"
                      image={searchedCountry.flag}
                      style={styles.media}
                    ></CardMedia>
                  </Card>
                </Grid>
                <Grid item>
                  <Card>
                    <Typography variant="h2">{searchedCountry.name}</Typography>
                    <Typography variant="h5">
                      Capital : {searchedCountry.capital}
                    </Typography>
                    <Typography variant="h5">
                      Population : {searchedCountry.population}
                    </Typography>
                    <Typography variant="h5">
                      Region : {searchedCountry.region}
                    </Typography>
                    <Typography variant="h5">
                      <List>
                        Language(s) :
                        {searchedCountry.languages.map((language) => (
                          <ListItem> {language.name} </ListItem>
                        ))}
                      </List>
                    </Typography>

                    <Typography variant="h5">
                      <List>
                      Currencie(s) :
                      {searchedCountry.currencies.map(
                        (currency) => <ListItem>{currency.name} </ListItem>
                      )}
                      </List>
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Card>
          </Modal>
        </div>
      </>
    );

};
const App = () => {
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const [countries, setCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState("");

  const shownCountries = countries.slice(0, 8);
  return (
    <>
      
      {console.log(shownCountries)}
      <AppBar position="static" >
     
        <Toolbar>
          <Typography variant="h4"> Country Finder </Typography>
        </Toolbar>
      </AppBar>
      <GithubCorner href="https://github.com/Jidmaa/CountryFinder" />
      <br />
      <Grid container direction="column" alignItems="center" spacing={5}>
        <Grid item>
          <Autocomplete
            id="combo-box-demo"
            options={countries}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country ! "
                variant="outlined"
              />
            )}
            onChange={(event, country) => setSearchedCountry(country)}
          />
        </Grid>

        <Grid item>
       {searchedCountry &&   <SearchCountries
            searchedCountry={searchedCountry}
            shownCountries={shownCountries}
          />}
        </Grid>
      </Grid>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
