import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {
    const [correo, setcorreo] = useState('');
    const [contrasena, setcontrasena] = useState('');

    function login() {
        signInWithEmailAndPassword(auth, correo, contrasena)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setcorreo('');
                setcontrasena('');
                navigation.navigate('Welcome');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                let titulo = "";
                let mensaje = "";

                console.log(errorCode, errorMessage);

                switch (errorCode) {
                    case 'auth/invalid-credential':
                        titulo = "Credenciales inválidas";
                        mensaje = "Las credenciales son incorrectas, Verificar";
                        break;
                    case 'auth/invalid-email':
                        titulo = "Error en el correo";
                        mensaje = "El correo es incorrecto, Verificar";
                        break;
                    default:
                        titulo = "Error";
                        mensaje = "Verifique correo y contraseña";
                        break;
                }

                Alert.alert(titulo, mensaje);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Iniciar sesión</Text>
            <TextInput
                placeholder='Correo electrónico'
                style={styles.input}
                value={correo}
                onChangeText={setcorreo}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder='Contraseña'
                style={styles.input}
                value={contrasena}
                onChangeText={setcontrasena}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.regis}>¿No tienes cuenta? Regístrate</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Restablecer')}>
                <Text style={styles.regis}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        marginVertical: 12,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        borderColor: '#ddd',
        borderWidth: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    text: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 10,
        marginVertical: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    regis: {
        color: '#007BFF',
        fontSize: 16,
        textDecorationLine: 'underline',
        textAlign: 'center',
        marginTop: 10,
    },
});
