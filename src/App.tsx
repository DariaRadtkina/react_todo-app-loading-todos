import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodo, setFilterTodo] = useState<string>('all');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  function getClientData() {
    setIsLoading(true);

    getTodos()
      .then(data => {
        setTodos(data);
        setErrorMessage('');
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(getClientData, []);

  const filteredByCompleted = todos.filter(todo => {
    if (filterTodo === 'active') {
      return !todo.completed;
    }

    if (filterTodo === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const countFilterNotCompleted = todos.filter(todo => !todo.completed).length;
  const countFilterCompleted = todos.filter(todo => todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header countItemsCompleted={countFilterNotCompleted} />
        {!isLoading ? (
          <TodoList todos={filteredByCompleted} />
        ) : (
          <div>Loading...</div>
        )}

        {todos.length > 0 && (
          <Footer
            countItemsCompleted={countFilterNotCompleted}
            countItemsNotCompleted={countFilterCompleted}
            setFilterTodo={setFilterTodo}
            filterTodo={filterTodo}
          />
        )}
      </div>
      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
