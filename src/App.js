import * as React from "react";
import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  Paging,
  Sorting,
  WithSearch
} from "@elastic/react-search-ui";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import {
  buildAutocompleteQueryConfig,
  buildSearchOptionsFromConfig,
  getConfig,
} from "./config/config-helper";

//MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { styled, alpha } from '@mui/material/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@mui/material/Grid';

import architects_logo from './assets/architects_logo.png'

//  required for ELS cloud config
//  const { hostIdentifier, searchKey, endpointBase, engineName } = getConfig();

const connector = new ElasticsearchAPIConnector({
  host: "http://localhost:9200",
  index: "ticket_test_data"
});

const config = {
  searchQuery: {
    disjunctiveFacets: ["reporter.keyword"],
    facets: {
      "reporter.keyword": { type: "value" }
    },
    ...buildSearchOptionsFromConfig()
  },

  autocompleteQuery: buildAutocompleteQueryConfig(),
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true
};


const theme = createTheme({
  palette: {
    primary: {
      main: '#113537',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#E0C2FF',
      light: '#F5EBFF',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#FAFAFF',
    },
  },
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        ...sx,
      }}
      {...other}
    />
  );
}

export default function App() {

  return (
    <SearchProvider config={config}>

      {/* MUI Layout  */}
      <ThemeProvider theme={theme}>

        {/* Parent Box for header */}
        <Box sx={{
          display: 'flex', flexDirection: 'column'
        }}>

          {/* CssBaseline entfernt margin */}
          <CssBaseline />
          <AppBar position="static"  >

            <Toolbar>

              <Box
                component="img"
                alt="Logo"
                sx={{ display: 'flex', border: 0, height: 54, width: 54 }}
                src={architects_logo}
              />

              <Box sx={{ flexGrow: 1, padding: '0rem 15rem' }}>
                <Search>
                  <SearchBox autocompleteSuggestions={true} />
                </Search>
              </Box>

              <Item>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Item>

              <Item>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  //   onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>

              </Item>

            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>

      {/* 2 containers filter and result start here*/}
      <Grid container spacing={2}>

        {/* Filter Box */}
        <Grid item xs={4}>

          <Box sx={{ bgcolor: '#D9D9D9', height: '90vh' , padding: '2rem 2rem 0rem 2rem' }}>

            <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
              {({ wasSearched }) => {
                return (

                  <ErrorBoundary>
                    <Sorting
                      label={"Sort by"}
                      sortOptions={[
                        {
                          name: "Reporter: A -> Z",
                          value: [{ field: "reporter.keyword", direction: "asc" }]
                        },
                        {
                          name: "Reporter: Z -> A",
                          value: [{ field: "reporter.keyword", direction: "desc" }]
                        }

                      ]}
                    />
                    <Box sx={{ border: 'border: 15px solid green' }}>

                      <Facet key={"1"} field={"reporter.keyword"} label={"Reporter"} />

                    </Box>
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {/* {wasSearched && <ResultsPerPage />} */}
                    </React.Fragment>
                  </ErrorBoundary>

                )
              }}
            </WithSearch>


          </Box>

        </Grid>

        {/* Result Box */}
        <Grid item xs={8}>
          <Box sx={{ bgcolor: '#AD6A6C', height: '90vh' }}>

            <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
              {({ wasSearched }) => {
                return (

                  <ErrorBoundary>

                    <Box sx={{ padding: '1rem 2rem 0rem 2rem' }}>
                      <Results

                        titleField={getConfig().titleField}
                        urlField={getConfig().urlField}
                        thumbnailField={getConfig().thumbnailField}
                        shouldTrackClickThrough={true}

                      />
                    </Box>
                  </ErrorBoundary>

                )
              }}
            </WithSearch>
            <Paging />
          </Box>
        </Grid>
      </Grid>
    </SearchProvider>
  );
}
