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

const editor = monaco.editor.create(
  document.getElementById('editor-container'),
  {
    value: 'puts "Hello"\nputs "Good-bye"',
    language: 'ruby',
    automaticLayout: true,
    autoIndent: true,
    formatOnPaste: true,
    formatOnType: true,
    tabSize: 2,
  }
);

window.update_code = () => {
  if (typeof update !== "undefined") update(editor.getValue());
};

window.update_code();

editor.getModel().onDidChangeContent((event) => {
  window.update_code();
});
