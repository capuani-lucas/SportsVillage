import { Alert, Dimensions, Image, Linking, TouchableOpacity, View } from "react-native"
import { faCamera, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { COLORS } from "src/config";
import VerticalSpacer from "src/components/common/VerticalSpacer";
import ImagePicker from 'react-native-image-crop-picker';

import { styles } from "./styles";
import { ScheduleScanner } from "../../types";

type ShiftScheduleScannerImageProps = {
  scheduleScanner: ScheduleScanner;
}

const ShiftScheduleScannerImage: React.FC<ShiftScheduleScannerImageProps> = ({ scheduleScanner }) => {

  const windowWidth = Dimensions.get('window').width;

  const createSettingsAlert = (message: string) => {
    Alert.alert(
      "No permission",
      message,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => Linking.openSettings() }
      ],
      { cancelable: false }
    );
  }

  const chooseImagePicker = (choice: string) => choice === "camera" ? ImagePicker.openCamera : ImagePicker.openPicker;
  const openImagePicker = (choice: "camera" | "gallery") => {
    chooseImagePicker(choice)({
      forceJpg: true,
      mediaType: 'photo'
    })
    .then(image => {
      scheduleScanner.methods.setImageData(
        {
          uri: `file://${image.path}`,
          type: image.mime,
          name: image.filename || ""
        }
      )
      scheduleScanner.methods.increaseCompletedSteps();
    })
    .catch((err: string) => {
      if (err == "Error: User did not grant camera permission.") {
        createSettingsAlert("Please go to settings and allow the app to use your camera.");
      }
      if (err == "Error: User did not grant library permission.") {
        createSettingsAlert("Please go to settings and allow the app to use your photo library");
      }
      console.log(err);
    })
  }


  return (
    <View style={{flex: 1}}>
      <View style={[styles.imageContainer, {width: windowWidth, height: windowWidth}]}>
        {scheduleScanner.imageData.uri ? (
          <Image 
            source={{uri: scheduleScanner.imageData.uri}} 
            style={{width: windowWidth, height: windowWidth}} 
            resizeMode="contain"
          />
        ) : (
          <FontAwesomeIcon icon={faCamera} color={COLORS.background} size={30}/>
        )}
      </View>
      <VerticalSpacer  />
      <View style={styles.imageSelectors}>
        {/* Disable camera for now. Not processing correctly */}
        {/* <TouchableOpacity 
          onPress={() => openImagePicker("camera")} 
          style={styles.cameraPicker}
        >
          <FontAwesomeIcon icon={faCamera} color={COLORS.opposing} />
        </TouchableOpacity> */}
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

