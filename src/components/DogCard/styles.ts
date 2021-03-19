import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

const CARD_PADDING = 8
const CARD_WIDTH = width / 3 - CARD_PADDING

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: CARD_PADDING,
  },
  header: {
    paddingVertical: 8,
  },
  title: {
    fontSize: 20,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_WIDTH
  }
});
