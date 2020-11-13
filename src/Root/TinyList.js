import React, { useEffect, useRef, useState } from 'react';
import List from '../Components/List';

const TinyList = ({}) => {
  const [curr, setCurr] = useState('');
  const [tlist, setTList] = useState([]);
  const todoRef = useRef(null);

  const hasWindow = typeof window !== 'undefined';

  const getWindowDimensions = () => {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const handleChange = () => {
    setCurr((p) => todoRef.current.value);
  };

  const submitTodo = () => {
    const newTodoItem = {
      id: parseInt(Math.random() * 1000000),
      description: curr,
      completed_at: null,
      hovered: false,
      created_at: new Date() / 1000,
    };

    setTList((p) => [...p, newTodoItem]);
    setCurr((p) => '');
    todoRef.current.value = '';
  };

  const editTask = (value, item) => {
    const elementsIndex = tlist.findIndex((e) => e.id === item.id);
    let newArray = [...tlist];
    newArray.splice(elementsIndex, 1, { ...item, description: value });
    setTList((p) => newArray);
  };

  const completeTask = (alreadyChecked, id) => {
    const elementsIndex = tlist.findIndex((e) => e.id === id);
    let newArray = [...tlist];
    if (!alreadyChecked) {
      newArray[elementsIndex] = {
        ...newArray[elementsIndex],
        completed_at: new Date(),
      };
    } else {
      newArray[elementsIndex] = {
        ...newArray[elementsIndex],
        completed_at: null,
      };
    }
    setTList(newArray);
  };

  const removeTask = (id) => {
    setTList((p) => p.filter((it) => it.id !== id));
  };

  return (
    <div className='tiny-list'>
      <div class='md-form form-sm'>
        <input
          id='form8'
          className='form-control input-label'
          type='text'
          placeholder='+ Add to list...'
          ref={todoRef}
          onChange={handleChange}
          onKeyDown={(e) =>
            e.key === 'Enter' && curr.length > 0 && submitTodo()
          }
        />
        {/* <button onClick={(e) => submitTodo(e.key)}>Submit</button> */}
      </div>
      <List
        listType='upcoming'
        tlist={tlist}
        completeTask={completeTask}
        removeTask={removeTask}
        isDesktopScreen={windowDimensions.width > 768}
        editTask={editTask}
      />
    </div>
  );
};

export default TinyList;
