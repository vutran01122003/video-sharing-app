import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const LoginScreen = ({ navigation }) => {
    const [isShow, setIsShow] = useState(true);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateLogin = () => {
        let tempErrors = {};

        // Username: max 10 characters, no special characters
        if (!/^[a-zA-Z0-9]{1,10}$/.test(userName)) {
            tempErrors.userName = "Username should be max 10 characters without special symbols.";
        }

        // Password: 6-10 characters, no special characters
        if (!/^[a-zA-Z0-9]{6,10}$/.test(password)) {
            tempErrors.password = "Password should be 6-10 characters without special symbols.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleLogin = () => {
        if (validateLogin()) {
            // Proceed with login logic
            console.log("Login successful!");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/tiktoklogo.png')} style={{ width: 200, height: 200 }} />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.welcomeText}>Welcome!</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Username</Text>
                    <View style={styles.input}>
                        <FontAwesome name="user" size={24} color="#F44B87" />
                        <TextInput
                            placeholder="Enter your user name"
                            placeholderTextColor="lightgray"
                            style={{ flex: 1, outline: 'none' }}
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
                            style={{ flex: 1, outline: 'none' }}
                            onChangeText={(value) => setPassword(value)}
                        />
                        <Pressable onPress={() => setIsShow(!isShow)}>
                            {isShow ? <Ionicons name="eye-sharp" size={24} color="#F44B87" /> : <Ionicons name="eye-off" size={24} color="#F44B87" />}
                        </Pressable>
                    </View>
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafc',
    },
    imageContainer: {
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        padding: 20,
    },
    welcomeText: {
        fontSize: 40,
        color: "#F44B87",
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
        textShadowColor: "#F44B87"
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: "#F44B87",
        fontWeight: '500'
    },
    input: {
        borderWidth: 1,
        borderColor: '#F44B87',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    button: {
        backgroundColor: '#F44B87',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});

export default LoginScreen;
