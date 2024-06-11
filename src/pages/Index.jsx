import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Box, Text, VStack } from '@chakra-ui/react';

// Define the icon for the pins
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Dummy data for sensor readings
const sensorData = [
  { temperature: '20°C', humidity: '30%', occupancy: '45%' },
  { temperature: '18°C', humidity: '40%', occupancy: '60%' },
  { temperature: '22°C', humidity: '35%', occupancy: '30%' },
  { temperature: '19°C', humidity: '50%', occupancy: '55%' },
  { temperature: '21°C', humidity: '45%', occupancy: '50%' },
  { temperature: '23°C', humidity: '55%', occupancy: '65%' },
  { temperature: '17°C', humidity: '60%', occupancy: '70%' },
  { temperature: '24°C', humidity: '25%', occupancy: '40%' },
  { temperature: '16°C', humidity: '65%', occupancy: '75%' },
  { temperature: '25°C', humidity: '20%', occupancy: '35%' },
];

// Generate random positions within Oslo's bounds
const generateRandomPositions = () => {
  const positions = [];
  for (let i = 0; i < 10; i++) {
    const lat = 59.8 + Math.random() * 0.2; // Latitude between 59.8 and 60
    const lng = 10.6 + Math.random() * 0.2; // Longitude between 10.6 and 10.8
    positions.push([lat, lng]);
  }
  return positions;
};

const Index = () => {
  const [positions] = useState(generateRandomPositions());

  return (
    <MapContainer center={[59.9139, 10.7522]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {positions.map((position, index) => (
        <Marker key={index} position={position}>
          <Popup>
            <VStack>
              <Text fontWeight="bold">Sensor Data</Text>
              <Box>
                <Text>Temperature: {sensorData[index].temperature}</Text>
                <Text>Humidity: {sensorData[index].humidity}</Text>
                <Text>Occupancy: {sensorData[index].occupancy}</Text>
              </Box>
            </VStack>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Index;