section('メモ編集UI');

test('新規メモ作成後に編集エリアが表示される', () => {
  setup();
  onNewMemo();
  const area = document.getElementById('editor-area');
  assert(area.style.display !== 'none', '編集エリアが表示されていない');
});

test('新規メモ作成後にメモが1件一覧に表示される', () => {
  setup();
  onNewMemo();
  const items = document.getElementById('memo-list').querySelectorAll('li');
  assert(items.length === 1, `一覧の件数が ${items.length}`);
});

test('メモを選択すると編集エリアにタイトルが表示される', () => {
  setup();
  memos = addMemo(memos, { ...createMemo(), title: 'テストメモ' });
  renderList();
  selectMemo(memos[0].id);
  const val = document.getElementById('title-input').value;
  assert(val === 'テストメモ', `title-input の値が "${val}"`);
});

test('タイトルを入力するとサイドバーの表示が更新される', () => {
  setup();
  onNewMemo();
  document.getElementById('title-input').value = '新しいタイトル';
  onInput();
  const label = document.getElementById('memo-list').querySelector('.memo-title').textContent;
  assert(label === '新しいタイトル', `サイドバーの表示が "${label}"`);
});

test('本文を入力すると localStorage に保存される', () => {
  setup();
  onNewMemo();
  document.getElementById('body-input').value = '本文テスト';
  onInput();
  const saved = loadMemos();
  assert(saved[0].body === '本文テスト', `保存された body が "${saved[0].body}"`);
});
