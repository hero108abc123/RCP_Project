import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import SapChieu from '../(screen)/sap-chieu';
import DangChieu from '../(screen)/dang-chieu';

const renderScene = SceneMap({
  sapchieu: SapChieu,
  dangchieu: DangChieu,
});

const routes = [
  { key: 'sapchieu', title: 'Sap Chieu' },
  { key: 'dangchieu', title: 'Dang Chieu' },
];

export default function TabViewExample() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}