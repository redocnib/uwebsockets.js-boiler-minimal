## uWebsockets.js Minimal Boilerplate
A minimalist typescript based boilerplate for[ uWebsockets.js](https://github.com/uNetworking/uWebSockets.js " uWebsockets.js") framework.

### Running the boilerplate
Clone the repository and do,
+ `$ npm install`
+ Serving
	+ `$ npm start` Development serve.
	+ `$ npm run start:prod` Production serve.
+ Building
	+ `$ npm run build:dev` Take a development build to `dev` directory.
	+ `$ npm run build:prod` Take a production build to `dist` directory.
+ HMR
	+ `$ npm run start:hmr` Run in hot module reload mode. Note: Hot reloading of the server routes are currently buggy due some limitation in destroying the uws instance.

### Features
- Webpack configuration for HMR, serve and build.
- Eslint.
- Typescript.
- Build separation for production and development.
- .env Support (rename sample.env to .env)

### License
- The boiler plate is under MIT licensing without any restrictions, But follow the licensing for dependencies separately.
