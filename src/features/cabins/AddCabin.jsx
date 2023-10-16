import { useState } from "react";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabin() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen((show) => !show)}>
        Add new cabin
      </Button>

      {isModalOpen && (
        <Modal handleClose={() => setIsModalOpen(false)}>
          <CreateCabinForm handleCloseModal={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
}
