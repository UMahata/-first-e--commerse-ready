
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  incrementAsync,
  selectCount,
} from './UserSlice';

export default function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
 

  return (
    <div>
    
    </div>
  );
}
