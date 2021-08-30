import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, mixed } from 'yup';

const schema = object().shape({
  myFile: mixed()
    .test('fileSize', 'Максимальный размер файла 5 мегабайт', (value) => {
      if (!value.length) return true;
      return value[0].size <= 5242880;
    })
    .test('fileType', 'Неподдерживаемый тип файла', (value) => {
      if (value) {
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

  const onSubmit = () => {
    const inputFile = document.getElementById('fileItem').files[0];
    // eslint-disable-next-line no-console
    console.log(inputFile);
    reset();
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
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default FileInputForm;
