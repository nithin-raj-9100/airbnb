import { Nunito } from 'next/font/google';

// [ ]internal importss
import ToasterProvider from './providers/ToasterProvider';
import RegisterModal from './components/models/RegisterModal';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import LoginModal from './components/models/LoginModal';
import gerUser from './actions/getUser';
import RentModal from './components/models/RentModal';

export const metadata = {
	title: 'Holiday Homes & Apartment Rentals - Airbnb - Airbnb',
	description: 'airbnb',
};

const fonts: any = Nunito({
	subsets: ['latin'],
});

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await gerUser();
	return (
		<html lang='en'>
			<body className={fonts.className}>
				<ToasterProvider />
				<RentModal />
				<RegisterModal />
				<LoginModal />
				{/* @ts-ignore */}
				<Navbar user={user} />
				{children}
			</body>
		</html>
	);
}
