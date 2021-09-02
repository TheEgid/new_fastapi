import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { mixed, object } from 'yup';
import { useAddCustomFileMutation } from './fileInputFormSlice';
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
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [AddCustomFile, { ...returned }] = useAddCustomFileMutation();

  const isPending = returned.status === 'pending';

  const onSubmit = (formValues) => {
    const tfile = formValues.myFile[0];
    if (typeof tfile !== 'undefined') {
      const formData = new FormData();
      formData.append('customfile', tfile, tfile.name);
      AddCustomFile(formData);
      reset();
      returned.status = 'rejected'
    }
  };

  const getResult = (res) => {
    let returnedData = '';
    let currentStatus;
    switch (res.status) {
      case 'fulfilled':
        returnedData = res.data.filename;
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
    return `${currentStatus}  ${returnedData}`;
  };

  return (
    <div>
      <Card border="secondary">
        <Form.Label>
          <h5>Добавьте PDF файл</h5>
        </Form.Label>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <input
            disabled={isPending}
            style={isPending ? { color: `transparent` } : {}}
            className="form-control"
            accept=".pdf"
            id="fileItem"
            type="file"
            {...register('myFile')}
          />
          <p>{errors.myFile?.message}</p>
          {isPending && <Loader />}
          <p>{getResult(returned)}</p>
          <Button hidden={isPending} variant="info" type="submit">
            Отправить
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default FileInputForm;
