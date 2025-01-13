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
            Alert.alert('No image selected', 'Please select an image first.');
            return;
        }

        setUploading(true);

        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + new Date().toISOString());  // Unique file name

        const response = await fetch(image);
        const blob = await response.blob();

        try {
            const uploadTask = await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(uploadTask.ref);

            // Optionally, you can save this URL to Firestore or use it in your app.
            console.log('File uploaded successfully. Download URL: ', downloadURL);
            Alert.alert('Upload successful', 'Your image has been uploaded!');
        } catch (error) {
            console.error('Upload failed: ', error);
            Alert.alert('Upload failed', 'There was an error uploading the image.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Button
                title={uploading ? 'Uploading...' : 'Upload Photo'}
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
