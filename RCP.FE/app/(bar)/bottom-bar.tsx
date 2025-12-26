import { View } from 'lucide-react';
import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';



const MovieScheduleRoute = () => <View> <MovieScheduleRoute /> </View>;

const CinameScheduleRoute = () => <Text>Albums</Text>;

const VoucherRoute = () => <Text>Recents</Text>;

const OtherRoute = () => <Text>Notifications</Text>;

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'movie', title: 'movie', focusedIcon: 'movie-filter', unfocusedIcon: 'movie-filter-outline'},
    { key: 'ciname', title: 'ciname', focusedIcon: 'ticket-confirmation', unfocusedIcon: 'ticket-confirmation-outline' },
    { key: 'voucher', title: 'voucher', focusedIcon: 'ticket-percent', unfocusedIcon: 'ticket-percent-outline' },
    { key: 'other', title: 'other', focusedIcon: 'projector-screen', unfocusedIcon: 'projector-screen-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    movie: MovieScheduleRoute,
    ciname: CinameScheduleRoute,
    voucher: VoucherRoute,
    other: OtherRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MyComponent;