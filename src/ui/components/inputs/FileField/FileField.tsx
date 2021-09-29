import React, { ChangeEvent, useState, useRef, useEffect } from 'react';
import TextField from '../TextField/TextField';
import { TextFieldProps } from '@mui/material';
import { FileContainer, UploadIcon } from './FileField.style';

export interface FileFieldProps extends Omit<TextFieldProps, 'onChange'> {
    label?: string;
    value?: string;
    onChange: (files: FileList) => void;
}

const FileField: React.FC<FileFieldProps> = ({
    label = 'Selecione o arquivo',
    value = '',
    onChange,
    ...props
}) => {
    const [filePath, setFilePath] = useState('');

    useEffect(() => {
        setFilePath(value);
    }, [value]);

    function handleFileChange(event: ChangeEvent) {
        const target = event.target as HTMLInputElement,
            files = target.files;

        if (files !== null && files.length) {
            setFilePath(files[0]?.name || '');
            onChange(files);
        }
    }

    return (
        <FileContainer>
            <TextField
                label={label}
                value={filePath}
                InputProps={{
                    endAdornment: <UploadIcon className={'twf-upload'} />,
                }}
                {...props}
                fullWidth
            />
            <TextField
                type={'file'}
                onChange={handleFileChange}
                fullWidth
                {...props}
            />
        </FileContainer>
    );
};

export default FileField;
