import React from 'react';

type Props = {
  countItemsCompleted: number;
};

export const Header: React.FC<Props> = ({ countItemsCompleted }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={`todoapp__toggle-all ${countItemsCompleted === 0 && 'active'}`}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
