import { useSelector, useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';

const NewAnecdote = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(content, filter));
    dispatch(notify(`new anecdote "${content}"`));
  };

  return(
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote} autoComplete='off'>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default NewAnecdote;