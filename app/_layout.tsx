import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import "../global.css";
import Playing from "@/components/Playing";
import MusicList from "@/components/MusicList";
import { musicData } from "@/data/music";
import { Audio, AVPlaybackStatus } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

type MusicItem = {
  id: string;
  title: string;
  artist: string;
  url: string;
  artwork: string;
};

const index = () => {
  const [tabSelected, settabSelected] = useState<"list" | "playing">("playing");
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentSongId, setCurrentSongId] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [duration, setDuration] = useState<number>(1);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    let interval = null;

    if (sound && isPlaying) {
      interval = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded && !status.didJustFinish) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis || 1);
        }
      }, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [sound, isPlaying]);

  const play = async (music: MusicItem) => {
    if (sound) await sound.unloadAsync();

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: music.url },
      { shouldPlay: true }
    );

    newSound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
      if (status.isLoaded && status.didJustFinish) {
        //handle next
      }
    });

    setSound(newSound);
  };

  const playSound = async (music: MusicItem) => {
    setIsPlaying(true);
    setCurrentSongId(Number(music.id));
    await play(music);
  };

  const handleSeek = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setPosition(value);
    }
  };

  const handlePlayPause = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <LinearGradient
        colors={["#111315", "#212528"]}
        start={[0, 1]}
        end={[0, 0]}
        className="h-screen"
      >
        <SafeAreaView>
          {tabSelected === "playing" ? (
            <Playing
              playing={musicData[currentSongId ? currentSongId - 1 : 1]}
              settabSelected={settabSelected}
              duration={duration}
              position={position}
              handleSeek={handleSeek}
              handlePlayPause={handlePlayPause}
            />
          ) : (
            <MusicList
              music={musicData}
              settabSelected={settabSelected}
              playSound={playSound}
              currentSongId={currentSongId}
            />
          )}
        </SafeAreaView>
      </LinearGradient>
      <StatusBar barStyle={"light-content"} />
    </>
  );
};

export default index;
