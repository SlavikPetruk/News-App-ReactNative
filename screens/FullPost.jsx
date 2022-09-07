import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components/native'
import { Loading } from '../components/Loading'

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`

const PostTitle = styled.Text`
  font-size: 18px;
  line-height: 24px;
`
const PostDate = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 2px;
`
export const FullPost = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState()
  const [post, setPost] = useState([])
  const { id, title, language } = route.params
  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '03e896de75msha1a1f81c8f72616p1035fejsn8ffa80c714b6',
      'X-RapidAPI-Host': 'newscatcher.p.rapidapi.com',
    },
  }

  const fetchPosts = () => {
    navigation.setOptions({
        title,
      });
    setIsLoading(true)

    fetch(
      `https://newscatcher.p.rapidapi.com/v1/search_free?q=Elon%20Musk&lang=${language}&media=True`,
      options,
    )
      .then((response) => response.json())
      .then((response) => setPost(response.articles[id]))
      .catch(function (error) {
        console.error(error)
        Alert.alert('Помилка', 'Помилка отримання даних')
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(fetchPosts, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <View style={{ padding: 20 }}>
      <PostImage source={{ uri: post.media }} />
      <PostTitle style={{ paddingTop: 4 }}>{post.title}</PostTitle>
      <Text style={{ paddingTop: 14 }}>{post.summary}</Text>
      <PostDate style={{ paddingTop: 6 }}>{post.published_date}</PostDate>
    </View>
  )
}
