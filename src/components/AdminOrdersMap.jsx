import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { orders } from "../data/orders";

const homeTownIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -35],
});

const orderIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

const AdminOrdersMap = () => {
  const homeTownCoords = [7.6167, 5.2040];

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={homeTownCoords}
        zoom={7}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {orders.map((order) => (
          <Marker key={order.id} position={[order.lat, order.lng]} icon={orderIcon}>
            <Popup>
              <strong>{order.customerName}</strong> <br />
              Town: {order.town}
            </Popup>
          </Marker>
        ))}

        <Marker position={homeTownCoords} icon={homeTownIcon}>
          <Popup>
            <strong>Head Office:</strong> Sapphire Laundry <br /> Ado Ekiti
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default AdminOrdersMap;
