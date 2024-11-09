import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, Modal, Keyboard, Platform } from 'react-native';
import { X, Heart, ThumbsDown, Gift, AtSign, Smile, ArrowUp } from 'lucide-react-native';

const CommentsModal = ({ visible, onClose }) => {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        const keyboardWillShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const keyboardWillHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => setKeyboardVisible(false)
        );

        return () => {
            keyboardWillShowListener.remove();
            keyboardWillHideListener.remove();
        };
    }, []);

    const handlePostComment = () => {
        // Xử lý đăng bình luận ở đây
        console.log('Posting comment:', commentText);
        setCommentText(''); // Reset input
        Keyboard.dismiss(); // Ẩn bàn phím
    };

    const comments = [
        {
            id: '1',
            user: 'Luu Duc440',
            avatar: '/api/placeholder/40/40',
            comment: 'Cam quay dc ca loi k that day nua a',
            likes: 2003,
            time: '10-21'
        },
        {
            id: '2',
            user: 'VIET',
            avatar: '/api/placeholder/40/40',
            comment: 'luc kho khan thi so day lai ko lay ra dc 🙂',
            likes: 4329,
            time: '10-21'
        },
    ];

    const CommentItem = ({ item }) => (
        <View className="flex-row p-4 border-b border-gray-200">
            <Image
                source={{ uri: item.avatar }}
                className="w-10 h-10 rounded-full"
            />
            <View className="flex-1 ml-3">
                <Text className="font-medium">{item.user}</Text>
                <Text className="mt-1 text-gray-600">{item.comment}</Text>
                <View className="flex-row items-center mt-2 justify-between">
                    <View className='flex-row items-center'>
                        <Text className="text-gray-400 text-sm">{item.time}</Text>
                        <Text className="mx-2 text-gray-400">Trả lời</Text>
                    </View>
                    <View className='flex-row items-center gap-4'>
                        <TouchableOpacity>
                            <View className="flex-row justify-center items-center">
                                <Heart size={16} color="#9CA3AF" />
                                <Text className="text-gray-400 text-sm ml-1">{item.likes}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className="ml-4">
                            <ThumbsDown size={16} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
            transparent={true}
        >
            <View className="flex-1 justify-end">
                <View className="h-2/3 bg-white rounded-t-3xl p-4">
                    <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
                        <Text className="text-lg font-medium">679 bình luận</Text>
                        <TouchableOpacity onPress={onClose}>
                            <X size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={comments}
                        renderItem={({ item }) => <CommentItem item={item} />}
                        keyExtractor={item => item.id}
                        className="flex-1"
                    />

                    <View className="p-2 border-t border-gray-200">
                        <View className='flex-row'>
                            <Image
                                source={undefined}
                                className="w-10 h-10 rounded-full"
                            />
                            <View className={`flex-row items-center flex-1 bg-gray-100 rounded-full px-4 py-2`}>

                                <TextInput
                                    placeholder="Thêm bình luận..."
                                    className="flex-1 mx-2"
                                    value={commentText}
                                    onChangeText={setCommentText}
                                />
                                {
                                    keyboardVisible === false && (
                                        <View className="flex-row gap-2">
                                            <TouchableOpacity>
                                                <AtSign size={24} color="#000" />
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Smile size={24} color="#000" />
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Gift size={24} color="#000" />
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                        {keyboardVisible && (
                            <TouchableOpacity
                                onPress={handlePostComment}
                            >
                                <View className='flex-row items-center justify-end gap-2 mt-2'>
                                    <View className="flex-row gap-2 items-center">
                                        <TouchableOpacity>
                                            <AtSign size={24} color="#000" />
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Smile size={24} color="#000" />
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Gift size={24} color="#000" />
                                        </TouchableOpacity>
                                    </View>
                                    <View className="w-16 h-3 bg-pink-300 justify-center items-center p-4 rounded-full">
                                        <ArrowUp color='white' />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CommentsModal;