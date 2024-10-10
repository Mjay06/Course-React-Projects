import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { createPortal } from "react-dom";
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useOutsideClick from "./useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
//create context
const ModalContext = createContext();

// create parent component
function Modal({ children }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <ModalContext.Provider value={{ setIsOpenModal, isOpenModal }}>
      {children}
    </ModalContext.Provider>
  );
}

//create children component for implementing certain tasks
function Open({ children, opens }) {
  const { setIsOpenModal } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => setIsOpenModal(opens),
  });
}

function Window({ children, name }) {
  const { setIsOpenModal, isOpenModal } = useContext(ModalContext);
  const ref = useOutsideClick(() => {
    setIsOpenModal(false);
  });

  if (isOpenModal !== name) return null;
  return (
    isOpenModal &&
    createPortal(
      <Overlay>
        <StyledModal ref={ref}>
          <Button>
            <HiXMark onClick={() => setIsOpenModal(false)} />
          </Button>
          <div>{children}</div>
        </StyledModal>
      </Overlay>,
      document.body
    )
  );
}

//rename to be a variable of parent component
Modal.Open = Open;
Modal.Window = Window;

// function Modal({ children, onClose }) {
//   return createPortal(
//     <Overlay>
//       <StyledModal>
//         <Button>
//           <HiXMark onClick={onClose} />
//         </Button>
//         <div>{children}</div>
//       </StyledModal>
//     </Overlay>,
//     document.body
//   );
// }

export default Modal;
