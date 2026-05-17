section('メモの新規作成');

test('作成されたメモに id が存在する', () => {
  const memo = createMemo();
  assert(memo.id !== undefined, 'id がない');
});

test('作成されたメモの title は空文字', () => {
  const memo = createMemo();
  assert(memo.title === '', `title が "${memo.title}"`);
});

test('作成されたメモの body は空文字', () => {
  const memo = createMemo();
  assert(memo.body === '', `body が "${memo.body}"`);
});

test('作成されたメモに updated（日時）が存在する', () => {
  const memo = createMemo();
  assert(typeof memo.updated === 'string', 'updated がない');
  assert(!isNaN(Date.parse(memo.updated)), 'updated が正しい日時でない');
});

test('2つのメモの id は異なる', () => {
  const a = createMemo();
  const b = createMemo();
  assert(a.id !== b.id, 'id が同じ');
});
