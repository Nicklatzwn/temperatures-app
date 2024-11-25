import { Provider } from 'react-redux';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Dashboard from '../dashboard/Dashboard';
import { ITemperatureData, ITemperatureState } from '@/models/reusableInterfaces';
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

vi.mock('react-chartjs-2', () => ({
  Line: () => <div data-testid="mock-line-chart">Mocked Line Chart</div>,
}));

describe('Dashboard Component', () => {
  it('should render the Dashboard component correctly', () => {
    // Create a mock store with a controlled state
    const mockStore = createMockStore(initialState);

    render(
      <Provider store={mockStore}>
        <Dashboard />
      </Provider>
    );

    // Check if the card and content are rendered
    expect(screen.getByText('Temperatures')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument(); // Restart button
  });

  it('should display a loading spinner when data is loading', () => {
    // Create a mock store with a loading state
    const mockStore = createMockStore({
      ...initialState,
      loading: true,
    });

    render(
      <Provider store={mockStore}>
        <Dashboard />
      </Provider>
    );

    // Check if CircularProgress is shown
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should display error message when there is an error', async () => {
    // Create a mock store with an error message
    const mockStore = createMockStore({
      ...initialState,
      error: 'An error occurred',
    });

    render(
      <Provider store={mockStore}>
        <Dashboard />
      </Provider>
    );

    // Wait for the Snackbar to show
    const errorSnackbar = await screen.findByRole('alert');
    expect(errorSnackbar).toHaveTextContent('An error occurred');
  });

  it('should dispatch reset action when reset button is clicked', async () => {
    const mockDispatch = vi.fn();
    const store = createMockStore(initialState);

    // Mock `useDispatch` to return the custom dispatch function
    store.dispatch = mockDispatch;

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    // Trigger the reset button click
    fireEvent.click(screen.getByRole('button'));

    // Verify that the dispatch function is called
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'temperatures/clear' }))
    );
  });

  it('should hide the error message when the clear error button is clicked', async () => {
    // Create a mock store with an error message
    const mockStore = createMockStore({
      ...initialState,
      error: 'An error occurred',
    });

    render(
      <Provider store={mockStore}>
        <Dashboard />
      </Provider>
    );

    // Wait for the Snackbar to show
    const errorSnackbar = await screen.findByRole('alert');
    expect(errorSnackbar).toHaveTextContent('An error occurred');

    // Find the close button within the Snackbar
    const closeButton = screen.getByRole('button'); // Close button inside the Snackbar

    // Ensure the close button is in the DOM
    expect(closeButton).toBeInTheDocument();

    // Trigger the close button click to clear the error
    fireEvent.click(closeButton);

    // Check if the error state in the store was cleared
    expect(mockStore.getState().temperatures.error).toBe('');
  });

  it.only('renders chart with if there are mock data', () => {
    render(
      <Provider
        store={createMockStore({
          ...initialState,
          data,
        })}
      >
        <Dashboard />
      </Provider>
    );
    const canvasElement = screen.getByTestId('mock-line-chart');
    expect(canvasElement).toBeInTheDocument();
  });

  it('does not render chart when there is no data', () => {
    render(
      <Provider store={createMockStore(initialState)}>
        <Dashboard />
      </Provider>
    );

    const canvasElement = screen.getByTestId('mock-line-chart');
    expect(canvasElement).not.toBeInTheDocument();
  });
});
