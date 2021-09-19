import { React } from 'react';
// eslint-disable-next-line no-unused-vars
import { ArrowRightSquareFill, ArrowLeftSquareFill, Funnel } from 'react-bootstrap-icons';
import { Grid, _ } from 'gridjs-react';
import 'gridjs/dist/theme/mermaid.css';

const OnlyTable = (indata) => {
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
        search
        sort
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
        pagination={{
          limit: 5,
        }}
      />
    </>
  );
};

export default OnlyTable;
