import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function RegisterScreen({ navigation }: any) {
    const [correo, setcorreo] = useState('');
    const [contrasena, setcontrasena] = useState('');

    function register() {
        createUserWithEmailAndPassword(auth, correo, contrasena)
            .then((userCredential) => {
                const user = userCredential.user;
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

                // Using switch to handle different error codes
                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        titulo = "Correo en uso";
                        mensaje = "Este correo ya está registrado, intenta con otro";
                        break;
                    case 'auth/invalid-email':
                        titulo = "Correo inválido";
                        mensaje = "El formato del correo es incorrecto";
                        break;
                    case 'auth/weak-password':
                        titulo = "Contraseña débil";
                        mensaje = "La contraseña debe tener al menos 6 caracteres";
                        break;
                    default:
                        titulo = "Error";
                        mensaje = "Algo salió mal, intenta de nuevo";
                        break;
                }

                Alert.alert(titulo, mensaje);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <TextInput
                placeholder='Correo Electrónico'
                style={styles.input}
                value={correo}
                onChangeText={setcorreo}
            />
            <TextInput
                placeholder='Contraseña'
                style={styles.input}
                value={contrasena}
                onChangeText={setcontrasena}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={register}>
                <Text style={styles.buttonText}>Crear Cuenta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Ya tienes una cuenta? Iniciar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        fontSize: 18,
        marginVertical: 12,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 40,
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
    loginLink: {
        color: '#007BFF',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});
