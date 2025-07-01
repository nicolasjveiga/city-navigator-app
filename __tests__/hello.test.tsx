import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

it('teste simples funciona', () => {
  const { getByText } = render(<Text>Hello Test</Text>);
  expect(getByText('Hello Test')).toBeTruthy();
});
