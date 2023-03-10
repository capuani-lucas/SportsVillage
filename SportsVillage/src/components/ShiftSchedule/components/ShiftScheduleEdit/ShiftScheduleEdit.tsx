
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard, Alert } from "react-native";
import { ShiftEdit } from "../../types";
import useEditScheduleShift from "./hooks/useEditScheduleShift";
import { styles } from "./styles";

interface INProps {
  editing: any;
  setEditing: (editing: ShiftEdit | undefined) => void;
  user: string;
}

const ShiftScheduleEdit: React.FC<INProps> = ({ editing, setEditing, user }) => {

  const { deleteShift, addEditShift } = useEditScheduleShift();

  const editSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  const [textValue, setTextValue] = useState<string>(editing?.shift || "");
  const [notesValue, setNotesValue] = useState<string>("");
  const OPEN_INDEX = 2;

  const handleClose = useCallback(() => {
    setEditing(undefined);
    editSheetRef.current?.close();
  }, []);

  const alertNoUser = () => {
    Alert.alert(
      "Username not set",
      "Please go to settings and set a username. Or you may use the schedule scanner.",
      [
        { text: "OK", onPress: () => handleClose() }
      ],
      { cancelable: false }
    );
  }

  const handleChange = (index: number) => {
    if (index === -1) {
      if (editing && !user && (textValue || notesValue)) {
        alertNoUser();
        return;
      }
      editing && addEditShift(editing.date, user, textValue, notesValue);
      handleClose();
    }
    if (index === OPEN_INDEX) {
      setTextValue(editing?.shift || "");
      setNotesValue(editing?.notes || "");
    }
  };

  return (
    <BottomSheet
      ref={editSheetRef}
      index={editing?.date ? OPEN_INDEX : -1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.bottomSheetHandleIndicator}
      onChange={handleChange}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.bottomSheetEdit}>
          <TextInput 
            style={styles.editInput}
            value={textValue}
            placeholder="Shift hours"
            placeholderTextColor={"#666"}
            onChangeText={setTextValue}
          />
          <TextInput 
            style={styles.notesInput}
            placeholder="Notes"
            value={notesValue}
            placeholderTextColor={"#666"}
            multiline
            onChangeText={setNotesValue}
          />
          <View style={styles.spacer}></View>
          {editing?.shift && (
            <TouchableOpacity style={styles.deleteButton} onPress={() => {
              deleteShift(editing?.date, user);
              handleClose();
            }} >
              <Text>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </BottomSheet>
  );
};

export default ShiftScheduleEdit;