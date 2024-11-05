import { SafeAreaView } from "react-native-web";

function Container({ children }) {
    return <SafeAreaView className="pb-20">{children}</SafeAreaView>;
}

export default Container;
