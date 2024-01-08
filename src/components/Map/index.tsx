import dynamic from 'next/dynamic'
import { useEffect, useMemo } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { useSelector } from 'react-redux'
import { AppState } from '@src/store'

import MapTopBar from '@components/TopBar'
import LatLngLogo from '@components/TopBar/LatLngLogo'

import { AppConfig } from '@lib/AppConfig'
import MarkerCategories, { Category } from '@lib/MarkerCategories'

import MapContextProvider from './MapContextProvider'
import useLeafletWindow from './useLeafletWindow'
import useMapContext from './useMapContext'
import useMarkerData from './useMarkerData'
import { PlaceValues } from '@lib/Places'
import { LatLngExpression } from '@src/store/placeTypes'

const LeafletCluster = dynamic(async () => (await import('./LeafletCluster')).LeafletCluster(), {
  ssr: false,
})
const CenterToMarkerButton = dynamic(async () => (await import('./ui/CenterButton')).CenterButton, {
  ssr: false,
})
const CustomMarker = dynamic(async () => (await import('./Marker')).CustomMarker, {
  ssr: false,
})
const LocateButton = dynamic(async () => (await import('./ui/LocateButton')).LocateButton, {
  ssr: false,
})
const CategorySelect = dynamic(async () => (await import('./ui/CategorySelect')).CategorySelect, {
  ssr: false,
})
const LeafletMapContainer = dynamic(async () => (await import('./LeafletMapContainer')).LeafletMapContainer, {
  ssr: false,
})

const MapInner = () => {
  const { map } = useMapContext()
  const leafletWindow = useLeafletWindow()

  const {
    width: viewportWidth,
    height: viewportHeight,
    ref: viewportRef,
  } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 200,
  })

  const places = useSelector((appState: AppState) => appState.places.places);

  const { allMarkersBoundCenter } = useMarkerData({
    locations: places,
    map,
    viewportWidth,
    viewportHeight,
  })

  const isLoading = !map || !leafletWindow || !viewportWidth || !viewportHeight

  let mapChildren: JSX.Element[] = [];

  const clustersByCategory: {
    category: number;
    markers: PlaceValues[];
  }[] = useMemo(() => {
    if (!places) return [];

    const groupedLocations = places.reduce<Record<number, PlaceValues[]>>((acc, place) => {
      const { category } = place;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(place);
      return acc;
    }, {});

    return Object.entries(groupedLocations).map(([category, markers]) => ({
      category: Number(category),
      markers,
    }));
  }, [places]);


  if (!isLoading) {
    mapChildren = [
      <CenterToMarkerButton
        key="centerButton"
        center={allMarkersBoundCenter.centerPos}
        zoom={allMarkersBoundCenter.minZoom}
      />,
      <LocateButton key="locateButton" />,
      <LatLngLogo key="latLngLogo" />,
      <CategorySelect key="categorySelect" />,
      ...Object.values(clustersByCategory).map((item, index) => (
        <LeafletCluster
          key={item.category + index}
          icon={MarkerCategories[item.category as Category].icon}
          color={MarkerCategories[item.category as Category].color}
          chunkedLoading
        >
          {item.markers.map((marker, index) => (
            <CustomMarker
              icon={MarkerCategories[marker.category].icon}
              color={MarkerCategories[marker.category].color}
              key={Array.isArray(marker.position) ? marker.position.join('') : 'defaultKey' + index}
              position={marker.position}
            />
          ))}
        </LeafletCluster>
      )),
    ];
  }


  return (
    <div className="h-full w-full absolute overflow-hidden" ref={viewportRef}>
      <MapTopBar />
      <div
        className={`absolute w-full left-0 transition-opacity ${isLoading ? 'opacity-0' : 'opacity-1 '}`}
        style={{
          top: AppConfig.ui.topBarHeight,
          width: viewportWidth ?? '100%',
          height: viewportHeight ? viewportHeight - AppConfig.ui.topBarHeight : '100%',
        }}
      >
        <LeafletMapContainer
          center={allMarkersBoundCenter?.centerPos as LatLngExpression || [0, 0]}
          zoom={allMarkersBoundCenter?.minZoom || 0}
          maxZoom={AppConfig.maxZoom}
          minZoom={AppConfig.minZoom}
        >
          {mapChildren}
        </LeafletMapContainer>
      </div>
    </div>
  )
}

// pass through to get context in <MapInner>
const Map = () => (
  <MapContextProvider>
    <MapInner />
  </MapContextProvider>
)

export default Map
