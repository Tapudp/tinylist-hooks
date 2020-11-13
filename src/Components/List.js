import React, { useRef, useState } from 'react';
import ListItem from './ListItem';

const List = ({
  listType,
  tlist,
  completeTask,
  removeTask,
  isDesktopScreen,
  editTask,
}) => {
  const nonFinishedList =
    Array.isArray(tlist) &&
    tlist
      .filter((item) => item.completed_at === null)
      .sort((a, b) => b.created_at - a.created_at);
  const finishedList =
    Array.isArray(tlist) &&
    tlist
      .filter((item) => item.completed_at !== null)
      .sort((a, b) => {
        return b.completed_at / 1000 - a.completed_at / 1000;
      });

  return (
    <>
      <div className='actual-list'>
        {[nonFinishedList, finishedList].map((arr) =>
          arr.map((it, idx) => (
            <ListItem
              key={`todo-${idx}`}
              item={it}
              idx={idx}
              completeTask={completeTask}
              removeTask={removeTask}
              isDesktopScreen={isDesktopScreen}
              editTask={editTask}
            />
          ))
        )}
      </div>
    </>
  );
};

export default List;
