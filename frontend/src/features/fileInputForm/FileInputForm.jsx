import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, mixed } from 'yup';
import { useAddCustomFileMutation } from './fileInputFormSlice';

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

  const [AddCustomFile, { isLoading: isLoadingCustomFile }] = useAddCustomFileMutation();

  const onSubmit = (formValues) => {
    const tfile = formValues.myFile[0];
    if (typeof tfile !== 'undefined') {
      const formData = new FormData();
      formData.append('customfile', tfile, tfile.name);
      AddCustomFile(formData);
      reset();
    }
  };

  return (
    <div>
      <Card border="secondary">
        <Form.Label>
          <h5>Добавьте PDF файл</h5>
        </Form.Label>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="form-control"
            accept=".pdf"
            id="fileItem"
            type="file"
            {...register('myFile')}
          />
          <p>{errors.myFile?.message}</p>
          <Button variant="info" type="submit">
            Отправить
            {isLoadingCustomFile}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default FileInputForm;
