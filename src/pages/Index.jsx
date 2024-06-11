import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, Text, VStack } from '@chakra-ui/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

const osloCenter = [59.9139, 10.7522];
const generateRandomPoints = (center, size, count) => {
  const points = [];
  for (let i = 0; i < count; i++) {
    const randomPoint = [
      center[0] + (Math.random() - 0.5) * size,
      center[1] + (Math.random() - 0.5) * size,
    ];
    points.push(randomPoint);
  }
  return points;
};

const Index = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const points = generateRandomPoints(osloCenter, 0.1, 10);
    setMarkers(points);
  }, []);

  const pinIcon = new L.Icon({
    iconUrl: require('../assets/pin-icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <MapContainer center={osloCenter} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((position, idx) => (
        <Marker key={idx} position={position} icon={pinIcon}>
          <Popup>
            <VStack>
              <Text fontWeight="bold">Building {idx + 1}</Text>
              <Box>
                <Text>Temperature: {Math.random() * 10 + 18}°C</Text>
                <Text>Humidity: {Math.random() * 50 + 30}%</Text>
                <Text>Occupancy: {Math.floor(Math.random() * 10) + 1}</Text>
              </Box>
            </VStack>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Index;