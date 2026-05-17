function createMemo() {
  return {
    id: crypto.randomUUID(),
    title: '',
    body: '',
    updated: new Date().toISOString(),
  };
}

function initMemos() {
  return [];
}

function addMemo(memos, memo) {
  return [memo, ...memos];
}

function updateMemo(memos, id, changes) {
  return memos.map(m =>
    m.id === id ? { ...m, ...changes, updated: new Date().toISOString() } : m
  );
}

function deleteMemo(memos, id) {
  return memos.filter(m => m.id !== id);
}

function saveMemos(memos) {
  localStorage.setItem('memos', JSON.stringify(memos));
}

function loadMemos() {
  try {
    return JSON.parse(localStorage.getItem('memos') || '[]');
  } catch {
    return [];
  }
}
