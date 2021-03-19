import { useEffect, useState } from 'react'
import { getAllBreeds, getBreedImages } from 'src/api'
import { Dog } from 'src/@types'

type UseDogSearchReturn = {
  searchingText: string
  dogs: Dog[]
  onSearchingTextChange: (value: string) => void
}

export default function useDogSearch(): UseDogSearchReturn {
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

  function onSearchingTextChange(value: string) {
    setSearchingText(value)
  }

  const dogs: Dog[] = filteredBreeds.map(breed => ({ breed, images: imagesByBreed[breed] }))

  return {
    searchingText,
    dogs,
    onSearchingTextChange
  }
}