const excelEncoder = new TextEncoder();
const excelDecoder = new TextDecoder();

function excelEscape(value) {
  return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function excelColumn(index) {
  let label = '';
  for (let value = index + 1; value; value = Math.floor((value - 1) / 26)) label = String.fromCharCode(65 + (value - 1) % 26) + label;
  return label;
}

function excelCrc32(bytes) {
  let crc = -1;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xEDB88320 & -(crc & 1));
  }
  return (crc ^ -1) >>> 0;
}

function excelSet(view, offset, value, bytes) {
  if (bytes === 2) view.setUint16(offset, value, true); else view.setUint32(offset, value, true);
}

function excelZip(files) {
  const chunks = [], directory = [];
  let offset = 0;
  files.forEach(([name, content]) => {
    const nameBytes = excelEncoder.encode(name), data = content instanceof Uint8Array ? content : excelEncoder.encode(content), crc = excelCrc32(data);
    const local = new Uint8Array(30 + nameBytes.length), localView = new DataView(local.buffer);
    excelSet(localView, 0, 0x04034b50, 4); excelSet(localView, 4, 20, 2); excelSet(localView, 8, 0, 2); excelSet(localView, 14, crc, 4); excelSet(localView, 18, data.length, 4); excelSet(localView, 22, data.length, 4); excelSet(localView, 26, nameBytes.length, 2);
    local.set(nameBytes, 30); chunks.push(local, data);
    const central = new Uint8Array(46 + nameBytes.length), centralView = new DataView(central.buffer);
    excelSet(centralView, 0, 0x02014b50, 4); excelSet(centralView, 4, 20, 2); excelSet(centralView, 6, 20, 2); excelSet(centralView, 10, 0, 2); excelSet(centralView, 16, crc, 4); excelSet(centralView, 20, data.length, 4); excelSet(centralView, 24, data.length, 4); excelSet(centralView, 28, nameBytes.length, 2); excelSet(centralView, 42, offset, 4);
    central.set(nameBytes, 46); directory.push(central); offset += local.length + data.length;
  });
  const directoryLength = directory.reduce((total, item) => total + item.length, 0), end = new Uint8Array(22), endView = new DataView(end.buffer);
  excelSet(endView, 0, 0x06054b50, 4); excelSet(endView, 8, files.length, 2); excelSet(endView, 10, files.length, 2); excelSet(endView, 12, directoryLength, 4); excelSet(endView, 16, offset, 4);
  return new Blob([...chunks, ...directory, end], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

function downloadClientWorkbook(rows) {
  const headers = Object.keys(rows[0] || { Name: '', Mobile: '', Gender: '', 'Insta ID': '', 'Date of Birth (DD/MM)': '', 'Visit Influenced By': '', Visits: '', 'Lifetime Spend': '', Notes: '' });
  const sheetRows = [headers, ...rows.map(row => headers.map(header => row[header]))].map((row, rowIndex) => `<row r="${rowIndex + 1}">${row.map((value, columnIndex) => `<c r="${excelColumn(columnIndex)}${rowIndex + 1}" t="inlineStr"><is><t>${excelEscape(value)}</t></is></c>`).join('')}</row>`).join('');
  const sheet = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${sheetRows}</sheetData></worksheet>`;
  const files = [
    ['[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>'],
    ['_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'],
    ['xl/workbook.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Clients" sheetId="1" r:id="rId1"/></sheets></workbook>'],
    ['xl/_rels/workbook.xml.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>'],
    ['xl/worksheets/sheet1.xml', sheet]
  ];
  return excelZip(files);
}

async function unzipExcel(buffer) {
  const bytes = new Uint8Array(buffer), view = new DataView(buffer);
  let end = -1;
  for (let index = bytes.length - 22; index >= Math.max(0, bytes.length - 65557); index -= 1) if (view.getUint32(index, true) === 0x06054b50) { end = index; break; }
  if (end < 0) throw new Error('Not an Excel workbook');
  const count = view.getUint16(end + 10, true), directoryOffset = view.getUint32(end + 16, true), files = {};
  let position = directoryOffset;
  for (let entry = 0; entry < count; entry += 1) {
    if (view.getUint32(position, true) !== 0x02014b50) throw new Error('Invalid workbook');
    const compression = view.getUint16(position + 10, true), compressedSize = view.getUint32(position + 20, true), nameLength = view.getUint16(position + 28, true), extraLength = view.getUint16(position + 30, true), commentLength = view.getUint16(position + 32, true), localOffset = view.getUint32(position + 42, true);
    const name = excelDecoder.decode(bytes.slice(position + 46, position + 46 + nameLength));
    const localNameLength = view.getUint16(localOffset + 26, true), localExtraLength = view.getUint16(localOffset + 28, true), data = bytes.slice(localOffset + 30 + localNameLength + localExtraLength, localOffset + 30 + localNameLength + localExtraLength + compressedSize);
    if (compression === 0) files[name] = data;
    else if (compression === 8 && 'DecompressionStream' in window) files[name] = new Uint8Array(await new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer());
    else throw new Error('Unsupported workbook compression');
    position += 46 + nameLength + extraLength + commentLength;
  }
  return files;
}

function excelColumnIndex(reference) {
  return [...reference.replace(/[0-9]/g, '')].reduce((total, letter) => total * 26 + letter.charCodeAt(0) - 64, 0) - 1;
}

function csvRows(text) {
  const rows = [], row = []; let value = '', quoted = false;
  for (let index = 0; index <= text.length; index += 1) {
    const char = text[index] || '\n';
    if (char === '"') { if (quoted && text[index + 1] === '"') { value += char; index += 1; } else quoted = !quoted; }
    else if (char === ',' && !quoted) { row.push(value); value = ''; }
    else if ((char === '\n' || char === '\r') && !quoted) { if (char === '\r' && text[index + 1] === '\n') index += 1; row.push(value); if (row.some(cell => cell !== '')) rows.push(row.splice(0)); value = ''; }
    else value += char;
  }
  return rows;
}

async function clientRowsFromFile(file) {
  if (file.name.toLowerCase().endsWith('.csv')) {
    const rows = csvRows(await file.text()), headers = rows.shift() || [];
    return rows.map(row => Object.fromEntries(headers.map((header, index) => [header, row[index] || ''])));
  }
  const files = await unzipExcel(await file.arrayBuffer()), sheet = files['xl/worksheets/sheet1.xml'];
  if (!sheet) throw new Error('Clients sheet not found');
  const shared = files['xl/sharedStrings.xml'] ? [...new DOMParser().parseFromString(excelDecoder.decode(files['xl/sharedStrings.xml']), 'application/xml').getElementsByTagName('si')].map(item => item.textContent) : [];
  const document = new DOMParser().parseFromString(excelDecoder.decode(sheet), 'application/xml');
  const records = [...document.getElementsByTagName('row')].map(row => {
    const values = [];
    [...row.getElementsByTagName('c')].forEach(cell => { const index = excelColumnIndex(cell.getAttribute('r')), type = cell.getAttribute('t'), raw = cell.getElementsByTagName('v')[0]?.textContent || cell.getElementsByTagName('is')[0]?.textContent || ''; values[index] = type === 's' ? shared[Number(raw)] : raw; });
    return values;
  });
  const headers = records.shift() || [];
  return records.map(row => Object.fromEntries(headers.map((header, index) => [header, row[index] || ''])));
}

function excelExportClientsDatabase() {
  const rows = local('clients').map(entry => ({ Name: entry.name, Mobile: entry.phone, Gender: entry.gender || '', 'Insta ID': entry.instaId || '', 'Date of Birth (DD/MM)': entry.dob || '', 'Visit Influenced By': entry.influencedBy || '', Visits: entry.visits || 0, 'Lifetime Spend': entry.spent || 0, Notes: entry.note || '' }));
  const link = document.createElement('a');
  link.href = URL.createObjectURL(downloadClientWorkbook(rows));
  link.download = `${currentBranch().name.replace(/\s+/g, '-').toLowerCase()}-clients.xlsx`;
  link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 1000); alertToast('Client database downloaded.');
}

async function excelImportClientsDatabase(file) {
  if (!file) return;
  try {
    const rows = await clientRowsFromFile(file); let added = 0, updated = 0, skipped = 0;
    rows.forEach(row => {
      const read = (...keys) => keys.map(key => row[key]).find(value => value !== undefined && String(value).trim() !== '') || '';
      const name = String(read('Name', 'name')).trim(), phone = String(read('Mobile', 'Phone', 'phone')).trim(), genderValue = String(read('Gender', 'gender')).trim().toLowerCase();
      const gender = genderValue === 'male' || genderValue === 'm' ? 'Male' : genderValue === 'female' || genderValue === 'f' ? 'Female' : '';
      if (!name || !phone || !gender) { skipped += 1; return; }
      const incoming = { name, phone, gender, instaId: String(read('Insta ID', 'Instagram ID', 'instaId')).replace(/^@/, ''), dob: String(read('Date of Birth (DD/MM)', 'DOB', 'dob')).trim(), influencedBy: String(read('Visit Influenced By', 'Influenced By', 'influencedBy')).trim(), visits: Number(read('Visits', 'visits')) || 0, spent: Number(read('Lifetime Spend', 'Spent', 'spent')) || 0, note: String(read('Notes', 'Note', 'note')).trim(), branch: state.activeBranch };
      const existing = local('clients').find(entry => entry.phone.replace(/\D/g, '') === phone.replace(/\D/g, ''));
      if (existing) { Object.assign(existing, incoming); updated += 1; } else { state.clients.push({ id: nextId('clients'), ...incoming }); added += 1; }
    });
    persist(); render(); alertToast(`Client database updated: ${added} added, ${updated} updated${skipped ? `, ${skipped} skipped` : ''}.`);
  } catch {
    alertToast('We could not read that file. Please use an Excel (.xlsx) or CSV file.');
  }
}
