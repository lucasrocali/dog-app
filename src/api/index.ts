import axios from 'axios'

const dogBreedsApi = axios.create({
  baseURL: 'https://dog.ceo/api',
});

export async function getAllBreeds(): Promise<string[]> {
  const response = await dogBreedsApi.get('/breeds/list/all')
  const dataMessage: { [key: string]: string[] } = response.data.message
  return Object.keys(dataMessage)
}

export async function getBreedImages(breed: string, size: number = 3): Promise<string[]> {
  const response = await dogBreedsApi.get(`breed/${breed}/images/random/${size}`)
  const images: string[] = response.data.message
  return images
}