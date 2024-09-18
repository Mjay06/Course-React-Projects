import { useNavigate, useRouteError } from 'react-router-dom';
import Linkbutton from './Linkbutton';

function Error() {
  const navigate = useNavigate();
  const wrong = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{wrong.data || wrong.message}</p>
      <p>%MESSAGE%</p>
      <Linkbutton to='-1'>&larr; Go back</Linkbutton>
      
    </div>
  );
}

export default Error;
