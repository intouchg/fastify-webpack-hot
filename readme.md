# @intouchg/fastify-webpack-hot

Allows using a NodeJS Fastify server for development with Webpack hot reloading when `NODE_ENV=development`

Register the plugin with Fastify and set the `configPath` option to the absolute filepath of your Webpack config file

Make sure the `output.publicPath` option has been set in your Webpack config

```sh
yarn add fastify
yarn add --dev @intouchg/fastify-webpack-hot nodemon
```

```jsonc
// package.json
{
	"scripts": {
		"dev": "NODE_ENV=development nodemon -w server.js"
	},
	"dependencies": {
		"fastify": "3.25.1"
	},
	"devDependencies": {
		"@intouchg/fastify-webpack-hot": "latest",
		"nodemon": "2.0.15"
	}
}
```

```js
// server.js
const fastify = require('fastify')({ logger: true })
const path = require('path')

// Only require the plugin when NODE_ENV=development.
// This is not strictly necessary, the plugin does its
// own internal check for NODE_ENV=development.
if (process.env.NODE_ENV === 'development') {
	fastify.register(
		require('@intouchg/fastify-webpack-hot'),
		{ configPath: path.resolve(__dirname, 'webpack.config.js') }
	)
}

fastify.get('/', (request, reply) => reply.send({ hello: 'world' }))

fastify.listen(3000, (error, address) => {
	if (error) throw error
	console.log('Fastify server is listening on ' + address)
})
```
