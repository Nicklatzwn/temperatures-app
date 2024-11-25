import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { ChangeEvent, FunctionComponent, useRef } from 'react';
import { CloudUpload } from '@mui/icons-material';
import { EColumns } from '@/models/reusableEnums';
import { ITemperatureData } from '@/models/reusableInterfaces';
import { useAppDispatch } from '@/store/store';
import { postTemperaturesData } from '@/store/temperatures';
import { useSelector } from 'react-redux';
import { getTemperaturesFilename, setError } from '@/store/temperatures';
import { columns } from '@/assets/consts';

/**
 * @component FileUpload
 * @returns {JSX.Element} A styled input field with a file upload functionality.
 * @description
 * The `FileUpload` component allows users to upload CSV files containing temperature data.
 * The component performs the following tasks:
 * - Reads the file content using the `FileReader` API.
 * - Validates that the file contains the required column headers.
 * - Parses the rows into structured data.
 * - Dispatches the data and filename to the Redux store for further processing.
 * - Provides error handling for invalid files or read errors.
 * @limitations
 * - Only supports `.csv` files.
 * - Requires the file to have specific column headers as defined in the `columns` constant.
 */
const FileUpload: FunctionComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const filename = useSelector(getTemperaturesFilename);

  /**
   * Dispatches an action to post the temperatures data to the store.
   *
   * This function takes the filename and the processed temperature data, then dispatches the
   * `postTemperaturesData` action to update the store with the provided data.
   *
   * @param filename - The name of the file from which the data was extracted.
   * @param data - An array of temperature data objects to be stored.
   */
  const onPostTemperatures = (filename: string, data: ITemperatureData[]) =>
    dispatch(postTemperaturesData({ filename, data }));

  /**
   * Handles the file selection and processes the uploaded CSV file.
   *
   * This function is triggered when the user selects a file for upload. It reads the file content,
   * validates the structure, and maps it into a usable format. If any issues are detected, such as
   * an invalid column structure or errors during file reading, appropriate error messages are displayed.
   *
   * @param event - The file input change event containing the selected file.
   */
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target?.result
        ? e.target.result instanceof ArrayBuffer
          ? new TextDecoder().decode(e.target.result)
          : e.target.result
        : null;
      if (!fileContent) return;

      const rows = fileContent.split('\n').filter((row) => row.trim().length);
      const headers = rows[0]
        .split(',')
        .map((header) => header.trim())
        .map((h) => (columns.includes(h) ? (h as EColumns) : null));

      if (headers.filter(Boolean).length !== columns.length) {
        setError(`File must have at least the columns ${columns.join(',')}`);
        return;
      }

      const data: ITemperatureData[] = rows.slice(1).map((row) => {
        const values = row.split(',').map((value) => value.trim());
        return headers.reduce<ITemperatureData>((acc, column, idx) => {
          if (column) acc[column] = isNaN(Number(values[idx])) ? null : Number(values[idx]);
          return acc;
        }, {} as ITemperatureData);
      });

      onPostTemperatures(file.name, data);
    };
    reader.onerror = () => setError('Error reading file');
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /**
   * Triggers a click event on the hidden file input element.
   *
   * This function simulates a click on the file input element when the user clicks on the text field.
   * It allows the user to select a file without directly interacting with the file input.
   */
  const handleTextFieldClick = () => fileInputRef.current && fileInputRef.current.click();

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="inputFileUpload">Filename</InputLabel>
      <OutlinedInput
        id="inputFileUpload"
        size="small"
        startAdornment={
          <InputAdornment position="start">
            <CloudUpload />
          </InputAdornment>
        }
        label="Filename"
        onClick={handleTextFieldClick}
        value={filename}
        placeholder="Select a file..."
      />
      <input
        data-testid="file-input"
        ref={fileInputRef}
        type="file"
        accept=".csv"
        multiple={false}
        onChange={handleFileChange}
        hidden
      />
    </FormControl>
  );
};

export default FileUpload;
