// src/components/LocationPicker.jsx
import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polyline,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Leaflet default icon fix
import marker2x from "leaflet/dist/images/marker-icon-2x.png";
import marker from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker,
  shadowUrl: markerShadow,
});

// Custom icons
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [34, 34],
  iconAnchor: [17, 34],
});

const outletIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [34, 34],
  iconAnchor: [17, 34],
});

// Outlets
const outlets = [
  { id: 1, name: "Sapphire Laundry Ado Ekiti HQ", coords: [7.6190, 5.2050] },
  { id: 2, name: "Sapphire Laundry Ibadan", coords: [7.3775, 3.9470] },
  { id: 3, name: "Sapphire Laundry Abeokuta", coords: [7.1600, 3.3450] },
  { id: 4, name: "Sapphire Laundry Oyo", coords: [7.8500, 3.9330] },
  { id: 5, name: "Sapphire Laundry Warri", coords: [5.5167, 5.7500] },
  { id: 6, name: "Sapphire Laundry Lagos Island", coords: [6.4541, 3.3942] },
  { id: 7, name: "Sapphire Laundry Abuja", coords: [9.0579, 7.4951] },
];

// Distance calculation (Haversine)
const getDistance = (from, to) => {
  const R = 6371; // km
  const dLat = ((to[0] - from[0]) * Math.PI) / 180;
  const dLon = ((to[1] - from[1]) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((from[0] * Math.PI) / 180) *
      Math.cos((to[0] * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Draggable marker component
function DraggableMarker({ position, setPosition, customIcon }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  if (!position) return null;

  return (
    <Marker
      position={position}
      icon={customIcon}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const latlng = e.target.getLatLng();
          setPosition([latlng.lat, latlng.lng]);
        },
      }}
    >
      <Popup>
        Selected location <br />
        Lat: {position[0].toFixed(5)}, Lng: {position[1].toFixed(5)}
      </Popup>
    </Marker>
  );
}

// FlyTo helper component
function FlyTo({ coords }) {
  const map = useMapEvents({});
  if (coords) map.flyTo(coords, 15, { duration: 1.5 });
  return null;
}

const LocationPicker = ({ onPositionChange, initialPosition, radiusKm = 10 }) => {
  const [position, setPosition] = useState(initialPosition || null);
  const [nearestOutlet, setNearestOutlet] = useState(null);
  const [visibleOutlets, setVisibleOutlets] = useState([]);
  const [flyToCoords, setFlyToCoords] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [address, setAddress] = useState("");

  // Get user location
  useEffect(() => {
    if (!position && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          setPosition(coords);
          if (onPositionChange) onPositionChange(coords);
          fetchAddress(coords);
        },
        () => {
          const fallback = [7.6190, 5.2050]; // HQ fallback
          setPosition(fallback);
          if (onPositionChange) onPositionChange(fallback);
          fetchAddress(fallback);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else if (!position) {
      const fallback = [7.6190, 5.2050];
      setPosition(fallback);
      if (onPositionChange) onPositionChange(fallback);
      fetchAddress(fallback);
    }
  }, []);

  // Reverse geocoding
  const fetchAddress = async ([lat, lon]) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await response.json();
      if (data && data.display_name) setAddress(data.display_name);
    } catch (err) {
      console.error("Reverse geocode error:", err);
      setAddress("");
    }
  };

  // Update nearest and visible outlets
  useEffect(() => {
    if (position) {
      const nearest = outlets.reduce((prev, curr) => {
        const distPrev = getDistance(position, prev.coords);
        const distCurr = getDistance(position, curr.coords);
        return distCurr < distPrev ? curr : prev;
      }, outlets[0]);
      setNearestOutlet(nearest);

      const visible = outlets.filter(
        (o) => getDistance(position, o.coords) <= radiusKm
      );
      setVisibleOutlets(visible);

      setFlyToCoords(nearest.coords);
    }
  }, [position, radiusKm]);

  useEffect(() => {
    if (onPositionChange && position) onPositionChange(position);
  }, [position]);

  if (!position) return <p>Loading map...</p>;

  // Search function
  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery
        )}&format=json&limit=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        setPosition(coords);
        setFlyToCoords(coords);
        fetchAddress(coords);
      } else {
        alert("Location not found. Try another address or town.");
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const getColorByDistance = (dist) => {
    if (dist <= 5) return "green";
    if (dist <= radiusKm) return "orange";
    return "red";
  };

  return (
    <div className="flex flex-col md:flex-row flex-wrap w-full max-w-[1200px] mx-auto gap-4 mb-8">
      {/* Sidebar */}
      {nearestOutlet && (
        <div className="md:w-1/4 w-full bg-white p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold mb-2">Nearest Outlet</h3>
          <p className="font-medium">{nearestOutlet.name}</p>
          <p>
            Distance: {getDistance(position, nearestOutlet.coords).toFixed(1)} km
          </p>
          {address && <p className="text-sm mt-1">Your Street: {address}</p>}
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${nearestOutlet.coords[0]},${nearestOutlet.coords[1]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
          >
            Get Directions
          </a>

          {visibleOutlets.length > 1 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-1">Other Nearby Outlets:</h4>
              <ul className="list-disc list-inside text-sm">
                {visibleOutlets
                  .filter((o) => o.id !== nearestOutlet.id)
                  .map((o) => {
                    const dist = getDistance(position, o.coords).toFixed(1);
                    const color = getColorByDistance(dist);
                    return (
                      <li key={o.id} className={`text-${color}-600`}>
                        {o.name} - {dist} km
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Map */}
      <div className="flex-1 w-full flex flex-col gap-2">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Enter town or address"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        <div className="w-full h-[400px] md:h-[600px] rounded-md overflow-hidden">
          <MapContainer center={position} zoom={15} style={{ width: "100%", height: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            <DraggableMarker
              position={position}
              setPosition={(pos) => {
                setPosition(pos);
                fetchAddress(pos);
              }}
              customIcon={userIcon}
            />

            {visibleOutlets.map((loc) => {
              const dist = getDistance(position, loc.coords);
              const color = getColorByDistance(dist);
              const icon = new L.Icon({
                iconUrl:
                  color === "green"
                    ? "https://cdn-icons-png.flaticon.com/512/190/190411.png"
                    : color === "orange"
                    ? "https://cdn-icons-png.flaticon.com/512/190/190406.png"
                    : "https://cdn-icons-png.flaticon.com/512/190/190422.png",
                iconSize: [34, 34],
                iconAnchor: [17, 34],
              });
              return (
                <Marker key={loc.id} position={loc.coords} icon={icon}>
                  <Popup>
                    <strong>{loc.name}</strong> <br /> {dist.toFixed(1)} km away
                  </Popup>
                </Marker>
              );
            })}

            {position && nearestOutlet && (
              <>
                <Polyline positions={[position, nearestOutlet.coords]} color="blue" />
                <Circle
                  center={nearestOutlet.coords}
                  radius={5000}
                  pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.2 }}
                />
                <FlyTo coords={flyToCoords} />
              </>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
