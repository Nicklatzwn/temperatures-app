import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { TypeSelector } from '../typeSelector';
import { ITemperatureState } from '@/models/reusableInterfaces';
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

describe('TypeSelector Component', () => {
  it('renders the TypeSelector with correct initial value', () => {
    const store = createMockStore({
      ...initialState,
      yearsAxis: true,
    });

    render(
      <Provider store={store}>
        <TypeSelector />
      </Provider>
    );

    const selectElement = screen.getByRole('combobox', {
      name: /type/i,
    });
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveTextContent('Yearly');
  });

  it('calls dispatch when switching to Yearly view', async () => {
    const mockDispatch = vi.fn();
    const store = createMockStore(initialState);

    // Mock `useDispatch` to return the custom dispatch function
    store.dispatch = mockDispatch;

    render(
      <Provider store={store}>
        <TypeSelector />
      </Provider>
    );

    const selectField = screen.getByRole('combobox', {
      name: /type/i,
    }); // Access the Select dropdown
    fireEvent.mouseDown(selectField); // Open the dropdown
    const menuItem = screen.getByText('Yearly'); // Find the menu item by its text
    fireEvent.click(menuItem); // Click the menu item

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'temperatures/setYearAxis', payload: true })
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'temperatures/setYear', payload: null })
      );
    });
  });

  it('calls dispatch when switching to Monthly view', async () => {
    const mockDispatch = vi.fn();
    const store = createMockStore({
      ...initialState,
      yearsAxis: true,
    });

    // Mock `useDispatch` to return the custom dispatch function
    store.dispatch = mockDispatch;

    render(
      <Provider store={store}>
        <TypeSelector />
      </Provider>
    );

    const selectField = screen.getByRole('combobox', {
      name: /type/i,
    }); // Access the Select dropdown
    fireEvent.mouseDown(selectField); // Open the dropdown
    const menuItem = screen.getByText('Monthly'); // Find the menu item by its text
    fireEvent.click(menuItem); // Click the menu item

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'temperatures/setYearAxis', payload: false })
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'temperatures/setYear', payload: null })
      );
    });
  });
});
