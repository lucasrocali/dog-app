import React from 'react';
import { Text, View } from 'react-native';
import { Dog } from 'src/@types'
import styles from './styles'

type DogCardProps = {
  dog: Dog
}

export default function DogCard({ dog: { breed, images } }: DogCardProps) {
  return (
    <View style={styles.container}>
      <Text key={breed}>{breed}</Text>
      {images && images.map(image => (
        <Text key={image}>{image}</Text>
      ))}
    </View>
  );
}