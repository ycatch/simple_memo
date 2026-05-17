let memos = loadMemos();
let currentId = null;

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`;
}

function renderList() {
  const list = document.getElementById('memo-list');
  list.innerHTML = '';
  memos.forEach(m => {
    const li = document.createElement('li');
    if (m.id === currentId) li.classList.add('active');
    li.innerHTML = `
      <div class="memo-title">${m.title || '無題のメモ'}</div>
      <div class="memo-date">${formatDate(m.updated)}</div>
      <button class="delete-btn" title="削除">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
          <path d="M10 11v6"></path>
          <path d="M14 11v6"></path>
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
        </svg>
      </button>
    `;
    li.addEventListener('click', () => selectMemo(m.id));
    li.querySelector('.delete-btn').addEventListener('click', e => {
      e.stopPropagation();
      onDeleteMemo(m.id);
    });
    list.appendChild(li);
  });
}

function selectMemo(id) {
  currentId = id;
  const m = memos.find(m => m.id === id);
  document.getElementById('editor-placeholder').style.display = 'none';
  document.getElementById('editor-area').style.display = 'flex';
  document.getElementById('title-input').value = m.title;
  document.getElementById('body-input').value = m.body;
  renderList();
}

function onInput() {
  if (!currentId) return;
  memos = updateMemo(memos, currentId, {
    title: document.getElementById('title-input').value,
    body: document.getElementById('body-input').value,
  });
  saveMemos(memos);
  renderList();
}

function onNewMemo() {
  const memo = createMemo();
  memos = addMemo(memos, memo);
  saveMemos(memos);
  selectMemo(memo.id);
}

function onDeleteMemo(id) {
  memos = deleteMemo(memos, id);
  saveMemos(memos);
  if (currentId === id) {
    currentId = null;
    document.getElementById('editor-placeholder').style.display = '';
    document.getElementById('editor-area').style.display = 'none';
    document.getElementById('title-input').value = '';
    document.getElementById('body-input').value = '';
  }
  renderList();
}
