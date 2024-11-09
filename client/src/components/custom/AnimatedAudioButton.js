import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AnimatedAudioButton = ({ nameAudio, setIsAudioModal }) => {
  const [textPosition] = useState(new Animated.Value(0));
  const [textWidth, setTextWidth] = useState(0);
  const maxTextWidth = 80;

  useEffect(() => {
    // Reset animation khi nameAudio thay đổi
    textPosition.setValue(0);
    
    if (textWidth > maxTextWidth) {
      const startAnimation = () => {
        Animated.sequence([
          // Dừng ở đầu 1 giây
          Animated.delay(1000),
          // Chạy sang trái
          Animated.timing(textPosition, {
            toValue: -(textWidth - maxTextWidth),
            duration: 3000,
            useNativeDriver: true
          }),
          // Dừng ở cuối 1 giây
          Animated.delay(1000),
          // Chạy về phải
          Animated.timing(textPosition, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true
          })
        ]).start(() => {
          startAnimation(); // Lặp lại animation
        });
      };

      startAnimation();
    }
  }, [textWidth, nameAudio]);

  return (
    <View className="flex-1 items-center">
      <TouchableOpacity onPress={() => setIsAudioModal(true)}>
        <View className="flex-row bg-white w-32 gap-1 py-2 rounded-3xl justify-center items-center">
          <MaterialCommunityIcons name="music-note-plus" size={19} color="#525f7f" />
          <View style={{
            width: maxTextWidth,
            overflow: 'hidden',
            height: 20, // Thêm chiều cao cố định
          }}>
            <Animated.Text 
              className="color-gray-600 font-semibold"
              numberOfLines={1}
              style={{
                transform: [{ translateX: textPosition }],
              }}
              onLayout={(event) => {
                const width = event.nativeEvent.layout.width;
                if (width !== textWidth) {
                  setTextWidth(width);
                }
              }}
            >
              {nameAudio}
            </Animated.Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AnimatedAudioButton;