import { StatusBar } from 'expo-status-bar'
import { Post } from '../components/Post'
import { useCallback, useState } from 'react'
import { FlatList, View, RefreshControl, TouchableOpacity, Image } from 'react-native'
import { Loading } from '../components/Loading'
import { Picker } from '@react-native-picker/picker'
import { fetchPosts } from '../api/fetchData'
import { Empty } from './Empty'
import { useFetchNews } from '../api/useFetchNews'
import { PostMain } from '../components/PostMain'
import styled from 'styled-components/native'

const MainView = styled.View`
background: #1D3475;
`

export const MainScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [itemes, setItemes] = useState([])
  const [sortOpen, setSortOpen] = useState(false)
  const [sort, setSort] = useState('relevancy')
  const [langOpen, setLangOpen] = useState(false)
  const [language, setLanguage] = useState('uk')

  const { loading, news, onEndReached } = useFetchNews(sort, language)

  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'X-RapidAPI-Key': '03e896de75msha1a1f81c8f72616p1035fejsn8ffa80c714b6',
  //     'X-RapidAPI-Host': 'newscatcher.p.rapidapi.com',
  //   },
  // }

  // const fetchPosts = async () => {
  //   setIsLoading(true)

  //   await fetch(
  //     `https://newscatcher.p.rapidapi.com/v1/search?q=Elon%20Musk&lang=${language}&sort_by=${sort}&page=1&page_size=10&media=True`,
  //     options,
  //   )
  //     .then((response) => response.json())
  //     .then((response) => setItemes(response.articles))
  //     .catch(function (error) {
  //       console.error(error)
  //       Alert.alert('Помилка', 'Помилка отримання даних')
  //     })
  //     .finally(() => setIsLoading(false))
  // }

  // React.useEffect(fetchPosts, [sort, language])

  const keyExtractor = useCallback((post) => post.id)

  if (isLoading) {
    return <Loading />
  }

  return (
    <MainView>
      <View
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => setLangOpen(!langOpen)}>
          <Image
            style={{ margin: 12, width: 24, height: 24 }}
            source={require('../assets/language.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSortOpen(!sortOpen)}>
          <Image
            style={{ margin: 12, width: 16, height: 16 }}
            source={require('../assets/sort.png')}
          />
        </TouchableOpacity>
      </View>
      {langOpen && (
        <Picker
          selectedValue={language}
          onValueChange={(itemValue) => {
            setLanguage(itemValue)
            setLangOpen(!langOpen)
          }}>
          <Picker.Item label="Українська" value="uk" />
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Deutsch" value="de" />
          <Picker.Item label="Français" value="fr" />
          <Picker.Item label="Español" value="es" />
        </Picker>
      )}

      {sortOpen && (
        <Picker
          selectedValue={sort}
          onValueChange={(itemValue) => {
            setSort(itemValue)
            setSortOpen(!sortOpen)
          }}>
          <Picker.Item label="релевантність" value="relevancy" />
          <Picker.Item label="дата" value="date" />
          <Picker.Item label="популярність" value="rank" />
        </Picker>
      )}

      {/* <PostMain title={news[5].title} imageUrl={news[5].media}/> */}

      {news && (
        <FlatList
          data={news}
          keyExtractor={keyExtractor}
          // onEndReached={onEndReached}
          // onEndReachedThreshold={0.2}
          ListEmptyComponent={Empty}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchPosts} />}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('FullPost', { id: index, title: item.title, language })
              }>
              <Post
                key={item._id}
                title={item.title}
                imageUrl={item.media}
                createdAt={item.published_date}
              />
            </TouchableOpacity>
          )}
        />
      )}
      <StatusBar theme="auto" />
    </MainView>
  )
}
