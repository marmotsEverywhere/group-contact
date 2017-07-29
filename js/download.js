export default function download(data, filename) {
  var link = document.createElement("a");
  link.download = filename;
  link.href = `data:text/vcard;charset=utf-8;base64,${ btoa(data) }`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete this.link;
}
