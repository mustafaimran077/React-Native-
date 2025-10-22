
// import { NavigationContainer } from '@react-navigation/native';

import Home from '../Screens/Home';
import About from '../Screens/About';
import Contact from '../Screens/Contact';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../Screens/Signup';
import login from '../Screens/login';

const Stack = createStackNavigator();


function Stack_Navigation() {
  return(
      
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='About' component={About} />
            <Stack.Screen name='Contact' component={Contact} />
            <Stack.Screen name='Signup' component={Signup} />
            <Stack.Screen name='Login' component={login} />


        </Stack.Navigator>
    
  )
}



export default Stack_Navigation