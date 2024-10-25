// src/App.js
import React from 'react';
import DragAndDropOrderList from './DragAndDropOrderList';

function App() {
  const items = ['First Item', 'Second Item', 'Third Item', 'Fourth Item'];

  return (
    <div className="App">
      <center><h1>Drag and Drop List</h1></center>
      <DragAndDropOrderList items={items} />
    </div>
  );
}

export default App;
