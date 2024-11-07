import { Text, View, StyleSheet, Image, SafeAreaView, Pressable, TextInput } from 'react-native';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function SignUp({ navigation }) {
  const [isShow, setIsShow] = useState(true);
  const [isShowRe, setIsShowRe] = useState(true);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};

    // Username: no more than 10 characters, no special characters
    if (!/^[a-zA-Z0-9]{1,10}$/.test(userName)) {
      tempErrors.userName = "Username should be max 10 characters without special symbols.";
    }

    // Email: must match email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Enter a valid email address.";
    }

    // Password: 6-10 characters, no special characters
    if (!/^[a-zA-Z0-9]{6,10}$/.test(password)) {
      tempErrors.password = "Password should be 6-10 characters without special symbols.";
    }

    // Re-enter password: should match password
    if (password !== rePassword) {
      tempErrors.rePassword = "Passwords do not match.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validate()) {
      // Perform signup action here
      console.log("Sign up successful!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.backContainer} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={24} color="lightgray" />
      </Pressable>
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('../../assets/tiktoklogo.png')} style={{ width: 200, height: 200 }} />
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
            onChangeText={(value) => setUserName(value)}
          />
        </View>
        {errors.userName && <Text style={styles.errorText}>{errors.userName}</Text>}

        <View style={styles.formInput}>
          <FontAwesome name="envelope" size={24} color="#F44B87" />
          <TextInput 
            placeholder="Enter your email" 
            placeholderTextColor="#ccc" 
            style={{ flex: 1 }} 
            keyboardType="email-address"
            onChangeText={(value) => setEmail(value)}
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
            secureTextEntry={true} 
            onChangeText={(value) => setRePassword(value)}
          />
           <Pressable onPress={() => setIsShowRe(!isShowRe)}>
            <Ionicons name={isShowRe ? "eye-sharp" : "eye-off"} size={24} color="#F44B87" />
          </Pressable>
        </View>
        {errors.rePassword && <Text style={styles.errorText}>{errors.rePassword}</Text>}

        <Pressable style={{ flex: 1 }} onPress={handleSignUp}>
          <View style={styles.buttonSignup}>
            <Text style={{ color: 'white', fontSize: 16 }}>Sign up</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flex: 1,
  },
  backContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  titleText: {
    fontWeight: '700',
    fontSize: 30,
    color: '#F44B87',
  },
  subtitleText: {
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
    color: 'pink',
  },
  formInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F44B87',
    borderRadius: 10,
    padding: 10,
    gap: 5,
    width: "90%",
    height: 45,
    marginBottom: 10,
  },
  buttonSignup: {
    backgroundColor: "#F44B87",
    width: '100%',
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 5,
  },
});
