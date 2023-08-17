import React, {useState} from 'react';
import  styles from './CheckNotebookStyle.js';
import styled from 'styled-components';

const Container = styled.div`
    width: 43%;
    display: flex;
    justify-content: space-around;
    margin: 10px auto;
    padding: 10px;
    background-color: #d4cfcf3b;
    border-radius: 5px;
    box-shadow: 5px 5px 20px;
`;

const Button = styled.button`
margin-left: 10px;
color: ${props => props.color ? 'black' : 'red'};
`;

let dataNotes = localStorage.getItem('notes');

if(dataNotes === null) {
    localStorage.setItem('notes', JSON.stringify([]));
  }

  let strNotes = localStorage.getItem('notes');
const arr = JSON.parse(strNotes);

function Notebook() {
    const [notes, setNotes] = useState(arr);
    const [areaValue, setAreaVelue] = useState('');
    const [inpValue, setInpValue] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);

    function handleAddNote() {
        if(areaValue.trim() !== '') {
            let copy = [...notes];
            copy.push(areaValue);
            localStorage.setItem('notes', JSON.stringify(copy));
            setNotes(copy);
            setAreaVelue('');
        }
    }

    function handleEditNote(index) {
        setEditingIndex(index);
        setAreaVelue(notes[index]);
    }

    function handleSaveEditNote(index) {
        let copy = [...notes];
        copy.splice(index, 1, areaValue);
        localStorage.setItem('notes', JSON.stringify(copy));
        setNotes(copy);
        setAreaVelue('');
        setEditingIndex(null);
    }

    function handleDelNote(index) {
        let copy = [...notes];
        copy.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(copy));
        setNotes(copy);
    }

    const block = notes.map((note, index) => {
        if (note.toLowerCase().includes(inpValue.toLowerCase())) {
            return (
                <p key={index}>
                    <button style={styles.Button} onClick={() => handleDelNote(index)}>X</button>
                    <span onClick={() => handleEditNote(index)}>Note {index+1}</span>
                </p>
            );
        } else {
            return null;
        }
    });
    
    return <div>
        <h1 style={styles.Title}>Блокнот</h1>
        <Container >
            <div style={styles.Notes}>
                {block}
            </div>
            <div>
                <div>
                <input style={styles.Input} placeholder='search...' onChange={event => setInpValue(event.target.value)} />
                </div>
                <div>
                <textarea style={styles.Textarea} placeholder='Enter note...' value={areaValue} 
                        onChange={event => setAreaVelue(event.target.value)}/>
                </div>
                {editingIndex === null ? 
                <button style={styles.Btn} onClick={handleAddNote}>Add</button> : <Button color onClick={() => handleSaveEditNote(editingIndex)}>Save</Button>}
            </div>
        </Container>
    </div>
}

export default Notebook;
