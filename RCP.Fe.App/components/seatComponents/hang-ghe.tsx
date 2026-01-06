import { View } from 'react-native';
import SeatItem from './ghe-don';
import { Seat } from './type-seat';

type Props = {
  seats: Seat[];
  onSelect: (seat: Seat) => void;
};

export default function SeatRow({ seats, onSelect }: Props) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      {seats.map(seat => (
        <SeatItem key={seat.id} seat={seat} onPress={onSelect} />
      ))}
    </View>
  );
}
