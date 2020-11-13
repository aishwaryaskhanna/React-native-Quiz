import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PersonalInformationScreen from './screens/PersonalInformationScreen';
import QuizScreen from './screens/QuizScreen';

const Stack = createStackNavigator();
class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="PersonalInformationScreen">
          <Stack.Screen name="PersonalInformationScreen" component={PersonalInformationScreen} />
          <Stack.Screen name="QuizScreen" component={QuizScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;