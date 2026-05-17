section('メモの削除（ロジック）');

test('deleteMemo() でメモが削除される', () => {
  let memos = addMemo(initMemos(), createMemo());
  const id = memos[0].id;
  memos = deleteMemo(memos, id);
  assert(memos.length === 0, `length が ${memos.length}`);
});

test('削除後に件数が1件減る', () => {
  let memos = initMemos();
  memos = addMemo(memos, createMemo());
  memos = addMemo(memos, createMemo());
  memos = addMemo(memos, createMemo());
  const id = memos[0].id;
  memos = deleteMemo(memos, id);
  assert(memos.length === 2, `length が ${memos.length}`);
});

test('指定したメモだけが削除される', () => {
  let memos = initMemos();
  const a = createMemo();
  const b = createMemo();
  memos = addMemo(memos, a);
  memos = addMemo(memos, b);
  memos = deleteMemo(memos, b.id);
  assert(memos.length === 1, `length が ${memos.length}`);
  assert(memos[0].id === a.id, '残るべきメモが削除された');
});

test('存在しない id を削除してもリストは変わらない', () => {
  let memos = addMemo(initMemos(), createMemo());
  memos = deleteMemo(memos, 'no-such-id');
  assert(memos.length === 1, `length が ${memos.length}`);
});
