import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import Avatar from "../components/user/Avatar";
import VideoCard from "../components/video/VideoCard";
import TopicCard from "../components/home/TopicCard";
import AudioCard from "../components/home/AudioCard";
import HeaderComponent from "../components/layout/Header";
import { user, users, videos, streamingVideos, audioList, topics } from "../shared";

export default function HomeScreen({ navigation, route }) {
    return (
        <SafeAreaView>
            <HeaderComponent />
            <ScrollView>
                <View className="w-full h-full bg-white p-5 pb-28">
                    <View className="w-full flex-row gap-4 items-start">
                        <TouchableOpacity>
                            <Avatar isCreateStoryButton={true} image={user.avatar} size={20} />
                        </TouchableOpacity>

                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View className="w-full flex-row gap-5">
                                {users.map((user) => (
                                    <View key={user._id}>
                                        <Avatar username={user.username} image={user.avatar} isStory={true} size={20} />
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>

                    <View className="mt-6 gap-6">
                        <View className="flex-row items-center justify-between">
                            <Text className="font-bold color-slate-800 text-xl">Top trending</Text>
                            <Text className="color-main">View more</Text>
                        </View>

                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View className="flex-row gap-6">
                                {videos.map((video) => (
                                    <View key={video._id}>
                                        <VideoCard
                                            image={video.thumbnail}
                                            title={video.title}
                                            views={video.views}
                                            user={video.user}
                                            isTrending={true}
                                        />
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>

                    <View className="mt-6 gap-6">
                        <Text className="font-bold color-slate-800 text-xl">Browser topics</Text>
                        <View className="gap-4 flex-row items-center flex-wrap justify-center">
                            {topics.map((topic, index) => (
                                <TouchableOpacity key={index}>
                                    <TopicCard topic={topic} />
                                </TouchableOpacity>
                            ))}
                            <TopicCard isExpandTopic={true} />
                        </View>
                    </View>

                    <View className="mt-6 gap-6">
                        <View className="flex-row items-center justify-between">
                            <Text className="font-bold color-slate-800 text-xl">Streaming</Text>
                            <Text className="color-main">View more</Text>
                        </View>

                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View className="flex-row gap-6">
                                {streamingVideos.map((video) => (
                                    <View key={video._id}>
                                        <VideoCard
                                            isStreaming={true}
                                            image={video.thumbnail}
                                            createdAt={video.createdAt}
                                            title={video.title}
                                            views={video.views}
                                            user={video.user}
                                        />
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>

                    <View className="mt-6 gap-6">
                        <View className="flex-row items-center justify-between">
                            <Text className="font-bold color-slate-800 text-xl">Audio</Text>
                            <Text className="color-main">View more</Text>
                        </View>

                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View className="flex-row gap-4">
                                {audioList.map((audio) => (
                                    <View key={audio._id}>
                                        <AudioCard
                                            isStreaming={true}
                                            image={audio.thumbnail}
                                            createdAt={audio.createdAt}
                                            type={audio.type}
                                            title={audio.title}
                                            views={audio.views}
                                            user={audio.user}
                                        />
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
