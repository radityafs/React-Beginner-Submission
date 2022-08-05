import { useEffect } from 'react';
import Card from '../atoms/Card';
import NotFound from '../atoms/NotFound';

export default function Content(props) {
  const { data, action } = props;

  return (
    <div className='todo-list row'>
      {data?.length === 0 && <NotFound />}

      {data?.length > 0 &&
        data.map((item, index) => {
          return (
            <Card
              key={index}
              id={item.id}
              title={item.title}
              body={item.body}
              date={item.createdAt}
              archived={item.archived}
              action={action}
            />
          );
        })}
    </div>
  );
}
