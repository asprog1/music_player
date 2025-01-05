import { View, Text, StatusBar } from "react-native";
import React from "react";
import "../global.css";
import Layout from "@/components/Layout";

const _layout = () => {
  return (
    <>
      <Layout />
      <StatusBar barStyle={"light-content"} />
    </>
  );
};

export default _layout;
