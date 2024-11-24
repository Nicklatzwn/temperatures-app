import { useAppDispatch } from '@/store/store';
import { getTemperaturesYears, getYear, setAnnual, setYear } from '@/store/temperatures';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

const YearSelector: FunctionComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const years = useSelector(getTemperaturesYears);
  const year = useSelector(getYear);

  const onChange = (e: SelectChangeEvent<number | null>) => {
    const value = Number(e.target.value) || null;
    dispatch(setYear(value));
    dispatch(setAnnual(false));
  };

  return (
    <FormControl sx={{ minWidth: 200 }} size="small">
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
