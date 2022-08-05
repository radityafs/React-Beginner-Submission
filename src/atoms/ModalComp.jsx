import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function ModalComp(props) {
  const { isShow, data } = props;

  const [dataModal, setDataModal] = useState({});

  useEffect(() => {
    if (data?.action === 'Add') {
      setDataModal({
        action: 'Add',
        data: {
          id: +new Date(),
          title: '',
          body: '',
          createdAt: new Date().toISOString(),
          archived: false
        }
      });
    } else {
      setDataModal(data);
    }
  }, [data]);

  /**
   * Remove data from state
   * when modal is closed
   */
  const clickClose = () => {
    props.onCloseModal();
    setDataModal({});
  };

  const clickSubmit = () => {
    props.onSubmitModal(dataModal);
    setDataModal({});
  };

  return (
    <Modal show={isShow} onHide={() => clickClose()}>
      <Modal.Header closeButton={() => clickClose()}>
        <Modal.Title>{dataModal?.action}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <input
          type='text'
          placeholder='Title'
          className='form-control mb-4'
          value={
            dataModal?.data?.title === undefined ? '' : dataModal?.data?.title
          }
          disabled={data?.action === 'Detail'}
          onChange={(e) => {
            setDataModal({
              ...dataModal,
              data: { ...dataModal?.data, title: e.target.value }
            });
          }}
        />
        <textarea
          rows='5'
          placeholder='Description'
          className='form-control'
          value={
            dataModal?.data?.body === undefined ? '' : dataModal?.data?.body
          }
          disabled={data?.action === 'Detail'}
          onChange={(e) => {
            setDataModal({
              ...dataModal,
              data: { ...dataModal.data, body: e.target.value }
            });
          }}
        />
      </Modal.Body>

      {data?.action !== 'Detail' ? (
        <Modal.Footer>
          <Button variant='secondary' onClick={() => clickClose()}>
            Close
          </Button>
          <Button variant='primary' onClick={() => clickSubmit(dataModal)}>
            Save Changes
          </Button>
        </Modal.Footer>
      ) : (
        ''
      )}
    </Modal>
  );
}
