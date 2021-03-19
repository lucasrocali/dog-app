import React, { useEffect, useState } from 'react'
import { getAllBreeds, getBreedImages } from 'src/api'
import { Dog } from 'src/@types'
import HomeContainer from './container'

export default function Home() {

  const [searchingText, setSearchingText] = useState<string>('')
  const [allBreeds, setAllBreeds] = useState<string[]>([])
  const [filteredBreeds, setFilteredBreeds] = useState<string[]>([])
  const [imagesByBreed, setImagesByBreed] = useState<{ [key: string]: string[] }>({})

  async function handleGetBreeds() {
    const breeds = await getAllBreeds()
    setAllBreeds(breeds)
  }

  async function handleGetBreedImages(breed: string) {
    const images = await getBreedImages(breed)
    setImagesByBreed(imagesByBreed => ({
      ...imagesByBreed,
      [breed]: images
    }))
  }

  function handleBreedImages(breed: string) {
    if (!imagesByBreed[breed]) {
      handleGetBreedImages(breed)
    }
  }

  useEffect(() => {
    handleGetBreeds()
  }, [])

  useEffect(() => {
    if (searchingText.length > 0) {
      const filtered = allBreeds.filter((breed) => breed.toLocaleLowerCase().startsWith(searchingText.toLocaleLowerCase()))
      setFilteredBreeds(filtered)
    } else {
      setFilteredBreeds([])
    }
  }, [searchingText])

  useEffect(() => {
    filteredBreeds.forEach(breed => handleBreedImages(breed))
  }, [filteredBreeds])

  const dogs: Dog[] = filteredBreeds.map(breed => ({ breed, images: imagesByBreed[breed] }))

  return (
    <HomeContainer
      searchingText={searchingText}
      dogs={dogs}
      onSearchingTextChange={(searchingText) => setSearchingText(searchingText)}
    />
  );
}