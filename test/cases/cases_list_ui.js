section('メモ一覧表示UI');

test('タイトルが一覧に表示される', () => {
  setup();
  memos = addMemo(memos, { ...createMemo(), title: 'テストタイトル' });
  renderList();
  const title = document.querySelector('.memo-title').textContent;
  assert(title === 'テストタイトル', `表示が "${title}"`);
});

test('タイトルが空のメモは「無題のメモ」と表示される', () => {
  setup();
  memos = addMemo(memos, createMemo());
  renderList();
  const title = document.querySelector('.memo-title').textContent;
  assert(title === '無題のメモ', `表示が "${title}"`);
});

test('更新日が一覧に表示される', () => {
  setup();
  memos = addMemo(memos, createMemo());
  renderList();
  const date = document.querySelector('.memo-date').textContent;
  assert(date !== '', '更新日が表示されていない');
});

test('メモをクリックすると active クラスが付く', () => {
  setup();
  onNewMemo();
  const id = memos[0].id;
  selectMemo(id);
  const li = document.querySelector('#memo-list li');
  assert(li.classList.contains('active'), 'active クラスが付いていない');
});

test('別のメモを選択すると active クラスが移動する', () => {
  setup();
  onNewMemo();
  onNewMemo();
  selectMemo(memos[1].id);
  selectMemo(memos[0].id);
  const items = document.querySelectorAll('#memo-list li');
  assert(items[0].classList.contains('active'), '最初のメモに active がない');
  assert(!items[1].classList.contains('active'), '2番目のメモに active が残っている');
});

test('複数メモが正しい件数で表示される', () => {
  setup();
  onNewMemo();
  onNewMemo();
  onNewMemo();
  const items = document.querySelectorAll('#memo-list li');
  assert(items.length === 3, `件数が ${items.length}`);
});
