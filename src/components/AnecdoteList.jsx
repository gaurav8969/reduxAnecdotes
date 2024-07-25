import { useSelector, useDispatch } from 'react-redux';
import { like } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(like(anecdote.id));
    dispatch(notify(`"${anecdote.content}" has been voted up!`));
  };

  return (
    <>
      {
        anecdotes.map(anecdote => {
          if(anecdote.visible){
            return(
              <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote)}>vote</button>
                </div>
              </div>
            );
          }
        })}
    </>
  );
};

export default AnecdoteList;