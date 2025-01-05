import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import MusicList from "./MusicList";
import Playing from "./Playing";
import { LinearGradient } from "expo-linear-gradient";
import { musicData } from "@/data/music";
import { Audio, AVPlaybackStatus } from "expo-av";
import { MusicType } from "@/data/musciTypes";

const Layout = () => {
  const [tabSelected, setTabSelected] = useState<"list" | "playing">("playing");
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [duration, setDuration] = useState<number>(1);

  const currentSong: MusicType = musicData[currentSongIndex];

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (sound && isPlaying) {
      interval = setInterval(async () => {
        const status = (await sound.getStatusAsync()) as AVPlaybackStatus;
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

  const playSound = async (index: number) => {
    if (sound) await sound.unloadAsync();

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: musicData[index].url },
      { shouldPlay: true }
    );

    newSound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
      if (status.isLoaded && status.didJustFinish) {
        handleNext();
      }
    });

    setSound(newSound);
    if (currentSongIndex !== index) {
      setCurrentSongIndex(index);
    }
    setIsPlaying(true);
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

  const handleNext = () => {
    const nextIndex = (currentSongIndex + 1) % musicData.length;
    playSound(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex =
      currentSongIndex - 1 < 0 ? musicData.length - 1 : currentSongIndex - 1;
    playSound(prevIndex);
  };

  const handleSeek = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setPosition(value);
    }
  };

  return (
    <>
      <LinearGradient colors={["#212528", "#111315"]}>
        <SafeAreaView>
          {tabSelected === "list" ? (
            <MusicList
              musicData={musicData}
              setTabSelected={setTabSelected}
              playSound={playSound}
              currentSong={currentSong}
              isPlaying={isPlaying}
              currentSongIndex={currentSongIndex}
              handlePlayPause={handlePlayPause}
            />
          ) : (
            <Playing
              setTabSelected={setTabSelected}
              currentSong={currentSong}
              handlePlayPause={handlePlayPause}
              isPlaying={isPlaying}
              handleNext={handleNext}
              handlePrev={handlePrev}
              handleSeek={handleSeek}
              duration={duration}
              position={position}
            />
          )}
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default Layout;
