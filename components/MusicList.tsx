import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface MusicType {
  title: string;
  artist: string;
  artwork: string;
  url: string;
  id: string;
}

interface MusicProps {
  music: MusicType[];
  settabSelected: any;
  playSound: any;
  currentSongId?: number;
}

const MusicList = ({
  music,
  settabSelected,
  playSound,
  currentSongId,
}: MusicProps) => {
  return (
    <View className="">
      <Text className="text-center mt-3 text-white font-semibold text-sm">
        EVOL • FUTURE
      </Text>
      <View className="my-16">
        <View className="flex items-center flex-row justify-between px-7">
          <View className="p-4 rounded-full bg-gray-800 border border-gray-900 shadow-md shadow-white/10">
            <Ionicons name="heart" size={24} color="white" />
          </View>
          <View className=" rounded-full bg-gray-800 border border-gray-900 shadow-md shadow-white/10">
            <Image
              source={{
                uri: music[currentSongId ? currentSongId - 1 : 0]?.artwork,
              }}
              alt="image"
              width={150}
              height={150}
              className="rounded-full shadow-md shadow-white/10"
            />
          </View>
          <TouchableOpacity
            onPress={() => settabSelected("playing")}
            className="p-4 rounded-full bg-gray-800 border border-gray-900 shadow-md shadow-white/10"
          >
            <Ionicons name="ellipsis-horizontal" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View className="px-7 gap-y-2">
          {music.map((musicdata, index) => (
            <TouchableOpacity
              onPress={() => playSound(musicdata)}
              key={musicdata.id}
              className={`flex-row justify-between items-center px-4 py-5 rounded-2xl ${
                currentSongId &&
                currentSongId === Number(musicdata.id) &&
                "bg-black/40 border border-white/20"
              }`}
            >
              <View>
                <Text className="text-white text-xl">{musicdata.title}</Text>
                <Text className="text-gray-300 text-sm">
                  {musicdata.artist}
                </Text>
              </View>
              <View
                className={`p-2 rounded-full ${
                  currentSongId && currentSongId === Number(musicdata.id)
                    ? "bg-orange-500"
                    : "bg-gray-800"
                }  border border-gray-900 shadow-md shadow-white/10 `}
              >
                <Ionicons
                  name={
                    currentSongId && currentSongId === Number(musicdata.id)
                      ? "pause"
                      : "play"
                  }
                  size={24}
                  color="white"
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
