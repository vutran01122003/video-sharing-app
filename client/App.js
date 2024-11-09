import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { screenOptions } from "./src/shared/screen";
import { tabs } from "./src/shared/tabs";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, Modal, SafeAreaView } from 'react-native';
import CommentsModal from "./src/components/modal/ModalComment";
const Tab = createBottomTabNavigator();

export default function App() {
    // Trong component cha
    const [modalVisible, setModalVisible] = useState(false);
    return (
        // <NavigationContainer>
        //     <Tab.Navigator initialRouteName={tabs[5].name} screenOptions={screenOptions}>
        //         {tabs.map((tab) => (
        //             <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
        //         ))}
        //     </Tab.Navigator>
        // </NavigationContainer>
        <View className='bg-black flex-1'>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text className="mt-20 text-white">Open Comments</Text>
            </TouchableOpacity>


            <CommentsModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                className="z-40"
            />
        </View>
    );
}
