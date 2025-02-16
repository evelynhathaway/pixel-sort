import type {NextConfig} from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	webpack: (config: {module: {rules: unknown[]}}) => {
		config.module.rules.push({
			test: /\.worker\.js$/,
			loader: "worker-loader",
			options: {
				filename: "static/[chunkhash].worker.js",
				publicPath: "/_next/",
			},
		});
		return config;
	},
};

export default nextConfig;
