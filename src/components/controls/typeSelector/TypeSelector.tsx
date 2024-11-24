import { useAppDispatch } from '@/store/store';
import { isYearAxis, setYearAxis, setYear } from '@/store/temperatures';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

/**
 * @component TypeSelector
 * @returns {JSX.Element} A styled dropdown selector for switching between "Yearly" and "Monthly" data views.
 * @description
 * The `TypeSelector` component is a part of the controls used to configure data visualization. It provides:
 * - A dropdown menu with two options: "Monthly" and "Yearly."
 * - Dispatches Redux actions to update the selected axis type and clear the selected year when toggled.
 */
const TypeSelector: FunctionComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const yearAxis = useSelector(isYearAxis);

  /**
   * Toggles the year axis view and resets the selected year.
   *
   * This function dispatches two actions:
   * 1. Toggles the `yearAxis` value between `true` (yearly view) and `false` (monthly view).
   * 2. Resets the selected year to `null` to ensure the view is updated accordingly.
   */
  const onChange = () => {
    dispatch(setYearAxis(!yearAxis));
    dispatch(setYear(null));
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel htmlFor="year-monthly-selector">Type</InputLabel>
      <Select size="small" id="year-monthly-selector" label="Type" value={Number(yearAxis)} onChange={onChange}>
        <MenuItem value={0}>Monthly</MenuItem>
        <MenuItem value={1}>Yearly</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TypeSelector;
