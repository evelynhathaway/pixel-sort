import withSerwistInit from "@serwist/next";
import type {NextConfig} from "next";
import {isTruthy} from "./utils/type-guards.ts";

interface CrossOriginResourcesConfig {
	vercel: boolean;
	vercelAnalytics: boolean;
}

type ContentSecurityPolicyConfig = Record<string, (string | false)[]>;

type PermissionsPolicyConfig = Record<string, (string | false)[]>;

const createPermissionsPolicy = (
	crossOriginResources: CrossOriginResourcesConfig | undefined,
	customRules: PermissionsPolicyConfig | undefined,
) => {
	const rules = {
		// Custom rules
		...customRules,
		"fullscreen": [
			// Videos hosted on own domain
			"self",
			...customRules?.fullscreen ?? [],
		],
	};
	const permissions: string[] = [];
	for (const [key, rule] of Object.entries(rules)) {
		const origins = (
			Array.from(new Set(rule))
				.filter(isTruthy)
				.map(origin => origin === "self" ? origin : `"${origin}"`)
		);
		permissions.push(`${key}=(${origins.join(" ")})`);
	}
	return {
		key: "Permissions-Policy",
		value: permissions.join(", "),
	};
};

const createContentSecurityPolicy = (
	crossOriginResources: CrossOriginResourcesConfig | undefined,
	customRules: ContentSecurityPolicyConfig | undefined,
) => {
	const rules: Record<string, (string | false | undefined)[]> = {
		// Default empty rules (allow `'self'`)
		"default-src": [],
		// Default to disallowed rules
		"frame-ancestors": [
			"none",
		],
		// Custom rules
		...customRules,
		"script-src": [
			// Required by Next.js without nonces (requires dynamic mode)
			"unsafe-inline",
			// Required by Next.js hot reload
			process.env.NODE_ENV === "development" && "unsafe-eval",
			// Vercel preview comments
			crossOriginResources?.vercel && process.env.VERCEL_ENV !== "production" && "https://vercel.live",
			crossOriginResources?.vercel && process.env.VERCEL_ENV !== "production" && "https://vercel.com",
			crossOriginResources?.vercel && process.env.VERCEL_ENV !== "production" && "unsafe-inline",
			// Vercel Analytics (dev mode)
			crossOriginResources?.vercelAnalytics && process.env.NODE_ENV === "development" && "https://va.vercel-scripts.com",
			...customRules?.["script-src"] ?? [],
		],
		"style-src": [
			// Required by Next.js
			"unsafe-inline",
			// Vercel preview comments
			crossOriginResources?.vercel && process.env.VERCEL_ENV !== "production" && "https://vercel.live",
			...customRules?.["style-src"] ?? [],
		],
		"font-src": [
			// Vercel preview comments
			crossOriginResources?.vercel && process.env.VERCEL_ENV !== "production" && "https://vercel.live",
			...customRules?.["font-src"] ?? [],
		],
		"connect-src": [
			// Vercel preview comments
			crossOriginResources?.vercel && process.env.VERCEL_ENV !== "production" && "https://vercel.live",
			crossOriginResources?.vercel && process.env.VERCEL_ENV !== "production" && "https://vercel.com",
			crossOriginResources?.vercel && process.env.VERCEL_ENV !== "production" && "https://*.pusher.com",
			crossOriginResources?.vercel && process.env.VERCEL_ENV !== "production" && "wss://*.pusher.com",
			...customRules?.["connect-src"] ?? [],
		],
		"frame-src": [
			// Vercel preview comments
			crossOriginResources?.vercel && process.env.VERCEL_ENV !== "production" && "https://vercel.live",
			crossOriginResources?.vercel && process.env.VERCEL_ENV !== "production" && "https://vercel.com",
			...customRules?.["frame-src"] ?? [],
		],
		"img-src": [
			// Required by Next.js `<Image>` placeholders
			"data:",
			// Required by file upload previews
			"blob:",
			// Vercel preview comments
			crossOriginResources?.vercel && process.env.VERCEL_ENV !== "production" && "https://vercel.live",
			crossOriginResources?.vercel && process.env.VERCEL_ENV !== "production" && "https://vercel.com",
			crossOriginResources?.vercel && process.env.VERCEL_ENV !== "production" && "https://*.pusher.com",
			crossOriginResources?.vercel && process.env.VERCEL_ENV !== "production" && "data:",
			crossOriginResources?.vercel && process.env.VERCEL_ENV !== "production" && "blob:",
			...customRules?.["img-src"] ?? [],
		],
	};
	const directives: string[] = [];
	for (const [key, rule] of Object.entries(rules)) {
		// Include self as a trusted origin for every directive without `'none'`
		if (!rule.includes("none")) {
			rule.unshift("self");
		}

		const origins = (
			Array.from(new Set(rule))
				.filter(isTruthy)
				.map(origin => origin.includes(":") ? origin : `'${origin}'`)
		);
		directives.push(`${key} ${origins.join(" ")}`);
	}
	return {
		key: "Content-Security-Policy",
		value: directives.join("; "),
	};
};

const crossOriginResources = {
	vercel: true,
	vercelAnalytics: false,
};

const withSerwist = withSerwistInit({
	swSrc: "app/service-worker.ts",
	swDest: "public/service-worker.js",
	swUrl: "/service-worker.js",
	// Don't reload the page when back online to prevent losing work
	reloadOnOnline: false,
});

const nextConfig: NextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	// eslint-disable-next-line @typescript-eslint/require-await
	async headers () {
		return [
			{
				source: "/(.*)",
				headers: [
					createContentSecurityPolicy(crossOriginResources, {}),
					createPermissionsPolicy(crossOriginResources, {}),
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "Cross-Origin-Resource-Policy",
						value: "same-origin",
					},
					{
						key: "Cross-Origin-Opener-Policy",
						// Vercel authentication for comments in preview environments requires a cross origin popup
						value: crossOriginResources?.vercel && process.env.VERCEL_ENV !== "production"
							? "same-origin-allow-popups"
							: "same-origin",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=31536000; includeSubDomains; preload",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
				],
			},
			{
				source: "/service-worker.js",
				headers: [
					{
						key: "Content-Type",
						value: "application/javascript; charset=utf-8",
					},
					{
						key: "Cache-Control",
						value: "no-cache, no-store, must-revalidate",
					},
				],
			},
		];
	},
	webpack: (config: {module: {rules: unknown[]}}) => {
		config.module.rules.push({
			test: /\.worker\.js$/,
			exclude: /node_modules/,
			loader: "worker-loader",
			options: {
				filename: "static/[chunkhash]-[name].js",
				publicPath: "/_next/",
			},
		});
		return config;
	},
};

export default withSerwist(nextConfig);
