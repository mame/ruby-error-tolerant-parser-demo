import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';

self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    if (label === 'json') {
      return './json.worker.js';
    }
    if (label === 'css') {
      return './css.worker.js';
    }
    if (label === 'html') {
      return './html.worker.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.js';
    }
    return './editor.worker.js';
  },
};


const get_init_code = () => {
  const fragment = window.location.hash;
  let code = 'puts "Hello"\nputs "Good-bye"';
  if (fragment.length >= 2) {
    const data = fragment.substring(1);
    const params = new URLSearchParams(data);
    const c = params.get("c");
    if (c) code = c;
  }
  return code;
}

const editor = monaco.editor.create(
  document.getElementById('editor-container'),
  {
    value: get_init_code(),
    language: 'ruby',
    automaticLayout: true,
    autoIndent: true,
    formatOnPaste: true,
    formatOnType: true,
    tabSize: 2,
  }
);

window.update_code = () => {
  const code = editor.getValue();

  if (typeof update !== "undefined") update(code);

  const params = new URLSearchParams();
  params.append("c", code);
  window.location.hash = params.toString();
};

window.update_code();

editor.getModel().onDidChangeContent((event) => {
  window.update_code();
});
