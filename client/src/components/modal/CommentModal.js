import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, Modal } from "react-native";
import { X, Heart, Pencil, AtSign, Smile, ArrowUp, Trash2, SendHorizonal, Undo } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, commentSelector } from "../../redux/selector";
import Avatar from "../user/Avatar";
import { createComment, deleteComment, getComments, updateComment } from "../../redux/actions/video.action";
import moment from "moment";
import millify from "millify";

const CommentModal = ({ visible, onClose, video_id }) => {
    const dispatch = useDispatch();

    const commentFlatListRef = useRef();

    const auth = useSelector(authSelector);
    const comment = useSelector(commentSelector);

    const comments = comment[video_id] ?? [];
    const user = auth.user;

    const [commentText, setCommentText] = useState("");
    const [editingCommentText, setEditingCommentText] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [currentCommentId, setCurrentCommentId] = useState(null);

    const handlePostComment = async () => {
        const commentData = { content: commentText, user: user._id };

        await dispatch(createComment(video_id, commentData));

        commentFlatListRef.current.scrollToOffset({ animated: true, offset: 0 });

        setCommentText("");
    };

    const resetEditingData = () => {
        setIsEdit(false);
        setCurrentCommentId(null);
        setEditingCommentText("");
    };

    const onDisableEditStatus = async (comment_id) => {
        await dispatch(updateComment(video_id, comment_id, editingCommentText));
        resetEditingData();
    };

    const onEnableEditStatus = (commentId, content) => {
        setIsEdit(true);
        setCurrentCommentId(commentId);
        setEditingCommentText(content);
    };

    const handleDeleteComment = async (video_id, comment_id) => {
        dispatch(deleteComment(video_id, comment_id));
    };

    useEffect(() => {
        if (!comment[video_id]) dispatch(getComments(video_id));
    }, []);

    const CommentItem = ({ item }) => (
        <View className="flex-row p-4 border-b border-gray-200">
            <Avatar image={item.user?.avatar} width="w-12" height="h-12" />
            <View className="flex-1 ml-3">
                <Text className="font-medium">{item.user.user_name}</Text>
                {isEdit && item._id === currentCommentId ? (
                    <View className={`flex-row items-center bg-gray-100 rounded-md p-2`}>
                        <TextInput
                            placeholder="Thêm bình luận..."
                            className="flex-1 mx-2"
                            value={editingCommentText}
                            onChangeText={setEditingCommentText}
                        />
                    </View>
                ) : (
                    <Text className="mt-1 text-gray-600">{item.content}</Text>
                )}

                <View className="flex-row items-center mt-2 justify-between">
                    <View className="flex-row items-center">
                        <Text className="text-gray-400 text-xs">{moment(item.createdAt).fromNow()}</Text>
                    </View>

                    <View className="flex-row items-center gap-4">
                        {isEdit && item._id === currentCommentId ? (
                            <View className="flex-row items-center gap-4">
                                <TouchableOpacity onPress={() => resetEditingData()}>
                                    <View className="flex-row justify-center items-center">
                                        <Undo size={16} color="#333" />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onDisableEditStatus(item._id, item.content)}>
                                    <View className="flex-row justify-center items-center">
                                        <SendHorizonal size={16} color="#333" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View className="flex-row items-center gap-4">
                                <TouchableOpacity>
                                    <View className="flex-row justify-center items-center">
                                        <Heart size={16} color="#333" />
                                        <Text className="text-gray-400 text-sm ml-1">{item.likes}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onEnableEditStatus(item._id, item.content)}>
                                    <View className="flex-row justify-center items-center">
                                        <Pencil size={16} color="#333" />
                                    </View>
                                </TouchableOpacity>
                                {user._id === item.user._id && (
                                    <TouchableOpacity
                                        className="ml-4"
                                        onPress={() => {
                                            handleDeleteComment(video_id, item._id);
                                        }}
                                    >
                                        <Trash2 size={16} color="#333" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );

    return user ? (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent={true}>
            <View className="flex-1 justify-end">
                <View className="h-2/3 bg-white rounded-t-3xl p-4 justify-between">
                    <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
                        <Text className="text-lg font-medium">{`${millify(comments.length)} comments`} </Text>
                        <TouchableOpacity onPress={onClose}>
                            <X size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        ref={commentFlatListRef}
                        data={comments}
                        renderItem={CommentItem}
                        keyExtractor={(item) => item._id}
                        className="flex-1"
                    />

                    <View className="p-2 border-t border-gray-200">
                        <View className="flex-row items-center gap-2">
                            <Avatar image={user?.avatar} width="w-10" height="h-10" />
                            <View className={`flex-row items-center flex-1 bg-gray-100 rounded-full px-4 py-2`}>
                                <TextInput
                                    placeholder="Thêm bình luận..."
                                    className="flex-1 mx-2"
                                    value={commentText}
                                    onChangeText={setCommentText}
                                />
                            </View>
                        </View>

                        <View className="flex-row items-center justify-end gap-2 mt-2">
                            <View className="flex-row gap-2 items-center">
                                <TouchableOpacity>
                                    <AtSign size={24} color="#000" />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Smile size={24} color="#000" />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={handlePostComment}>
                                <View
                                    className={`w-16 h-3 ${
                                        commentText ? "bg-pink-500" : "bg-pink-300"
                                    } justify-center items-center p-4 rounded-full`}
                                >
                                    <ArrowUp color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    ) : null;
};

export default CommentModal;
