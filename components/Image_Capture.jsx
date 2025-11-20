import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { launchCamera } from 'react-native-image-picker';


export default function Image_Capture() {
    let [capture_image, setCapture_image] = useState(" ");

    const Open_Camera = async () => {
        const response = await launchCamera({

            includeBase64: true,
            mediaType: "photo"
        });

        if (response) {
            setCapture_image(response.assets[0].uri);
        }
        console.log(response);
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <TouchableOpacity onPress={Open_Camera}>
                <Text style={{
                    color: "white",
                    backgroundColor: "black",
                    padding: 10,
                    marginBottom: 10,
                    // fontSize:10

                }}>Image_Capture</Text>

            </TouchableOpacity>
            <Image source={{ uri: capture_image }}
                style={{ width: 200, height: 200, marginTop: 10 }} />
        </View>
    )
}