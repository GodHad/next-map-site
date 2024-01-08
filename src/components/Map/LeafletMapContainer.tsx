import { LeafletMouseEvent, MapOptions } from 'leaflet'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { PlaceState } from '@src/store/placeTypes'
import useMapContext from './useMapContext'
import { AnyAction } from 'redux'
import { selectPlaceWithWish } from '@src/store/placeActions'
import { AppState } from '@src/store'
import { LatLngExpression } from '@src/store/placeTypes'

export const LeafletMapContainer: React.FC<
  {
    center: LatLngExpression
    children: JSX.Element | JSX.Element[]
    zoom: number
  } & MapOptions
> = ({ ...options }) => {

  const dispatch = useDispatch<ThunkDispatch<PlaceState, any, AnyAction>>()
  const { setMap } = useMapContext()

  const handleClick = (event: LeafletMouseEvent) => {
    const latlng: LatLngExpression = [event.latlng.lat, event.latlng.lng];
    if (!!category) dispatch(selectPlaceWithWish(latlng));
  };

  const category = useSelector((appState: AppState) => appState.category)

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
