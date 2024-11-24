import { useAppDispatch } from '@/store/store';
import { isAnnual, setAnnual, setYear } from '@/store/temperatures';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

const TypeSelector: FunctionComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const annual = useSelector(isAnnual);
  const onChange = () => {
    dispatch(setAnnual(!annual));
    dispatch(setYear(null));
  };

  return (
    <FormControl sx={{ minWidth: 200 }} size="small">
      <InputLabel htmlFor="annual-monthly-selector">Type</InputLabel>
      <Select size="small" id="annual-monthly-selector" label="Type" value={Number(annual)} onChange={onChange}>
        <MenuItem value={0}>Monthly</MenuItem>
        <MenuItem value={1}>Yearly</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TypeSelector;
