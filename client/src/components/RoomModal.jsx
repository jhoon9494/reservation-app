import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const RoomModal = (props) => {
  const { roomdata, reserve, ...rest } = props;
  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div>{roomdata}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={reserve}>예약하기</Button>
      </Modal.Footer>
    </Modal>
  );
};
