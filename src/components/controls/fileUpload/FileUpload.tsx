import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { FunctionComponent } from 'react';
import React from 'react';
import { CloudUpload } from '@mui/icons-material';
import { EColumns } from '@/models/reusableEnums';
import { ITemperatureData } from '@/models/reusableInterfaces';
import { useAppDispatch } from '@/store/store';
import { postTemperaturesData } from '@/store/temperatures';
import { useSelector } from 'react-redux';
import { getTemperaturesFilename, setError } from '@/store/temperatures';
import { columns } from '@/assets/consts';

const FileUpload: FunctionComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const filename = useSelector(getTemperaturesFilename);

  const onPostTemperatures = (filename: string, data: ITemperatureData[]) =>
    dispatch(postTemperaturesData({ filename, data }));

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      <input ref={fileInputRef} type="file" accept=".csv" multiple={false} onChange={handleFileChange} hidden />
    </FormControl>
  );
};

export default FileUpload;
