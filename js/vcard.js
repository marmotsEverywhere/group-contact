export default function vcard(groupName, contacts) {
    const [firstName, ...lastNameParts] = groupName.split(' ');
    const lastName = lastNameParts.join(' ');

    const items = contacts.map(function(d, i) {
      return `item${ i }.tel:${ d[1] }\nitem${ i }.X-ABLabel:${ d[0] }\n`;
    }).join('');

    return 'begin:vcard\n' +
            'version:3.0\n' +
            `n:${ lastName };${ firstName };;;\n` +
            `fn:${ groupName }\n` +
            `${ items }end:vcard`;
}
