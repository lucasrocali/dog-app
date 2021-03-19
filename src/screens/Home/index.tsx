import React from 'react'
import HomeContainer from './container'
import useDogSearch from './hooks/useDogSearch'

export default function Home() {

  const {
    searchingText,
    dogs,
    onSearchingTextChange
  } = useDogSearch()

  return (
    <HomeContainer
      searchingText={searchingText}
      dogs={dogs}
      onSearchingTextChange={onSearchingTextChange}
    />
  );
}