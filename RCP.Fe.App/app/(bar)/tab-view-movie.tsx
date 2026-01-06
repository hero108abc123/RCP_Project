import * as React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

import DangChieu from '../(screen)/dang-chieu';
import SapChieu from '../(screen)/sap-chieu';

/* ---------- Scene ---------- */
const renderScene = SceneMap({
  sapchieu: SapChieu,
  dangchieu: DangChieu,
});

/* ---------- Routes ---------- */
const routes = [
  { key: 'sapchieu', title: 'Sắp Chiếu' },
  { key: 'dangchieu', title: 'Đang Chiếu' },
];

/* ---------- Custom TabBar ---------- */
const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    activeColor="#ffa200ff"      // ⭐ màu khi chọn
    inactiveColor="#9E9E9E"    // ⭐ màu khi không chọn
    indicatorStyle={styles.indicator}
    style={styles.tabBar}
    labelStyle={styles.label}
  />
);

/* ---------- Component ---------- */
export default function TabViewScene() {
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
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
    
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  indicator: {
    backgroundColor: '#FFA300',
    height: 3,
  },
  label: {
    fontWeight: '900',
    fontSize: 20,
    textTransform: 'none',
  },
});
