import React from 'react';

type Props = {
  countItemsCompleted: number;
  countItemsNotCompleted: number;
  setFilterTodo: (arg: string) => void;
  filterTodo: string;
};

export const Footer: React.FC<Props> = ({
  countItemsCompleted,
  countItemsNotCompleted,
  setFilterTodo,
  filterTodo,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countItemsCompleted} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filterTodo === 'all' && 'selected'}`}
          data-cy="FilterLinkAll"
          onClick={() => setFilterTodo('all')}
        >
          All
        </a>

        <a
          href="#/active"
          onClick={() => setFilterTodo('active')}
          className={`filter__link ${filterTodo === 'active' && 'selected'}`}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filterTodo === 'completed' && 'selected'}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterTodo('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={countItemsNotCompleted === 0}
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
