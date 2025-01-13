import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "../screen/WelcomeScreen";
import LoginScreen from "../screen/LoginScreen";
import RegisterScreen from "../screen/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import RestablecerScreen from "../screen/RestablecerScreen";
import CamaraScreen from "../screen/CamaraScreen";
import GaleriaScreeen from "../screen/GaleriaScreeen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={()=>({headerShown:false})}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Welcome" component={MyTabs}/>
            <Stack.Screen name="Restablecer" component={RestablecerScreen}/>
        </Stack.Navigator>
    );
}

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Welcome" component={WelcomeScreen}/>
            <Tab.Screen name="Galeria" component={GaleriaScreeen}/>
            <Tab.Screen name="Camara" component={CamaraScreen}/>
        </Tab.Navigator>
    );
}
export default function MainNavigator() {
    return (
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    );
}