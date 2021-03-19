import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { getAllBreeds, getBreedImages } from 'src/api'

type Dog = {
  breed: string
  images: string[]
}

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

  const renderItem = ({ item: { breed, images } }: { item: Dog }) => (
    <View style={styles.row}>
      <Text key={breed}>{breed}</Text>
      {images && images.map(image => (
        <Text key={image}>{image}</Text>
      ))}
    </View>
  );

  const dogs: Dog[] = filteredBreeds.map(breed => ({ breed, images: imagesByBreed[breed] }))

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dogs}
        ListHeaderComponent={(
          <View style={styles.header}>
            <TextInput
              style={styles.textInput}
              value={searchingText}
              onChangeText={setSearchingText}
            />
          </View>
        )}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {

  },
  textInput: {
    borderColor: '#DDD',
    borderWidth: 1
  },
  row: {

  }
});
