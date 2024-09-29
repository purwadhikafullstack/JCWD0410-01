import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";

const pointerIcon = new L.Icon({
  iconUrl: "/pin.png",
  iconSize: [35, 43],
  iconAnchor: [20, 58],
  popupAnchor: [0, -60],
});

interface MapComponentProps {
  selectedPosition: [string, string];
  onPositionChange: (lat: string, lng: string) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  selectedPosition,
  onPositionChange,
}) => {
  const handleMapClick = (event: any) => {
    const { lat, lng } = event.latlng;
    onPositionChange(lat.toString(), lng.toString());
  };

  return (
    <MapContainer
      center={[
        parseFloat(selectedPosition[0]),
        parseFloat(selectedPosition[1]),
      ]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[
          parseFloat(selectedPosition[0]),
          parseFloat(selectedPosition[1]),
        ]}
        icon={pointerIcon}
      >
        <Popup>
          Lokasi yang dipilih: <br /> Latitude: {selectedPosition[0]},
          Longitude: {selectedPosition[1]}
        </Popup>
      </Marker>
      <MapClickHandler onClick={handleMapClick} />
    </MapContainer>
  );
};

const MapClickHandler = ({ onClick }: { onClick: (event: any) => void }) => {
  useMapEvent("click", onClick);
  return null;
};

export default MapComponent;
