import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const compareAnecdotes = (first, second) => {
  return -1*(first.votes - second.votes);
};

export const getObject = (anecdote, filter) => {
  const visible = anecdote.content.includes(filter);
  return {
    ...anecdote,
    visible
  };
};

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    increment(state, action){
      const id = action.payload;
      const anecdote = state.find(anecdote => anecdote.id === id);
      anecdote.votes += 1;
      state.sort(compareAnecdotes);
    },
    sortFilter(state, action){
      const filter = action.payload;
      state.map(anecdote => {
        if(anecdote.content.includes(filter)){
          anecdote.visible = true;
        }else{
          anecdote.visible = false;
        }
        return anecdote;
      });
    },
    appendAnecdote(state, action){
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    sortAnecdotes(state, action){
      state.sort(compareAnecdotes);
    }
  },
});

export default anecdoteSlice.reducer;
export const { sortFilter, appendAnecdote, setAnecdotes, sortAnecdotes, increment } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    await anecdoteService
      .getAll()
      .then(anecdotes => {
        anecdotes.forEach(anecdote => {
          anecdote.visible = true;
          dispatch(appendAnecdote(anecdote));
        });
      });
    dispatch(sortAnecdotes());
  };
};

export const createAnecdote = (content,filter) => {
  return async (dispatch) => {
    const body = { content, votes: 0 }; //no id
    const NewAnecdote = await anecdoteService.createNew(body); //contains id
    dispatch(appendAnecdote(getObject(NewAnecdote, filter))); //getObject updates visibility
  };
};

export const like = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes;
    let anecdote = anecdotes.find((anecdote) => anecdote.id === id);
    anecdote = { ...anecdote, votes: anecdote.votes + 1 };
    delete anecdote.visible;
    await anecdoteService.update(anecdote);
    dispatch(increment(id));
  };
};