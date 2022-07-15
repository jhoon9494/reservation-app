import styled from 'styled-components';

const Modal = (props) => {
  const { open, close } = props;

  return (
    <>
      <ModalBackground show={open} onClick={close} />
      {open ? <ModalContainer>{props.children}</ModalContainer> : null}
    </>
  );
};

export default Modal;

const ModalBackground = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99998;
`;

const ModalContainer = styled.section`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  padding: 24px;
  background-color: white;
  border-radius: 8px;
  z-index: 99999;
`;
