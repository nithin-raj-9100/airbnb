/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	reactStrictMode: false,
	images: {
		domains: [
			'avatars.githubusercontent.com',
			'lh3.googleusercontent.com',
			'res.cloudinary.com',
		],
	},
};

module.exports = nextConfig;
