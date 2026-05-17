section('メモの一覧表示');

test('初期状態ではメモリストは空', () => {
  const memos = initMemos();
  assert(Array.isArray(memos), 'memos が配列でない');
  assert(memos.length === 0, `length が ${memos.length}`);
});

test('addMemo() でメモが1件追加される', () => {
  let memos = initMemos();
  memos = addMemo(memos, createMemo());
  assert(memos.length === 1, `length が ${memos.length}`);
});

test('複数追加すると件数が増える', () => {
  let memos = initMemos();
  memos = addMemo(memos, createMemo());
  memos = addMemo(memos, createMemo());
  memos = addMemo(memos, createMemo());
  assert(memos.length === 3, `length が ${memos.length}`);
});

test('最後に追加したメモが先頭に来る', () => {
  let memos = initMemos();
  const first = createMemo();
  const second = createMemo();
  memos = addMemo(memos, first);
  memos = addMemo(memos, second);
  assert(memos[0].id === second.id, '最新のメモが先頭でない');
});

test('タイトルが空のメモは title が空文字', () => {
  const memo = createMemo();
  assert(memo.title === '', `title が "${memo.title}"`);
});
