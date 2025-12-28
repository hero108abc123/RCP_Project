import * as React from 'react';
import { Text } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import MovieSchedule from '../(screen)/moive-schedule';

const MovieRoute = () => <MovieSchedule />;
const CinemaRoute = () => <Text>Cinema</Text>;
const VoucherRoute = () => <Text>Voucher</Text>;
const OtherRoute = () => <Text>Other</Text>;

export default function BottomBar() {
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'movie', title: 'Phim', focusedIcon: 'movie' },
    { key: 'cinema', title: 'Rạp', focusedIcon: 'theater' },
    { key: 'voucher', title: 'Voucher', focusedIcon: 'ticket-percent' },
    { key: 'other', title: 'Khác', focusedIcon: 'dots-grid' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    movie: MovieRoute,
    cinema: CinemaRoute,
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
}
