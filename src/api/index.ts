import axios from 'axios'

const dogBreedsApi = axios.create({
  baseURL: 'https://dog.ceo/api/breeds',
});

export async function getAllBreeds(): Promise<string[]> {
  const response = await dogBreedsApi.get('/list/all')
  const dataMessage: { [key: string]: string[] } = response.data.message
  return Object.keys(dataMessage)
}

export async function getBreedImages(breed: string): Promise<string[]> {
  const response = await dogBreedsApi.get(`/${breed}/images/random/3`)
  const images: string[] = response.data.message
  return images
}