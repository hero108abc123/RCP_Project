import { useRouter } from 'expo-router';
import { Chip } from 'react-native-paper';

type Props = {
  time: string;
  seats: number;
  cinemaName: string;
};

export default function ShowtimeChip({ time, seats, cinemaName }: Props) {
  const router = useRouter();

  return (
    <Chip
      style={{ marginRight: 8, marginBottom: 8 }}
      onPress={() =>
        router.push({
          pathname: '/cinema/seat',
          params: {
            cinemaName,
            time,
          },
        })
      }
    >
      {time} • {seats} trống
    </Chip>
  );
}
