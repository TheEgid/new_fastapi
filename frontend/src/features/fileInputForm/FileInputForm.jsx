import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { mixed, object } from 'yup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useAddCustomFileMutation, useAddFileDataMutation } from './fileInputFormFileApi';
import Spinner from '../../components/Spinner';
import Delayed from '../../components/Delayed';

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

  const [content, setContent] = useState();
  const [fileLoadReady, setFileLoadReady] = useState(false);
  const [AddCustomFile, { data, status, isLoading }] = useAddCustomFileMutation();
  const [AddFileData] = useAddFileDataMutation();

  const canSave = !!content && !isLoading;
  const isPending = status === 'pending';

  const documentUserName = document.getElementById('current_user_name');
  const hiddenUser = documentUserName ? documentUserName.innerText : 'Anonymous';

  const onContentChanged = (e) => {
    e.preventDefault();
    setFileLoadReady(true);
    setContent(e.target.value);
  };

  const onUploadFileClicked = async (mydata) => {
    const inputFile = mydata.myFile[0];
    const formData = new FormData();
    setFileLoadReady(false);
    if (canSave && typeof inputFile !== 'undefined') {
      try {
        formData.append('customfile', inputFile, inputFile.name);
        const returned = await AddCustomFile(formData).unwrap();
        await AddFileData({
          filename: returned.filename,
          content: returned.content,
          type: returned.type,
          user_hidden_name: hiddenUser,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to save the post: ', err);
      }
    }
    reset();
  };

  const inputFileName = data ? data.filename : '';
  const statusMock = 'Ждём загрузку файла';

  const statusMap = (externalStatus) =>
    ({ pending: ' ', rejected: 'Ошибка сервера', fulfilled: `Загружен файл ${inputFileName}` }[
      externalStatus
    ]);

  let currentStatus = statusMap(status) || statusMock;

  if (Object.keys(errors).length === 0) {
    currentStatus = fileLoadReady === true ? statusMock : currentStatus;
  } else {
    currentStatus = errors.myFile?.message;
  }

  const CurrentStatusWrapper = () => (
    <Delayed mock={statusMock} waitBeforeShow={5000}>
      <div>{currentStatus}</div>
    </Delayed>
  );

  return (
    <div>
      <Card border="secondary">
        <Card.Body>
          <Form.Label>
            <h5>Добавьте PDF файл</h5>
          </Form.Label>
          <Form>
            <input
              name="fileItem"
              className="form-control"
              disabled={isPending}
              style={isPending ? { color: `transparent` } : {}}
              accept=".pdf"
              type="file"
              {...register('myFile', { required: true })}
              onChange={(e) => {
                onContentChanged(e);
              }}
            />
            <Card.Subtitle style={{ marginTop: '20px', marginBottom: '10px' }}>
              {isPending && <Spinner height={40} width={40} />}
              <CurrentStatusWrapper />
            </Card.Subtitle>
            <Button
              variant="info"
              type="button"
              onClick={handleSubmit(onUploadFileClicked)}
              hidden={isPending}>
              Отправить
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FileInputForm;
