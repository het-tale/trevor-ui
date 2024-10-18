module.exports = {
	webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
		// Add file-loader for handling binary files
		config.module.rules.push({
			test: /\.(node)$/,
			loader: "file-loader"
		});
		config.resolve.alias.canvas = false;

		return config;
	}
};
