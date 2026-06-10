const builders = window.MusicVideoBuilders || {};
const builderId = document.body.dataset.builder;
const builder = builders[builderId];
const form = document.querySelector('[data-builder-form]');
const preview = document.querySelector('[data-markdown-preview]');
const statusLine = document.querySelector('[data-copy-status]');
const storageKey = `explorer-music-video-lab:${builderId}`;

function slugify(value) {
  return (value || 'music-video')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70) || 'music-video';
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || '{}');
  } catch {
    return {};
  }
}

function saveState(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

function fieldMarkdown(field, value) {
  const clean = (value || '').trim();
  return `## ${field.label}\n\n${clean || '_Not answered yet._'}\n`;
}

function collectData() {
  const data = {};
  builder.fields.forEach((field) => {
    const input = form.elements[field.id];
    data[field.id] = input ? input.value : '';
  });
  return data;
}

function makeMarkdown(data) {
  const title = data.projectTitle || builder.title;
  const lines = [
    `# ${builder.title}: ${title}`,
    '',
    `- Builder: ${builder.title}`,
    `- Date: ${todayStamp()}`,
    `- Public/private boundary: ${data.boundaries || data.boundaryCheck || data.finalChecks || 'Review before sharing.'}`,
    '',
    builder.intro,
    '',
  ];

  builder.fields.forEach((field) => {
    lines.push(fieldMarkdown(field, data[field.id]));
  });

  lines.push('## Handoff Note');
  lines.push('');
  lines.push('Use this Markdown as a working brief. The creator or rights-holding group keeps final authority over meaning, consent, release and revision.');
  lines.push('');
  return lines.join('\n');
}

function updatePreview() {
  const data = collectData();
  saveState(data);
  preview.textContent = makeMarkdown(data);
}

function renderForm() {
  if (!builder || !form || !preview) return;
  const saved = loadState();

  form.innerHTML = builder.fields.map((field) => {
    const value = saved[field.id] || '';
    const safeValue = escapeHtml(value);
    if (field.type === 'select') {
      const options = field.options.map((option) => `<option value="${option}"${option === value ? ' selected' : ''}>${option}</option>`).join('');
      return `
        <div class="field">
          <label for="${field.id}">${field.label}</label>
          ${field.helper ? `<small>${field.helper}</small>` : ''}
          <select id="${field.id}" name="${field.id}">${options}</select>
        </div>
      `;
    }

    if (field.type === 'textarea') {
      return `
        <div class="field">
          <label for="${field.id}">${field.label}</label>
          ${field.helper ? `<small>${field.helper}</small>` : ''}
          <textarea id="${field.id}" name="${field.id}" placeholder="${escapeHtml(field.placeholder || '')}">${safeValue}</textarea>
        </div>
      `;
    }

    return `
      <div class="field">
        <label for="${field.id}">${field.label}</label>
        ${field.helper ? `<small>${field.helper}</small>` : ''}
        <input id="${field.id}" name="${field.id}" type="text" value="${safeValue}" placeholder="${escapeHtml(field.placeholder || '')}">
      </div>
    `;
  }).join('');

  form.addEventListener('input', updatePreview);
  form.addEventListener('change', updatePreview);
  updatePreview();
}

async function copyMarkdown() {
  await navigator.clipboard.writeText(preview.textContent);
  statusLine.textContent = 'Markdown copied.';
  window.setTimeout(() => {
    statusLine.textContent = '';
  }, 2200);
}

function downloadMarkdown() {
  const data = collectData();
  const title = slugify(data.projectTitle || builder.filename);
  const blob = new Blob([preview.textContent], { type: 'text/markdown;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${builder.filename}-${todayStamp()}-${title}.md`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

function resetBuilder() {
  if (!confirm('Clear this builder on this browser?')) return;
  localStorage.removeItem(storageKey);
  builder.fields.forEach((field) => {
    const input = form.elements[field.id];
    if (!input) return;
    input.value = field.type === 'select' ? field.options[0] : '';
  });
  updatePreview();
}

document.querySelector('[data-copy-markdown]')?.addEventListener('click', copyMarkdown);
document.querySelector('[data-download-markdown]')?.addEventListener('click', downloadMarkdown);
document.querySelector('[data-reset-builder]')?.addEventListener('click', resetBuilder);

renderForm();
