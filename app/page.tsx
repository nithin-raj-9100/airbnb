import Image from 'next/image';
import { Inter } from 'next/font/google';
import Navbar from './components/navbar/Navbar';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<div className=''>
			<div className='text-white'></div>
			{/* <img
				src={`Airbnb-logo.jpg`}
				className='w-28 h-16'
				alt='airbnb logo'
			/> */}
		</div>
	);
}
