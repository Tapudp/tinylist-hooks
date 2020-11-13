import React, { useState } from 'react';

const ListItem = ({
  item,
  idx,
  completeTask,
  removeTask,
  isDesktopScreen,
  editTask,
}) => {
  const [hvd, setHvd] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currEdit, setCurrEdit] = useState(item.description);

  const modifyItem = ({ target }) => {
    setCurrEdit((p) => target.value);
  };

  const submitModified = () => {
    editTask(currEdit, item);
    setEditing(false);
  };

  return (
    <li
      key={`item-${idx}`}
      className='list-item'
      onMouseEnter={() => setHvd(true)}
      onMouseLeave={() => setHvd(false)}
    >
      <input
        className='input-checkbox'
        type='checkbox'
        checked={item.completed_at !== null}
        onChange={() => completeTask(item.completed_at, item.id)}
      />
      <p
        className={
          item.completed_at !== null ? `finished-task` : `not-finished`
        }
        onClick={() => item.completed_at === null && setEditing(true)}
      >
        <>
          {!editing ? (
            item.description
          ) : (
            <input
              type='text'
              value={currEdit}
              onChange={modifyItem}
              onKeyDown={(e) => e.key === 'Enter' && submitModified()}
            />
          )}
        </>
      </p>
      <b>
        <i onClick={() => removeTask(item.id)}>
          {(isDesktopScreen ? hvd : true) && <img src='/images/Vector.png' />}
        </i>
      </b>
    </li>
  );
};

export default ListItem;
