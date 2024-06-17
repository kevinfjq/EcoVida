import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from './app/home';
import CalculatorScreen from "./app/calculatorScreen";

const Tab = createBottomTabNavigator();

export default function Routes(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Calculadora" component={CalculatorScreen}/>
        </Tab.Navigator>
    )
}