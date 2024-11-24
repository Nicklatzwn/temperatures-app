import { useAppDispatch } from '@/store/store';
import { getTemperaturesYears, getYear, setYearAxis, setYear } from '@/store/temperatures';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

/**
 * @component YearSelector
 * @returns {JSX.Element} A styled dropdown menu for selecting a year.
 * @description
 * The `YearSelector` component fetches a list of available years from the Redux store and allows the
 * user to select a specific year. It updates the application's state when a year is selected, and resets
 * the axis type to non-yearly when a year is chosen. If no years are available, the dropdown is disabled.
 */
const YearSelector: FunctionComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const years = useSelector(getTemperaturesYears);
  const year = useSelector(getYear);

  /**
   * Handles the change event for selecting a year.
   *
   * This function is triggered when a new year is selected from the dropdown. It:
   * 1. Converts the selected value to a number (or null if the value is invalid).
   * 2. Dispatches an action to set the selected year in the state.
   * 3. Dispatches an action to set the `yearAxis` to `false`, switching to the monthly view.
   *
   * @param e - The event object triggered by selecting a year.
   */
  const onChange = (e: SelectChangeEvent<number | null>) => {
    const value = Number(e.target.value) || null;
    dispatch(setYear(value));
    dispatch(setYearAxis(false));
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel htmlFor="year-selector">Year</InputLabel>
      <Select
        disabled={!years.length}
        size="small"
        id="year-selector"
        label="Year"
        onChange={onChange}
        value={year || ''}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: '50%',
            },
          },
        }}
      >
        <MenuItem value={''}>
          <em>None</em>
        </MenuItem>
        {years.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default YearSelector;
