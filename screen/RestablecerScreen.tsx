import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../config/Config';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function RestablecerScreen() {
    const [correo, setcorreo] = useState('');

    function restablecer() {
        sendPasswordResetEmail(auth, correo)
            .then(() => {
                // Password reset email sent!
                Alert.alert('Mensaje', 'Se envió un mensaje al correo');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert('Error', errorMessage); // Provide feedback if there's an error
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Restablecer Contraseña</Text>
            <TextInput
                placeholder='Ingresa tu correo'
                style={styles.input}
                keyboardType='email-address'
                value={correo}
                onChangeText={setcorreo}
            />
            <Button title='Enviar' onPress={restablecer} color="#4CAF50" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    input: {
        fontSize: 18,
        margin: 10,
        height: 50,
        backgroundColor: '#e1e1e1',
        borderRadius: 10,
        width: '100%',
        paddingHorizontal: 15,
    },
});
