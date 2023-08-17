import React, {useState} from 'react';
import './Check.css';
import styles from './CheckNotebookStyle.js';


let dataTask = localStorage.getItem('tasks');

if(dataTask === null) {
  localStorage.setItem('tasks', JSON.stringify([]));
}

let str = localStorage.getItem('tasks');
const arr = JSON.parse(str);

function Check() {
  const [inpValue, setInpValue] = useState('');
  const [items, setItem] = useState(arr);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingText, setEditingText] = useState('');

  function handleAddTask() {
    if (inpValue !== '') {
      let copy = [...items, { text: inpValue[0].toLocaleUpperCase() + inpValue.slice(1), checked: false }];
      localStorage.setItem('tasks', JSON.stringify(copy));
      setItem(copy);
    }
    setInpValue('');
  }

  function handleDeleteTask(index) {
    let copy = [...items];
    copy.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(copy));
    setItem(copy);
    if (editingIndex === index) {
      setEditingIndex(-1);
      setEditingText('');
    }
  }

  function handleChecked(index) {
    let copy = [...items];
    copy[index].checked = !copy[index].checked;
    localStorage.setItem('tasks', JSON.stringify(copy));
    setItem(copy);
  }

  function handleEditTask(index, text) {
    setEditingIndex(index);
    setEditingText(text);
  }

  function handleSaveTask(index, newText) {
    let copy = [...items];
    copy[index].text = newText[0].toLocaleUpperCase() + newText.slice(1);
    localStorage.setItem('tasks', JSON.stringify(copy));
    setItem(copy);
    setEditingIndex(-1);
    setEditingText('');
  }

  function keyDownEnter(event) {
    if(event.key === 'Enter') {
      handleAddTask();
    }
  }

  const task = items.map((item, index) => {
    if (index === editingIndex) {
      return (
        <li style={styles.Li} key={index}>
          <input style={styles.Input}
            type="text"
            value={editingText}
            onChange={(event) => setEditingText(event.target.value)}
          />
          <button style={styles.Btn} onClick={() => handleSaveTask(index, editingText)}>Save</button>
        </li>
      );
    } else {
      return (
        <li style={styles.Li} key={index}>
          <input type="checkbox" 
                onChange={() => handleChecked(index)} 
                checked={item.checked} />
          <span style={styles.Span} className={item.checked ? 'done' : ''}>{item.text}</span>
          <button style={styles.Button} onClick={() => handleEditTask(index, item.text)}>Edit</button>
          <button style={styles.Button} onClick={() => handleDeleteTask(index)}>Delete</button>
        </li>
      );
    }
  });

  return (
    <div>
      <h1 style={styles.H1}>Cписок задач</h1>
      <div style={styles.List}>
        <input style={styles.Input} value={inpValue} 
              placeholder='Ведите текст задачи ..'
              onChange={(event) => setInpValue(event.target.value)} 
              onKeyDown={(event) => keyDownEnter(event)} />
        <button onClick={handleAddTask}>Add</button>
        <div>{task}</div>
      </div>
    </div>
  );
}

export default Check;
