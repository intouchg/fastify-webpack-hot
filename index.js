const fastifyPlugin = require('fastify-plugin')
const path = require('path')

module.exports = fastifyPlugin(async function fastifyWebpackHot(
	fastify,
	options
) {
	if (process.env.NODE_ENV !== 'development') return
	if (!options.configPath) throw Error('Missing config for fastify-webpack-hot configPath option')
	const fastifyExpress = require('fastify-express')
	const webpack = require('webpack')
	const webpackConfig = require(options.configPath)
	const webpackDevMiddleware = require('webpack-dev-middleware')
	const webpackHotMiddleware = require('webpack-hot-middleware')
	const config = webpackConfig(process.env, { mode: 'development' })
	config.entry.unshift('webpack-hot-middleware/client')
	config.plugins.push(new webpack.HotModuleReplacementPlugin())
	const compiler = webpack({ ...config, mode: 'development' })
	fastify.register(fastifyExpress).then(() => {
		fastify.use(
			webpackDevMiddleware(compiler, {
				publicPath: config.output.publicPath,
			})
		)
		fastify.use(webpackHotMiddleware(compiler))
	})
})
