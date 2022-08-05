import React from 'react';
import ImageDelete from '../delete.svg';
import ImageEdit from '../edit.svg';
import imageDetail from '../detail.svg';
import ImageArchive from '../archive.svg';

export default function Card(props) {
  const { title = '', body = '', date = '', archived, id } = props;

  const buttonAction = (action) => {
    props.action({
      data: {
        id,
        title,
        body,
        date,
        archived
      },
      action
    });
  };

  return (
    <div className='col-lg-4 col-md-6 col-sm-12'>
      <div className='card mb-4'>
        <div
          className='card-header d-flex justify-content-between align-items-center'
          style={{ height: '75px' }}
        >
          <h5>{title}</h5>
          <div className='btn-delete' onClick={() => buttonAction('Delete')}>
            <img src={ImageDelete} style={{ width: '30px', height: '30px' }} />
          </div>
        </div>

        <div className='card-body'>
          <p style={{ fontWeight: 600, marginBottom: '15px' }}>{date}</p>

          <div className='description'>
            <p>{body.length > 100 ? body.slice(0, 100) + '...' : body}</p>
          </div>

          <div className='btn-action mb-4 d-flex justify-content-around'>
            <img
              src={imageDetail}
              style={{ width: '30px', height: '30px' }}
              alt='Detail'
              onClick={() => buttonAction('Detail')}
            />

            <img
              src={ImageEdit}
              style={{ width: '30px', height: '30px' }}
              alt='Edit'
              onClick={() => buttonAction('Edit')}
            />
            <img
              src={ImageArchive}
              style={{ width: '30px', height: '30px' }}
              alt='Edit'
              onClick={() => buttonAction('Archive')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
