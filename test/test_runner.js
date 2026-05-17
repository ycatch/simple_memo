let passed = 0;
let failed = 0;
const output = document.getElementById('output');

function section(title) {
  const h = document.createElement('h2');
  h.textContent = title;
  output.appendChild(h);
}

function test(description, fn) {
  const div = document.createElement('div');
  try {
    fn();
    div.className = 'pass';
    div.textContent = `✓ ${description}`;
    passed++;
  } catch (e) {
    div.className = 'fail';
    div.textContent = `✗ ${description} — ${e.message}`;
    failed++;
  }
  output.appendChild(div);
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'assertion failed');
}

function showSummary() {
  const summary = document.getElementById('summary');
  summary.textContent = `${passed + failed} テスト中 ${passed} 件成功、${failed} 件失敗`;
  summary.style.color = failed === 0 ? '#4ec94e' : '#e55';
}
