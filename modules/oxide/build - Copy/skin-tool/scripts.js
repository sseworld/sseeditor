(function() {
  const debounce = (fn, time) => {
    let timeout;

    return function() {
      const functionCall = () => fn.apply(this, arguments);

      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    };
  };

  const defaultVars = {
    'site-background-color': '#fff',
    'background-color': '#fff',
    'color-tint': '#0984e3',
  };

  const changeBodyBackground = (data) => document.body.style.backgroundColor = data['site-background-color'] || null;

  const getData = () => {
    if (localStorage.getItem('sseeditor-oxide-skin-vars') !== null) {
      const variables = parse(
        localStorage.getItem('sseeditor-oxide-skin-vars')
      );
      less.modifyVars(variables);
      changeBodyBackground(variables);

      return variables;
    } else {
      return defaultVars;
    }
  };

  const json = fetch('/skin-tool/less-variables.json').then((x) => {
    return x.json();
  })

  const findMatch = (term) => {
    return json.then((val) => {
      const allVals = {...val, 'site-background-color': '#fff'};
      return Object.keys(allVals).filter((s) => s.includes(term));
    });
  };

  const findHint = async (cm, option) => {
    const cursor = cm.getCursor();
    const line = cm.getLine(cursor.line);
    var start = cursor.ch,
      end = cursor.ch;
    while (start && /\w/.test(line.charAt(start - 1))) --start;
    while (end < line.length && /\w/.test(line.charAt(end))) ++end;
    var word = line.slice(start, end).toLowerCase();
    const data = await findMatch(word);
    return {
      list: data,
      from: CodeMirror.Pos(cursor.line, start),
      to: CodeMirror.Pos(cursor.line, end)
    };
  };

  const regex = /(^[^:]+\s*): ([^;]*);/;
  const stringify = obj => Object.keys(obj).reduce((acc, key) => acc + `${key}: ${obj[key]};\n`, '');
  const parse = str => str.split('\n').reduce((acc, line) => {
    const match = regex.exec(line);
    if (match) {
      acc[match[1]] = match[2];
    }
    return acc;
  }, {})

  const editor = CodeMirror.fromTextArea(document.getElementById('code'), {
    lineNumbers: false,
    mode: 'text/css',
    lint: true,
    theme: 'material',
    extraKeys: {
      'Ctrl-.': 'autocomplete'
    },
    hintOptions: { hint: findHint }
  });

  const data = getData();
  editor.setValue(stringify(data, 0, 2));
  editor.on(
    'change',
    debounce((cm) => {
      const val = cm.getValue();
      const json = parse(val);
      if (Object.keys(json).length !== 0) {
        localStorage.setItem('sseeditor-oxide-skin-vars', stringify(json));
        less.modifyVars(json);
        changeBodyBackground(json);
      }
    }, 1500)
  );

  const button = document.querySelector('button#reset');
  button.addEventListener('click', () => {
    localStorage.clear();
    const data = getData();
    editor.setValue(stringify(data));
  });

  // Set up split.js for resizable panes
  // https://github.com/nathancahill/Split.js
  Split(['#left', '#right'], {
    sizes: [30, 70]
  });

  less.pageLoadFinished.then(() => {
    editor.focus();
    editor.refresh();
  }, 100);
})();
