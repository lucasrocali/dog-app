import React from 'react';
import { Text, View, Image } from 'react-native';
import { Dog } from 'src/@types'
import styles from './styles'

type DogCardProps = {
  dog: Dog
}

export default function DogCard({ dog: { breed, images } }: DogCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{breed}</Text>
      </View>
      <View style={styles.content}>
        {images && images.map(image => (
          <Image style={styles.image} source={{ uri: image }} />
        ))}
      </View>
    </View>
  );
}