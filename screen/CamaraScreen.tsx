import { useState, useEffect } from 'react';
import { Button, Image, Text, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CamaraScreen() {
    const [image, setImage] = useState<string | null>(null);
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        // Request camera permission
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const pickImage = async () => {
        if (!hasPermission) {
            alert("Perimiso de la camara requerido");
            return;
        }

        // Launch camera
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Toma la foto</Text>
            <Button title="Tomate una foto" onPress={pickImage} color="#4CAF50" />
            {image ? (
                <Image source={{ uri: image }} style={styles.image} />
            ) : (
                <Text style={styles.noImageText}>Imagen todavia sin capturar</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f8f8',
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    image: {
        width: 250,
        height: 250,
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    noImageText: {
        fontSize: 16,
        color: '#777',
        marginTop: 20,
    },
});
