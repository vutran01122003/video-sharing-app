import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Image, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import GLOBAL_TYPES from "../../redux/actions/globalTypes";
import { followUser, unfollowUser } from "../../redux/actions/user.action";

function Account({ user, screen, followingList }) {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const isExists = followingList.find((followingUser) => followingUser._id === user._id);

    const onSetCurrentUser = async () => {
        dispatch({
            type: GLOBAL_TYPES.USER.SET_CURRENT_USER,
            payload: {
                currentUser: user
            }
        });
    };

    const navigateOtherProfile = async () => {
        await onSetCurrentUser();
        navigation.navigate("OtherProfile", {
            screen
        });
    };

    const onFollow = async () => {
        dispatch(followUser(user._id));
    };

    const onUnfollow = () => {
        dispatch(unfollowUser(user._id));
    };

    return (
        <View className="mt-4 flex-row items-center justify-between border-b border-gray-200">
            <TouchableOpacity onPress={navigateOtherProfile}>
                <View className="flex-row items-center p-4 gap-4">
                    <Image
                        source={{ uri: user.avatar }}
                        style={{ resizeMode: "cover", width: 50, height: 50, borderRadius: 100 }}
                    />
                    <Text className="text-lg font-bold color-gray-600">{user?.user_name}</Text>
                </View>
            </TouchableOpacity>

            <View className="flex-row items-center gap-4">
                <TouchableOpacity onPress={isExists ? onUnfollow : onFollow}>
                    <View
                        className={`${
                            isExists ? "bg-main" : "bg-blue-500"
                        } w-28 h-10 rounded-md items-center justify-center`}
                    >
                        <Text className="text-white font-boldqr">{isExists ? "Unfollow" : "Follow"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Account;
