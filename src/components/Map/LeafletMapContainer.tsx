import { LatLngExpression, MapOptions } from 'leaflet'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'

import useMapContext from './useMapContext'

export const LeafletMapContainer: React.FC<
  {
    center: LatLngExpression
    children: JSX.Element | JSX.Element[]
    zoom: number
  } & MapOptions
> = ({ ...options }) => {
  const { setMap } = useMapContext()

  const handleClick = (event: any) => {
    console.log(event.latlng.lat, event.latlng.lng);
  };

  return (
    <MapContainer
      ref={e => setMap && setMap(e || undefined)}
      className="w-full h-full absolute outline-0 text-white"
      {...options}
    >
      <MapClickHandler onClick={handleClick} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {options.children}
    </MapContainer>
  )
}

const MapClickHandler: React.FC<{ onClick: (event: any) => void }> = ({ onClick }) => {
  useMapEvents({
    click: event => {
      // Call the provided onClick callback with the event
      onClick(event);
    },
  });

  // Return null because this component does not render anything
  return null;
};
