import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FileUpload } from './fileUpload';
import { TypeSelector } from './typeSelector';
import { YearSelector } from './yearSelector';
import { FunctionComponent } from 'react';

/**
 * @component Controls
 * @returns {JSX.Element} A responsive control panel containing file upload, type selector, and year selector components.
 * @description
 * The `Controls` component provides a structured layout for managing input options, enabling users to:
 * - Upload files via the `FileUpload` component.
 * - Select a yearly/monthly type using the `TypeSelector` component.
 * - Choose a year using the `YearSelector` component.
 */
const Controls: FunctionComponent = (): JSX.Element => {
  return (
    <Box flexShrink={1}>
      <Grid container spacing={1}>
        <Grid size={{ md: 'grow', xs: 12 }}>
          <FileUpload />
        </Grid>
        <Grid size={{ md: 2, xs: 6 }}>
          <TypeSelector />
        </Grid>
        <Grid size={{ md: 2, xs: 6 }}>
          <YearSelector />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Controls;
