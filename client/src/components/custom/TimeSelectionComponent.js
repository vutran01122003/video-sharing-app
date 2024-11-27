import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import Slider from "@react-native-community/slider";

export default function TimeSelectionComponent({ isVisible, onClose, audio, onTimeSelect }) {
    const audioId = audio?._id;
    const duration = audio?.duration;

    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(duration);

    useEffect(() => {
        setStartTime(0);
        setEndTime(duration);
    }, [audioId]);

    const handleConfirm = () => {
        if (startTime > endTime) {
            Alert.alert("Invalid Audio Time", "Start time must be greater than end time.");
            return;
        }
        onTimeSelect(Math.floor(startTime), Math.floor(endTime));
        onClose();
    };

    const handleStartTimeChange = (value) => {
        setStartTime(Math.floor(value));
    };

    const handleEndTimeChange = (value) => {
        setEndTime(Math.floor(value));
    };

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <View className="flex-1 justify-end bg-black/40">
                <View className="bg-white p-6 rounded-t-3xl">
                    <Text className="text-xl font-bold text-center mb-4">Select Audio Time</Text>

                    <View className="mb-6">
                        <Text className="text-base font-medium mb-2">Start Time: {Math.floor(startTime)}s</Text>
                        <Slider
                            className="h-6"
                            minimumValue={0}
                            maximumValue={duration}
                            value={startTime}
                            onValueChange={handleStartTimeChange}
                            minimumTrackTintColor="#F44B87"
                            maximumTrackTintColor="#ddd"
                            thumbTintColor="#F44B87"
                            step={1}
                        />
                    </View>

                    <View className="mb-6">
                        <Text className="text-base font-medium mb-2">End Time: {Math.floor(endTime)}s</Text>
                        <Slider
                            className="h-6"
                            minimumValue={0}
                            maximumValue={duration}
                            value={endTime}
                            onValueChange={handleEndTimeChange}
                            minimumTrackTintColor="#F44B87"
                            maximumTrackTintColor="#ddd"
                            thumbTintColor="#F44B87"
                            step={1}
                        />
                    </View>

                    <View className="flex-row justify-between">
                        <TouchableOpacity onPress={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">
                            <Text className="text-gray-700 font-medium">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleConfirm} className="px-4 py-2 bg-[#F44B87] rounded-lg">
                            <Text className="text-black font-medium">Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
