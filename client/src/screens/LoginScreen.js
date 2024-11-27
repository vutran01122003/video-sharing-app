import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Pressable, Alert, ScrollView } from "react-native";
import { login } from "../redux/actions/auth.action";
import { authSelector } from "../redux/selector";
import LoginLogo from "../../assets/images/logo/tiktok_logo.png";

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const auth = useSelector(authSelector);

    const [isShow, setIsShow] = useState(true);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const validateLogin = () => {
        let tempErrors = {};

        if (!/^[a-zA-Z0-9]{5,30}$/.test(userName)) {
            tempErrors.userName = "Username should be 5-30 characters without special symbols.";
        }

        if (!/^[a-zA-Z0-9]{5,30}$/.test(password)) {
            tempErrors.password = "Password should be 5-30 characters without special symbols.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleLogin = () => {
        if (validateLogin())
            dispatch(
                login({
                    user_name: userName,
                    password
                })
            );
    };

    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" }, tabBarVisible: false });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
    }, [navigation]);

    useEffect(() => {
        if (auth.user) navigation.navigate("Home");
    }, [auth.user]);

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image source={LoginLogo} style={{ width: 150, height: 150 }} />
                        <Text style={styles.welcomeText}>Welcome!</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Username</Text>
                            <View style={styles.input}>
                                <FontAwesome name="user" size={24} color="#F44B87" />
                                <TextInput
                                    placeholder="Enter your user name"
                                    placeholderTextColor="lightgray"
                                    style={{ flex: 1, outline: "none" }}
                                    onChangeText={(value) => setUserName(value)}
                                />
                            </View>
                            {errors.userName && <Text style={styles.errorText}>{errors.userName}</Text>}
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.input}>
                                <FontAwesome name="lock" size={24} color="#F44B87" />
                                <TextInput
                                    placeholder="Enter password"
                                    placeholderTextColor="lightgray"
                                    secureTextEntry={isShow}
                                    style={{ flex: 1, outline: "none" }}
                                    onChangeText={(value) => setPassword(value)}
                                />
                                <Pressable onPress={() => setIsShow(!isShow)}>
                                    {isShow ? (
                                        <Ionicons name="eye-sharp" size={24} color="#F44B87" />
                                    ) : (
                                        <Ionicons name="eye-off" size={24} color="#F44B87" />
                                    )}
                                </Pressable>
                            </View>
                            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                        </View>
                        <View className="flex-row gap-2 justify-end mt-5">
                            <Text style={{ color: "gray" }}>Do you have an account ?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                                <Text style={{ color: "#F44B87", fontWeight: "bold", textDecorationLine: "underline" }}>
                                    Create account
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 30, justifyContent: "center" }}>
                            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    imageContainer: {
        height: "25%",
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        marginTop: 40
    },
    contentContainer: {
        flex: 1,
        padding: 20
    },
    welcomeText: {
        fontSize: 40,
        color: "#F44B87",
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    inputContainer: {
        marginBottom: 15
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: "#F44B87",
        fontWeight: "500"
    },
    input: {
        gap: 10,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        borderColor: "#F44B87",
        flexDirection: "row",
        alignItems: "center"
    },
    button: {
        backgroundColor: "#F44B87",
        borderRadius: 5,
        padding: 15,
        alignItems: "center",
        marginTop: 10
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 5
    }
});

export default LoginScreen;
