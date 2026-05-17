section('メモの編集・保存');

test('updateMemo() でタイトルを変更できる', () => {
  let memos = addMemo(initMemos(), createMemo());
  const id = memos[0].id;
  memos = updateMemo(memos, id, { title: 'テスト' });
  assert(memos[0].title === 'テスト', `title が "${memos[0].title}"`);
});

test('updateMemo() で本文を変更できる', () => {
  let memos = addMemo(initMemos(), createMemo());
  const id = memos[0].id;
  memos = updateMemo(memos, id, { body: '本文テスト' });
  assert(memos[0].body === '本文テスト', `body が "${memos[0].body}"`);
});

test('updateMemo() で updated が更新される', () => {
  let memos = addMemo(initMemos(), createMemo());
  const id = memos[0].id;
  memos[0] = { ...memos[0], updated: '2000-01-01T00:00:00.000Z' };
  memos = updateMemo(memos, id, { title: '変更後' });
  assert(memos[0].updated !== '2000-01-01T00:00:00.000Z', 'updated が変わっていない');
});

test('saveMemos() / loadMemos() で保存・読み込みができる', () => {
  let memos = addMemo(initMemos(), createMemo());
  memos = updateMemo(memos, memos[0].id, { title: '保存テスト' });
  saveMemos(memos);
  const loaded = loadMemos();
  assert(loaded.length === 1, `length が ${loaded.length}`);
  assert(loaded[0].title === '保存テスト', `title が "${loaded[0].title}"`);
  localStorage.removeItem('memos');
});

test('存在しない id を更新してもリストは変わらない', () => {
  let memos = addMemo(initMemos(), createMemo());
  const before = memos.length;
  memos = updateMemo(memos, 'no-such-id', { title: 'x' });
  assert(memos.length === before, 'length が変わった');
});

test('localStorage が空のとき loadMemos() は空配列を返す', () => {
  localStorage.removeItem('memos');
  const memos = loadMemos();
  assert(Array.isArray(memos), '配列でない');
  assert(memos.length === 0, `length が ${memos.length}`);
});

test('localStorage に壊れた JSON があっても loadMemos() は空配列を返す', () => {
  localStorage.setItem('memos', 'INVALID_JSON');
  const memos = loadMemos();
  assert(Array.isArray(memos), '配列でない');
  assert(memos.length === 0, '空配列でない');
  localStorage.removeItem('memos');
});
