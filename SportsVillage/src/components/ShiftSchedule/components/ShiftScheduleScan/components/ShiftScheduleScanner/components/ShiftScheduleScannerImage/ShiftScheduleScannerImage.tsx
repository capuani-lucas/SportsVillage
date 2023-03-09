import { useState } from "react";
import { Dimensions, Image, TouchableOpacity, View } from "react-native"
import { faCamera, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { COLORS } from "src/config";
import VerticalSpacer from "src/components/common/VerticalSpacer";
import ImagePicker from 'react-native-image-crop-picker';

import { styles } from "./styles";

const ShiftScheduleScannerImage: React.FC = () => {

  const [imagePath, setImagePath] = useState<string>();
  const windowWidth = Dimensions.get('window').width;

  const createFormData = (photo: any, body: any) => {
    const data = new FormData();

    data.append("image", {
      name: photo.filename,
      type: photo.mime,
      uri: `file://${photo.path}`
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  }

  const makeRequest = (photo: any) => {
  fetch("http://192.168.2.119:3000/getScheduleData", {
    method: "POST",
    body: createFormData(photo, {})
  })
    .then(response => response.json())
    .then(response => {
      console.log("upload succes", response);
    })
    .catch(error => {
      console.log("upload error", error);
    });
  }

  const chooseImagePicker = (choice: string) => {
    return choice === "camera" ? ImagePicker.openCamera : ImagePicker.openPicker;
  }
  const openImagePicker = (choice: "camera" | "gallery") => {
    chooseImagePicker(choice)({
      forceJpg: true,
      mediaType: 'photo'
    })
    .then(image => {
      console.log(image);
      setImagePath(image.path);
      // makeRequest(image);
    })
    .catch(err => {
      console.log(err);
    })
  }


  return (
    <View style={{flex: 1}}>
      <View style={[styles.imageContainer, {width: windowWidth, height: windowWidth}]}>
        {imagePath ? (
          <Image 
            source={{uri: `file://${imagePath}`}} 
            style={{width: windowWidth, height: windowWidth}} 
            resizeMode="contain"/
          >
        ) : (
          <FontAwesomeIcon icon={faCamera} color={COLORS.background} size={30}/>
        )}
      </View>
      <VerticalSpacer  />
      <View style={styles.imageSelectors}>
        <TouchableOpacity 
          onPress={() => openImagePicker("camera")} 
          style={styles.cameraPicker}
        >
          <FontAwesomeIcon icon={faCamera} color={COLORS.opposing} />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => openImagePicker("gallery")} 
          style={styles.imagePicker}
        >
          <FontAwesomeIcon icon={faImage} color={COLORS.opposing} />
        </TouchableOpacity>
      </View>
    </View>
  )

}

export default ShiftScheduleScannerImage;

