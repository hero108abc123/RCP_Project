import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const renderScene = SceneMap({
  sapchieu: SapChieuRoute,
  dangchieu: DangChieuRoute,
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