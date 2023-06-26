'use client';

import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import foo from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import bar from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
	iconUrl: markerIcon.src,
	iconRetinaUrl: foo.src,
	shadowUrl: bar.src,
});

interface MapProps {
	center?: Array<number>;
}
const Map: React.FC<MapProps> = ({ center }) => {
	return (
		<>
			<MapContainer
				// @ts-ignore
				center={(center as L.LatLngBoundsExpression) || [51.505, -0.09]}
				zoom={center ? 4 : 2}
				scrollWheelZoom={true}
				className='h-[35vh] rounded-lg'
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>

				{center && <Marker position={center as any} />}
			</MapContainer>
		</>
	);
};
export default Map;
