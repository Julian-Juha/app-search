## Getting Started

This application depends on cloud based ELS and mongoDB. This is configured in two files.

1. src/config/PROD-engine.json

Define here ELS index and search & filter fields.

2. src/config/PROD-env.js

Define access for ELS & mongoDB. Stick to the example file and dont forget to remove "example" from the name. 


Run the following commands to start this application:

```bash
# Run this to set everything up
npm install

# Start backend server in ./backend 
node server.js

# Run this to start your application 
npm start
```

## Customization

This project is built with [Search UI](https://github.com/elastic/search-ui), which is a React library for building search experiences. If you're interested in using this project as a base for your own, most of
what you'll need can be found in the Search UI documentation.

If you change data and fields, check out src/config/ELS_Mapping.json where you can find the ELS schema used for this project.

## License 📗

[Apache-2.0](https://github.com/elastic/app-search-reference-ui-react/blob/master/LICENSE.txt) © [Elastic](https://github.com/elastic)
