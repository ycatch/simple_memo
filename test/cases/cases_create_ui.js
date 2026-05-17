section('メモ新規作成UI');

test('新規メモ作成後に編集エリアが表示される', () => {
  setup();
  onNewMemo();
  const area = document.getElementById('editor-area');
  assert(area.style.display !== 'none', '編集エリアが表示されていない');
});

test('新規メモ作成後にプレースホルダーが非表示になる', () => {
  setup();
  onNewMemo();
  const ph = document.getElementById('editor-placeholder');
  assert(ph.style.display === 'none', 'プレースホルダーが非表示になっていない');
});

test('新規メモ作成後に一覧に1件追加される', () => {
  setup();
  onNewMemo();
  const items = document.getElementById('memo-list').querySelectorAll('li');
  assert(items.length === 1, `一覧の件数が ${items.length}`);
});

test('連続して作成すると件数が増える', () => {
  setup();
  onNewMemo();
  onNewMemo();
  onNewMemo();
  const items = document.getElementById('memo-list').querySelectorAll('li');
  assert(items.length === 3, `一覧の件数が ${items.length}`);
});

test('新規メモ作成後にタイトル入力欄が空', () => {
  setup();
  onNewMemo();
  const val = document.getElementById('title-input').value;
  assert(val === '', `title-input の値が "${val}"`);
});

test('新規メモ作成後に localStorage に保存される', () => {
  setup();
  onNewMemo();
  const saved = loadMemos();
  assert(saved.length === 1, `保存件数が ${saved.length}`);
});
