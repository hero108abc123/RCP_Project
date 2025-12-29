import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import CinemaScreen from '../(screen)/cinema/cinema';
import MovieSchedule from '../(screen)/moive-schedule';
import OtherScreen from '../(screen)/other/other';
import VoucherScreen from '../(screen)/voucher/voucher';

const MovieRoute = () => <MovieSchedule />;
const CinemaRoute = () => <CinemaScreen />;
const VoucherRoute = () => <VoucherScreen />;
const OtherRoute = () => <OtherScreen />;

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
      // barStyle={{ backgroundColor: '#09131f' }}
      // activeColor="#4DA3FF"
      // inactiveColor="#9AA7BD"
    />
  );
}
