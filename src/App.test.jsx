import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const submit = jest.fn();
  render(<App />);
  const el = screen.getByTestId('input');
  const button = screen.getByTestId('btn');
  fireEvent.change(el, { target: {value:'name'}})
  fireEvent.click(button);
  console.log(button)
  expect(submit).toHaveBeenCalled()
});
