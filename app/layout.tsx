import Modal from './components/models/Modal';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';

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
				<Modal isOpen title='Hello world' actionLabel='Submit' />
				<Navbar />
				{children}
			</body>
		</html>
	);
}
