import * as React from "react";

//ELS
import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
import FormModal from './FormModal';
import { useState } from 'react';
import { Button } from '@mui/material';
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
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@mui/material/Grid';
import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles';

// logos
import architects_logo from './assets/architects_logo.png'
import architects_name from './assets/architects_name.png'

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
    typography: {
        fontFamily: [
            'KoPub Batang'
        ],
        button: {
            textTransform: 'none'
        }
    }
});

// conenct to ELS cloud
const connector = new ElasticsearchAPIConnector({
    cloud: {
        id: "KnowledgeArchitects:ZXVyb3BlLXdlc3QzLmdjcC5jbG91ZC5lcy5pbzo0NDMkOWJlNTdmNDAxYmY1NGQxY2FlMjFhNzEwNjAxNTA5ZjckNTNmOTg2OTNhMzM2NDVjZGI3MjlhMDg0ZWFlZTllZWY="
    },
    apiKey: "Sm13bG5JOEJOLVp3NTM1eHRyYzc6dFZYZDFhQmFTRGFPcTdZUWNkSkMtUQ==",
    index: "1_index_knowledgearchitects"
});

// config for facets/ filter
const config = {
    searchQuery: {
        disjunctiveFacets: ["reporter.keyword", "category.keyword"],
        facets: {
            "reporter.keyword": { type: "value" },
            "category.keyword": { type: "value" }
        },
        ...buildSearchOptionsFromConfig()
    },

    autocompleteQuery: buildAutocompleteQueryConfig(),
    apiConnector: connector,
    alwaysSearchOnInitialLoad: true
};

// searchbar
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

const LandingPage = () => {

    // modal form states
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                                onClick={event => window.location.href = '/'}
                            />

                            <Box
                                component="img"
                                alt="Logo"
                                sx={{ display: 'flex', border: 0, height: 45 }}
                                src={architects_name}
                                onClick={event => window.location.href = '/'}
                            />

                            <Box sx={{ ml: '20px', border: 'solid #AD6A6C' }}>
                                <Button variant="contained" color="primary" onClick={handleOpen} >
                                    New Ticket
                                </Button>
                                <FormModal open={open} handleClose={handleClose} />
                            </Box>


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

                    <Box sx={{ bgcolor: '#D9D9D9', height: '100vh', padding: '2rem 2rem 0rem 2rem' }}>

                        <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
                            {({ wasSearched }) => {
                                return (

                                    <ErrorBoundary>
                                        <Sorting
                                            label={"Sort by"}
                                            sortOptions={[
                                                {
                                                    name: "Reporter: A -> Z",
                                                    value: [{ field: "reporter.keyword", direction: "asc", unmapped_type: "long" }]
                                                },
                                                {
                                                    name: "Reporter: Z -> A",
                                                    value: [{ field: "reporter.keyword", direction: "desc", unmapped_type: "long" }]
                                                },
                                                {
                                                    name: "Newest to Oldest",
                                                    value: [{ field: "creation_date.keyword", direction: "desc" }]
                                                },
                                                {
                                                    name: "Oldest to Newest",
                                                    value: [{ field: "creation_date.keyword", direction: "asc" }]
                                                }

                                            ]}
                                        />
                                        <Box sx={{ margin: '10px' }}>

                                            <Facet key={"1"} field={"reporter.keyword"} label={"Reporter"} />

                                        </Box>
                                        <Box sx={{ margin: '10px' }}>

                                            <Facet key={"1"} field={"category.keyword"} label={"Category"} />

                                        </Box>

                                        <Box sx={{ margin: '10px' }}>
                                            <React.Fragment>
                                                {wasSearched && <PagingInfo />}
                                            </React.Fragment>
                                        </Box>
                                    </ErrorBoundary>

                                )
                            }}
                        </WithSearch>


                    </Box>

                </Grid>

                {/* Result Box */}
                <Grid item xs={8}>
                    <Box sx={{ bgcolor: '#AD6A6C', height: '100vh', overflow: 'auto' }}>

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
                        <Box sx={{ margin: '1rem auto 1rem auto', width: '10%' }}>
                            <Paging />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </SearchProvider>
    );
}
export default LandingPage;