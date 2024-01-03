// AgentModal.tsx
import React, { useEffect, useState } from 'react';
import { Agent } from './Agent';
import classNames from 'classnames';
import { Modal } from '@chakra-ui/react';
import StatementForm from './StatementForm';


interface AgentModalProps {
  agent: Agent;
  closeModal: () => void;
}

const AgentModal: React.FC<AgentModalProps> = ({ agent, closeModal }) => {
  const [showAddStatement, setShowAddStatement] = useState<boolean>(false);

  useEffect(() => {
    const modal = document.getElementById('my_modal_4') as HTMLDialogElement;
    modal.showModal();
    modal.style.height = '100vh';
    modal.style.width = '100%';
  }, []);

  const handleAddStatementClick = () => {
    setShowAddStatement(true);
  };

  return (
    <dialog id="my_modal_4" className="modal px-10 mt-10">
      <div className="modal-box w-full h-full max-w-5xl">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-white rounded bg-slate-400 hover:bg-red-600 px-3 py-1"
        >
          Close
        </button>
        <div className="modal-content h-full overflow-auto">
          <button
            type="button"
            onClick={handleAddStatementClick}
            className="absolute top-2 left-2 px-4 py-2  bg-slate-400 hover:bg-blue-500  text-white rounded"
          >
            AddStatement
          </button>
          {showAddStatement && (
            <StatementForm closeModal={() => setShowAddStatement(false)} />
          )}
        </div>
      </div>
    </dialog>
  );
};

export default AgentModal;
