import { render } from '@testing-library/react-native';
import CityCard from '../components/CityCard';

describe('CityCard', () => {
  it('renderiza corretamente com props', () => {
    const { getByText } = render(
      <CityCard name="Paris" country="França" image={{ uri: 'image.png' }} />
    );

    expect(getByText('Paris')).toBeTruthy();
    expect(getByText('França')).toBeTruthy();
  });
});