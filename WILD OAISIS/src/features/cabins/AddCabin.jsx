import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable-v1";
import CreateCabinForm from "./CreateCabinForm";
import { useState } from "react";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="Cabin-form">
          <Button> Add new cabin </Button>
        </Modal.Open>
        <Modal.Window name="Cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((form) => !form)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           {" "}
//           <CreateCabinForm  onClose = {() => setIsOpenModal(false)}/>{" "}
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;

//import Modal from "ui/Modal";
// function AddCabin() {
// return (
// <Modal>
//   <Modal.Toggle opens='new-cabin'>
//     <Button>Add new cabin</Button>
//   </Modal.Toggle>
//   <Modal.Window name='new-cabin'>
//     <CreateCabinForm />
//   </Modal.Window>
// </Modal>
// );
// }
