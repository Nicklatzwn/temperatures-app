import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { postTemperaturesData } from '@/store/temperatures';
import { FileUpload } from '../fileUpload';
import { ITemperatureState } from '@/models/reusableInterfaces';
import { Provider } from 'react-redux';
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

vi.mock('@/store/temperatures', async () => {
  const actual = await vi.importActual<typeof import('@/store/temperatures')>('@/store/temperatures');
  return {
    ...actual,
    postTemperaturesData: vi.fn(),
  };
});

describe('FileUpload Component', () => {
  it('renders the file upload input field', () => {
    const store = createMockStore(initialState);

    render(
      <Provider store={store}>
        <FileUpload />
      </Provider>
    );
    const fileInput = screen.getByLabelText(/Filename/i);
    expect(fileInput).toBeInTheDocument();
  });

  it('handles file upload successfully with valid CSV format', async () => {
    const store = createMockStore(initialState);

    const validCSVContent = `Product code,Station Number,Year,Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec,Annual
IDCJAC0002,066062,1859,25.7,25.4,24.2,23.1,19.5,15.7,14.7,17.7,18.3,23.9,23.6,25.4,21.4`;

    const file = new File([validCSVContent], 'temperatures.csv', { type: 'text/csv' });

    render(
      <Provider store={store}>
        <FileUpload />
      </Provider>
    );

    // Simulate file upload
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      // Expect postTemperaturesData to be called with correctly parsed data
      expect(postTemperaturesData).toHaveBeenCalledWith({
        filename: 'temperatures.csv',
        data: [
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
        ],
      });
    });
  });
});
