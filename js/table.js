export function createTable(container) {
  return new Handsontable(container, {
    data: Array(10).fill().map(() => ['', '']),
    height: 260,
    minSpareRows: 1,
    colHeaders: ['Name', 'Phone Number'],
    colWidths: [410, 410],
    columns: [
      {data: 'name', type: 'text'},
      {data: 'number', type: 'text'}
    ],
  });
}

export function getRows(table) {
  var rows = [];
  for (var i = 0; i < table.countRows(); i++) {
    rows.push(i);
  }
  return rows;
}
