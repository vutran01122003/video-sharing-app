import {SafeAreaView, View, Image, Text} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header({headerRight, headerLeft, navigation, route}) {
  return (
    <SafeAreaView style={{height: 70, flexDirection: "row", padding: 10, alignItems: "center", justifyContent: "space-between"}}>
      {
        headerLeft !== false && <Ionicons name="arrow-back" size={24}  color="black" onPress={() => navigation.goBack()} />
      }

      {
        headerRight && 
        <View style={{flexDirection: "row", gap: 10, alignItems: "center", marginLeft: "auto"}}>
          <Image source={{}}/>
          <Text>Username</Text>
        </View>
      }
    </SafeAreaView>
  )
}