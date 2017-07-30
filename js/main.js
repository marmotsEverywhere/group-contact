import vcard from './vcard';
import download from './download';
import { createTable, getRows } from './table';

function displayPane(id) {
  id = id.replace(/#/g, '');
  const targetPane = document.getElementById(id);
  if (!targetPane) {
    return;
  }

  const visiblePanes = document.getElementsByClassName('pane visible');
  [].forEach.call(visiblePanes, (pane) => {
    pane.classList.remove('visible');
  });

  targetPane.classList.add('visible');
}

window.onload = () => {  
  const getStarted = document.getElementById('get-started');
  const back = document.getElementById('back');
  const generate = document.getElementById('generate');

  let table = createTable(document.getElementById('table'));
  getStarted.onclick = () => {
    window.location.hash = '#data-entry';
  }

  back.onclick = () => {
    window.location.hash = '#description';
  }

  generate.onclick = (e) => {
    e.preventDefault();

    let groupName = document.getElementById('group-name').value;
    groupName = groupName || 'Group Contact';

    const contacts = getRows(table)
      .map((i) => table.getDataAtRow(i))
      .filter((d) => d[0] && d[1]);

    if (contacts.length <= 0) {
      alert('Please add a contact first.');
      return;
    }

    download(vcard(groupName, contacts), `${ groupName }.vcf`)
  }

  displayPane(window.location.hash);
}

window.onhashchange = () => {
  displayPane(window.location.hash);
}
