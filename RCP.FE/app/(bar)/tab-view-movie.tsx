import * as React from "react";
import { useWindowDimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

import DangChieu from "../(screen)/dang-chieu";
import SapChieu from "../(screen)/sap-chieu";

const renderScene = SceneMap({
  sapchieu: SapChieu,
  dangchieu: DangChieu,
});

export default function TabViewMovie() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "sapchieu", title: "Sắp chiếu" },
    { key: "dangchieu", title: "Đang chiếu" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
