/** @type {import('next').NextConfig} */
export default {
	reactStrictMode: true,
	swcMinify: true,
	poweredByHeader: false,
	webpack: (config) => {
		config.module.rules.push({
			test: /\.worker\.js$/,
			loader: "worker-loader",
			options: {
				name: "static/[hash].worker.js",
				publicPath: "/_next/",
			},
		});
		return config;
	},
};
