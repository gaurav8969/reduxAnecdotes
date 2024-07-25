import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import NewAnecdote from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import FilterForm from './components/FilterForm';
import Notification from './components/Notification';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <FilterForm />
      <Notification />
      <AnecdoteList />
      <NewAnecdote />
    </div>
  );
};

export default App;