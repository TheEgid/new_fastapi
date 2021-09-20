import React from 'react';
import { ArrowRightSquareFill, ArrowLeftSquareFill } from 'react-bootstrap-icons';
import { Grid, _ } from 'gridjs-react';
import 'gridjs/dist/theme/mermaid.css';

const TableView = (indata) => {
  const { data } = indata;
  const tableData = [];
  data.map((row) =>
    tableData.unshift([
      row.id,
      row.firstName,
      row.lastName,
      row.email,
      row.address.streetAddress,
      row.address.city,
    ]),
  );
  return (
    <>
      <Grid
        data={tableData}
        columns={['первый', 'второй', 'третий', 'четвертый', 'пятый', 'шестой']}
        sort
        search
        resizable
        language={{
          search: {
            placeholder: 'Поиск...',
          },
          pagination: {
            previous: () => _(<ArrowLeftSquareFill size={20} />),
            next: () => _(<ArrowRightSquareFill size={20} />),
            to: '-',
            of: '/ Всего строк: ',
            showing: 'Строки ',
            results: () => '',
          },
        }}
        pagination={{ limit: 5 }}
      />
    </>
  );
};

export default TableView;
