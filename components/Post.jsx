import styled from 'styled-components/native'
const PostView = styled.View`
  flex-direction: row;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-style: solid;
  margin-bottom: 20px;
`

const PostImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 12px;
  margin-right: 12px;
`

const PostTitle = styled.Text`
  font-size: 17px;
  font-weight: 700;
`

const PostDetails = styled.View`
  flex: 1;
  justify-content: space-between;
`

const PostDate = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 2px;
`

const shortTitle = (str) => {
  if (str.length >= 60) {
    return str.substring(0, 60) + '...'
  }
  return str
}

const shortDate = (str) => str.substring(0, 10)

export const Post = ({ title, imageUrl, createdAt }) => {
  return (
    <PostView>
      <PostImage source={{ uri: imageUrl }} />
      <PostDetails>
        <PostTitle>{shortTitle(title)}</PostTitle>
        <PostDate>{shortDate(createdAt)}</PostDate>
      </PostDetails>
    </PostView>
  )
}
