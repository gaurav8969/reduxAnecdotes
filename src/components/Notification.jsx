import { useSelector, useDispatch } from 'react-redux';

const Notification = () => {
  const message = useSelector(state => state.notifications);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: 'red'
  };
  if(!message)return;
  return (
    <div style={style}>
      {message}
    </div>
  );
};

export default Notification;