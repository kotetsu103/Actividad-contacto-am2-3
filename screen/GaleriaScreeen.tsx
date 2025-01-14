import { useState } from 'react';
import { Button, Image, View, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from '../config/Config';  // Replace with the actual path to your Firebase config

export default function GaleriaScreen() {
    const [image, setImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        if (!image) {
            Alert.alert('Imagen no seleccionada', 'Por favor seleccione una imagen primero.');
            return;
        }

        setUploading(true);

        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + new Date().toISOString());  

        const response = await fetch(image);
        const blob = await response.blob();

        try {
            const uploadTask = await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(uploadTask.ref);

        
            console.log('El archivo se ha cargado correctamente. URL de descarga: ', downloadURL);
            Alert.alert('Subida exitosa', '¡Tu imagen ha sido cargada!');
        } catch (error) {
            console.error('La carga falló: ', error);
            Alert.alert('Error al subir', 'Hubo un error al cargar la imagen.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Elige una imagen del carrete de la cámara" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Button
                title={uploading ? 'Subiendo...' : 'Foto subida'}
                onPress={uploadImage}
                disabled={uploading}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
});
