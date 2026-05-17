section('メモ削除UI');

test('削除後に一覧の件数が減る', () => {
  setup();
  onNewMemo();
  onNewMemo();
  const id = memos[1].id;
  onDeleteMemo(id);
  const items = document.getElementById('memo-list').querySelectorAll('li');
  assert(items.length === 1, `一覧の件数が ${items.length}`);
});

test('選択中のメモを削除すると編集エリアが閉じる', () => {
  setup();
  onNewMemo();
  const id = currentId;
  onDeleteMemo(id);
  const area = document.getElementById('editor-area');
  assert(area.style.display === 'none', '編集エリアが閉じていない');
});

test('別のメモを削除しても編集エリアは開いたまま', () => {
  setup();
  onNewMemo();
  onNewMemo();
  const otherId = memos[1].id;
  onDeleteMemo(otherId);
  const area = document.getElementById('editor-area');
  assert(area.style.display !== 'none', '編集エリアが閉じてしまった');
});
