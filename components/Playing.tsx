import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import NeumorphicButton from "./NeumorphicButton";

interface MusicProps {
  playing: {
    title: string;
    artist: string;
    artwork: string;
    url: string;
    id: string;
  };
  settabSelected: any;
  duration: number;
  position: number;
  handleSeek: any;
  handlePlayPause: any;
}

const Playing = ({
  playing,
  settabSelected,
  duration,
  position,
  handleSeek,
  handlePlayPause,
}: MusicProps) => {
  const formatTime = (millis: number): string => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${parseInt(seconds) < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View className="h-screen mt-5">
      <View className="flex-row justify-between mx-7 items-center">
        <View className="p-4 rounded-full bg-gray-800 border border-gray-900 shadow-md shadow-white/10">
          <Ionicons name="arrow-back" size={24} color="white" />
        </View>
        <Text className="text-center text-white font-semibold text-sm">
          PLAYING NOW
        </Text>
        <TouchableOpacity
          onPress={() => settabSelected("list")}
          className="p-4 rounded-full bg-gray-800 border border-gray-900 shadow-md shadow-white/10"
        >
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View
        className={`items-center mt-20 rounded-full border-2 border-[#2a2d2fcd] shadow-inner shadow-gray-700 mx-auto`}
      >
        <Image
          source={{ uri: playing.artwork }}
          alt="image"
          width={250}
          height={250}
          className="rounded-full shadow-lg shadow-black"
        />
      </View>
      <View className="mt-20">
        <Text className="text-center text-4xl text-white font-semibold mb-1">
          {playing.title}
        </Text>
        <Text className="text-center text-sm text-gray-400 font-semibold mb-1">
          {playing.artist}
        </Text>
      </View>
      <View className="mb-8 px-7 mt-20">
        <Slider
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={handleSeek}
          minimumTrackTintColor="#E17645"
          maximumTrackTintColor="#4A4A4A"
          thumbTintColor="#E17645"
        />
        <View className="flex-row justify-between mt-2 px-7">
          <Text className="text-gray-400">{formatTime(position)}</Text>
          <Text className="text-gray-400">{formatTime(duration)}</Text>
        </View>
      </View>
      <View className="flex-row justify-evenly mx-7 items-center">
        <View className="p-6 rounded-full bg-gray-800 border border-gray-900 shadow-md shadow-white/10">
          <Ionicons name="play-skip-back" size={24} color="white" />
        </View>

        <NeumorphicButton
          icon="pause"
          onPress={handlePlayPause}
          color="orange-500"
        />

        <NeumorphicButton icon="play-skip-forward" onPress={() => null} />
      </View>
    </View>
  );
};

export default Playing;
