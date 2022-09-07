import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FullPost } from './FullPost'
import { MainScreen } from './MainScreen'

const Stack = createNativeStackNavigator()

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen}  options={{ title: 'Новини' }} />
        <Stack.Screen name="FullPost" component={FullPost}  options={{ title: 'Стаття' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
