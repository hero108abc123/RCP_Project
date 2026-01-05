import { Text, View } from 'react-native';
import ComboItem from './combo-item';

const combos = [
  { id: '1', name: 'Family Combo 69oz', price: 69000 },
  { id: '2', name: 'Sweet Combo 69oz', price: 46000 },
];

export default function ComboList() {
  return (
    <View style={{ margin: 12 }}>
      <Text style={{ fontWeight: '800', marginBottom: 8 }}>COMBO ƯU ĐÃI LỚN</Text>
      {combos.map(c => <ComboItem key={c.id} combo={c} />)}
    </View>
  );
}
