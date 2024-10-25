// src/DragAndDropOrderList.js
import React, { useState, useEffect } from 'react';

const DragAndDropOrderList = ({ items }) => {
  const [list, setList] = useState(items);
  const [colors, setColors] = useState({});

  useEffect(() => {
    // Assign a random color to each item based on its initial index
    const initialColors = items.reduce((acc, _, index) => {
      acc[index] = `hsl(${Math.random() * 360}, 70%, 80%)`; // Random pastel color
      return acc;
    }, {});
    setColors(initialColors);
  }, [items]);

  const onDragStart = (e, index) => e.dataTransfer.setData('dragIndex', index);
  const onDragOver = (e) => e.preventDefault();

  const onDrop = (e, dropIndex) => {
    const dragIndex = e.dataTransfer.getData('dragIndex');
    const updatedList = [...list];
    const [draggedItem] = updatedList.splice(dragIndex, 1);
    updatedList.splice(dropIndex, 0, draggedItem);
    setList(updatedList);
  };

  return (
    <ul style={{ padding: 0, margin: '0 auto', width: '50%' }}>
      {list.map((item, index) => (
        <li
          key={index}
          draggable
          onDragStart={(e) => onDragStart(e, index)}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, index)}
          style={{
            width: '100%',          // 50% of screen width as it's in a container
            padding: '10px',
            margin: '5px 0',
            border: '1px solid #ccc',
            cursor: 'grab',
            listStyleType: 'none',
            backgroundColor: colors[items.indexOf(item)], // Keep original color
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default DragAndDropOrderList;
