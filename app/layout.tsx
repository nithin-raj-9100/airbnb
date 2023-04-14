import { Nunito } from 'next/font/google';

// [ ]internal importss
import ToasterProvider from './providers/ToasterProvider';
import RegisterModal from './components/models/RegisterModal';
import Navbar from './components/navbar/Navbar';
import './globals.css';

export const metadata = {
	title: 'Holiday Homes & Apartment Rentals - Airbnb - Airbnb',
	description: 'airbnb',
};

const fonts: any = Nunito({
	subsets: ['latin'],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={fonts}>
				<ToasterProvider />
				<RegisterModal />
				<Navbar />
				{children}
			</body>
		</html>
	);
}
