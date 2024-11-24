import { Stack } from '@mui/material';
import { FileUpload } from './fileUpload';
import { TypeSelector } from './typeSelector';
import { YearSelector } from './yearSelector';
import { FunctionComponent } from 'react';

const Controls: FunctionComponent = (): JSX.Element => {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={1}>
      <FileUpload />
      <YearSelector />
      <TypeSelector />
    </Stack>
  );
};

export default Controls;
