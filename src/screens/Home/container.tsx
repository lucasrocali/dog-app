import React from 'react'
import { SafeAreaView, TextInput, View, FlatList } from 'react-native'
import { Dog } from 'src/@types'
import styles from './styles'
import DogCard from 'src/components/DogCard'

type HomeContainerProps = {
  searchingText: string
  dogs: Dog[]
  onSearchingTextChange: (value: string) => void
}

export default function HomeContainer({ searchingText, dogs, onSearchingTextChange }: HomeContainerProps) {

  const renderItem = ({ item: dog }: { item: Dog }) => (
    <DogCard
      key={dog.breed}
      dog={dog}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dogs}
        ListHeaderComponent={(
          <View style={styles.header}>
            <TextInput
              style={styles.textInput}
              value={searchingText}
              onChangeText={(value) => onSearchingTextChange(value)}
            />
          </View>
        )}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}