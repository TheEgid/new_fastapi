import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { mixed, object } from 'yup';
import { useAddCustomFileMutation, useAddFileDataMutation } from './fileInputFormFileSlice';
import Loader from '../../components/Loader';

const schema = object().shape({
  myFile: mixed()
    .test('fileSize', 'Максимальный размер файла 5 Мбайт', (value) => {
      if (!value.length) return true;
      return value[0].size <= 5242880;
    })
    .test('fileType', 'Неподдерживаемый тип файла', (value) => {
      if (value[0]) {
        return value[0].name.endsWith('pdf') && value[0].type === 'application/pdf';
      }
      return true;
    }),
});

const FileInputForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [content, setContent] = useState('');
  const onContentChanged = (e) => setContent(e.target.value);

  const [AddCustomFile, { data, status, isLoading }] = useAddCustomFileMutation();
  const [AddFileData] = useAddFileDataMutation();

  const isPending = status === 'pending';
  const canSave = [content].every(Boolean) && !isLoading;

  const onUploadFileClicked = async () => {
    const inputFile = getValues('myFile')[0];
    const formData = new FormData();

    if (canSave && typeof inputFile !== 'undefined') {
      try {
        formData.append('customfile', inputFile, inputFile.name);
        const returned = await AddCustomFile(formData).unwrap();
        await AddFileData({
          filename: returned.filename,
          content_type: returned['content-type'],
        });
        reset();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to save the post: ', err);
      }
    }
  };

  const getResult = () => {
    let returnedData = '';
    let currentStatus;
    switch (status) {
      case 'fulfilled':
        returnedData = data.filename;
        currentStatus = 'Загружен файл ';
        break;
      case 'pending':
        currentStatus = '';
        break;
      case 'rejected':
        currentStatus = 'Ошибка сервера';
        break;
      default:
        currentStatus = 'Ждём загрузку файла';
        break;
    }
    return [currentStatus, returnedData];
  };

  return (
    <div>
      <Card border="secondary">
        <Form.Label>
          <h5>Добавьте PDF файл</h5>
        </Form.Label>
        <Form>
          <input
            className="form-control"
            disabled={isPending}
            style={isPending ? { color: `transparent` } : {}}
            accept=".pdf"
            id="fileItem"
            type="file"
            {...register('myFile')}
            onChange={onContentChanged}
          />
          <p>{errors.myFile?.message}</p>
          {isPending && <Loader />}
          <p id="result">{getResult()}</p>
          <Button
            variant="info"
            type="button"
            onClick={handleSubmit(onUploadFileClicked)}
            hidden={isPending}>
            Отправить
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default FileInputForm;
