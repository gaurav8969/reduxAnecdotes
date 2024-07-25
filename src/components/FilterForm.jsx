import { useDispatch } from 'react-redux';
import { createFilter } from '../reducers/filterReducer';
import { sortFilter } from '../reducers/anecdoteReducer';

const FilterForm = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(createFilter(event.target.value));
    dispatch(sortFilter(event.target.value));
  };

  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default FilterForm;