import { useAppDispatch } from '@/store/store';
import { isYearAxis, setYearAxis, setYear } from '@/store/temperatures';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

const TypeSelector: FunctionComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const yearAxis = useSelector(isYearAxis);
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
