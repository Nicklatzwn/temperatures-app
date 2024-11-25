import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { ITemperatureData, ITemperatureState } from '@/models/reusableInterfaces';
import { YearSelector } from '../yearSelector';
import { createMockStore } from '@/utils';

// Initial state for the temperatures slice.
const initialState: ITemperatureState = {
  data: [],
  year: null,
  yearsAxis: false,
  filename: '',
  loading: false,
  error: '',
};

const data: ITemperatureData[] = [
  {
    Year: 1859,
    Jan: 25.7,
    Feb: 25.4,
    Mar: 24.2,
    Apr: 23.1,
    May: 19.5,
    Jun: 15.7,
    Jul: 14.7,
    Aug: 17.7,
    Sep: 18.3,
    Oct: 23.9,
    Nov: 23.6,
    Dec: 25.4,
    Annual: 21.4,
  },
  {
    Year: 1860,
    Jan: 25.7,
    Feb: 23.6,
    Mar: 24.9,
    Apr: 21.8,
    May: 18.6,
    Jun: 15.5,
    Jul: 14.7,
    Aug: 16.0,
    Sep: 17.9,
    Oct: 20.0,
    Nov: 21.6,
    Dec: 23.2,
    Annual: 20.3,
  },
];

describe('YearSelector Component', () => {
  it('renders the YearSelector with correct initial value', () => {
    const store = createMockStore({
      ...initialState,
      data,
      year: 1859,
    });

    render(
      <Provider store={store}>
        <YearSelector />
      </Provider>
    );

    const selectElement = screen.getByRole('combobox', {
      name: /year/i,
    });
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveTextContent(String(1859));
  });

  it('calls dispatch when switching to selecting a year', async () => {
    const mockDispatch = vi.fn();
    const store = createMockStore({
      ...initialState,
      data,
    });

    // Mock `useDispatch` to return the custom dispatch function
    store.dispatch = mockDispatch;

    render(
      <Provider store={store}>
        <YearSelector />
      </Provider>
    );

    const selectField = screen.getByRole('combobox', {
      name: /year/i,
    }); // Access the Select dropdown
    fireEvent.mouseDown(selectField); // Open the dropdown
    const menuItem = screen.getByText('1860'); // Find the menu item by its text
    fireEvent.click(menuItem); // Click the menu item

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'temperatures/setYear', payload: 1860 })
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'temperatures/setYearAxis', payload: false })
      );
    });
  });
});
