import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { getAllBreeds, getBreedImages } from 'src/api'

export default function Home() {

  const [searchingText, setSearchingText] = useState<string>('')
  const [allBreeds, setAllBreeds] = useState<string[]>([])
  const [filteredBreeds, setFilteredBreeds] = useState<string[]>([])
  const [imagesByBreed, setImagesByBreed] = useState<{ [key: string]: string }>({})

  async function getBreeds() {
    const breeds = await getAllBreeds()
    setAllBreeds(breeds)
  }

  useEffect(() => {
    getBreeds()
  }, [])

  useEffect(() => {
    const filtered = allBreeds.filter((breed) => breed.toLocaleLowerCase().startsWith(searchingText.toLocaleLowerCase()))
    setFilteredBreeds(filtered)
  }, [searchingText])

  const renderItem = ({ item: breed }: { item: string }) => (
    <Text>{breed}</Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredBreeds}
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
  }
});
