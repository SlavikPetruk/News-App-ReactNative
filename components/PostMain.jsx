import styled from 'styled-components/native'


const PostView = styled.View`
  flex-direction: column;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-style: solid;
`

const PostImage = styled.Image`
  width: 100%;
  height: 200px;
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

const shortTitle = (str) => {
  if (str.length >= 100) {
    return str.substring(0, 100) + '...'
  }
  return str
}

const shortDate = (str) => str.substring(0, 10)

export const PostMain = ({ title, imageUrl }) => {
  return (
    <PostView>
      <PostImage source={{ uri: imageUrl }} />
      <PostDetails>
        <PostTitle>{shortTitle(title)}</PostTitle>
      </PostDetails>
    </PostView>
  )
}
