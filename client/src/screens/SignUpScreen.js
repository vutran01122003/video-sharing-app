import { useState } from "react";
import { useDispatch } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
    Text,
    View,
    StyleSheet,
    Image,
    SafeAreaView,
    Pressable,
    TextInput,
    ScrollView,
    TouchableOpacity
} from "react-native";
import { register } from "../redux/actions/auth.action";

export default function SignUp({ navigation }) {
    const dispatch = useDispatch();

    const [isShow, setIsShow] = useState(true);
    const [isShowRe, setIsShowRe] = useState(true);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};

        // Username: no more than 10 characters, no special characters
        if (!/^[a-zA-Z0-9]{5,30}$/.test(userName)) {
            tempErrors.userName = "Username should be 5-30 characters without special symbols.";
        }

        // Email: must match email format
        if (!/\S+@\S+\.\S+/.test(email)) {
            tempErrors.email = "Enter a valid email address.";
        }

        // Password: 6-10 characters, no special characters
        if (!/^[a-zA-Z0-9]{5,30}$/.test(password)) {
            tempErrors.password = "Password should be 5-30 characters without special symbols.";
        }

        // Re-enter password: should match password
        if (password !== rePassword) {
            tempErrors.rePassword = "Passwords do not match.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const resetInput = () => {
        setEmail("");
        setUserName("");
        setPassword("");
        setRePassword("");
    };

    const handleSignUp = () => {
        console.log("ok");
        if (validate()) {
            dispatch(
                register({
                    registerData: {
                        user_name: userName,
                        email,
                        password,
                        confirm: rePassword
                    },
                    navigation
                })
            );
            resetInput();
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView>
                <View style={styles.container}>
                    <Pressable style={styles.backContainer} onPress={() => navigation.navigate("Login")}>
                        <Ionicons name="arrow-back-outline" size={24} color="#F44B87" />
                    </Pressable>

                    <View style={{ alignItems: "center", marginBottom: 30 }}>
                        <Image source={require("../../assets/tiktoklogo.png")} style={{ width: 150, height: 150 }} />
                        <Text style={styles.titleText}>Nice to see you!</Text>
                        <Text style={styles.subtitleText}>Create your account</Text>
                    </View>

                    <View style={{ flex: 2 }}>
                        <View style={styles.formInput}>
                            <FontAwesome name="user" size={24} color="#F44B87" />
                            <TextInput
                                placeholder="Enter your user name"
                                placeholderTextColor="#ccc"
                                style={{ flex: 1 }}
                                value={userName}
                                onChangeText={(value) => setUserName(value)}
                            />
                        </View>

                        {errors.userName && <Text style={styles.errorText}>{errors.userName}</Text>}

                        <View style={styles.formInput}>
                            <FontAwesome name="envelope" size={18} color="#F44B87" />
                            <TextInput
                                placeholder="Enter your email"
                                placeholderTextColor="#ccc"
                                style={{ flex: 1 }}
                                keyboardType="email-address"
                                onChangeText={(value) => setEmail(value)}
                                value={email}
                            />
                        </View>

                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                        <View style={styles.formInput}>
                            <FontAwesome name="lock" size={24} color="#F44B87" />
                            <TextInput
                                placeholder="Enter your password"
                                placeholderTextColor="#ccc"
                                style={{ flex: 1 }}
                                secureTextEntry={isShow}
                                onChangeText={(value) => setPassword(value)}
                                value={password}
                            />
                            <Pressable onPress={() => setIsShow(!isShow)}>
                                <Ionicons name={isShow ? "eye-sharp" : "eye-off"} size={24} color="#F44B87" />
                            </Pressable>
                        </View>

                        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                        <View style={styles.formInput}>
                            <FontAwesome name="lock" size={24} color="#F44B87" />
                            <TextInput
                                placeholder="Re-enter your password"
                                placeholderTextColor="#ccc"
                                style={{ flex: 1 }}
                                secureTextEntry={isShowRe}
                                onChangeText={(value) => setRePassword(value)}
                                value={rePassword}
                            />
                            <Pressable onPress={() => setIsShowRe(!isShowRe)}>
                                <Ionicons name={isShowRe ? "eye-sharp" : "eye-off"} size={24} color="#F44B87" />
                            </Pressable>
                        </View>

                        {errors.rePassword && <Text style={styles.errorText}>{errors.rePassword}</Text>}

                        <TouchableOpacity onPress={handleSignUp}>
                            <View style={styles.buttonSignup}>
                                <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Register</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#fff"
    },
    backContainer: {
        position: "absolute",
        top: 10,
        left: 10,
        padding: 10
    },
    titleText: {
        fontWeight: "700",
        fontSize: 30,
        color: "#F44B87"
    },
    subtitleText: {
        fontWeight: "500",
        fontSize: 16,
        textAlign: "center",
        color: "#F44B87"
    },
    formInput: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#F44B87",
        borderRadius: 10,
        padding: 10,
        gap: 10,
        width: "100%",
        height: 45,
        marginBottom: 15
    },
    buttonSignup: {
        height: 50,
        marginTop: 20,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F44B87"
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginLeft: 10,
        marginBottom: 5
    }
});
