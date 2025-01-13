import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../config/Config';


export default function WelcomeScreen({ navigation }: any) {
    function logout() {
        signOut(auth).then(() => {

        }).catch((error) => {

            console.error(error);
        });
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>Bienvenido a la app</Text>
            <Text style={styles.subText}>Iniciaste secion efectivamente</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.buttonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f1f1f1',
    },
    greeting: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    subText: {
        fontSize: 16,
        color: '#777',
        marginBottom: 40,
    },
    logoutButton: {
        backgroundColor: '#ff6347', 
        borderRadius: 10,
        padding: 10,
        width: '80%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
