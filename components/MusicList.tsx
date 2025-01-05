import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { MusicType } from "@/data/musciTypes";
import { Entypo, Ionicons } from "@expo/vector-icons";
import NeumorphicButton from "./NeumorphicButton";
import coverimage from "@/assets/assets.jpeg";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  musicData: MusicType[];
  setTabSelected: any;
  playSound: any;
  currentSong: MusicType;
  isPlaying: boolean;
  currentSongIndex: number;
  handlePlayPause: Function;
}

const MusicList = ({
  musicData,
  setTabSelected,
  playSound,
  currentSong,
  isPlaying,
  currentSongIndex,
  handlePlayPause,
}: Props) => {
  return (
    <View className="h-screen">
      <Text className="text-center mt-3 text-white font-semibold text-sm">
        &copy; ASHISH SIGDEL • 2025
      </Text>
      <View className="my-16">
        <View className="flex items-center flex-row justify-between px-7">
          <NeumorphicButton
            icon="heart"
            style="p-4 bg-gray-700"
            onPress={() => null}
          />
          <View className="rounded-full border-2 border-[#2a2d2fcd] shadow-inner shadow-gray-700">
            <Image
              source={currentSong ? { uri: currentSong.artwork } : coverimage}
              alt="image"
              width={150}
              height={150}
              className="rounded-full shadow-lg shadow-black w-52 h-52"
            />
          </View>
          <NeumorphicButton
            icon="ellipsis-horizontal"
            style="p-4 bg-gray-700"
            onPress={() => setTabSelected("playing")}
          />
        </View>
      </View>
      <ScrollView>
        <View className="px-4">
          {musicData.map((music, index) => (
            <TouchableOpacity
              onPress={() => playSound(index)}
              key={music.id}
              className={`rounded-2xl ${
                currentSongIndex === index
                  ? "bg-black border-2 border-[#2a2d2fcd] shadow-inner shadow-gray-800"
                  : "bg-transparent border-0 shadow-none"
              }`}
            >
              <View
                className={`rounded-2xl flex-row justify-between items-center px-4 py-5 ${
                  currentSongIndex === index && "border border-[#2a2d2fcd]"
                }`}
              >
                <View>
                  <Text className="text-white text-xl">{music.title}</Text>
                  <Text className="text-gray-300 text-sm">{music.artist}</Text>
                </View>
                <NeumorphicButton
                  icon={
                    currentSongIndex === index && isPlaying ? "pause" : "play"
                  }
                  style={`p-3 ${
                    currentSongIndex === index ? "bg-orange-700" : "bg-gray-700"
                  }`}
                  onPress={() => handlePlayPause()}
                  iconSize={18}
                  showShadow={false}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MusicList;
