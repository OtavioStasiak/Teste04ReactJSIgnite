import { Component, createRef, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import {Input} from '../Input';

type Props = {
  isOpen: boolean;
  setIsOpen: () => void;
  setIsClosed: () => void;
  handleUpdateFood: (data: {image: string, name: string, price: number, description: string}) => void;
  editingFood: {image: string, name: string, price: number, description: string}
}

export function ModalEditFood({isOpen, setIsOpen, setIsClosed, handleUpdateFood, editingFood}: Props){
  const formRef = useRef(null);

  async function handleSubmit(data: {image: string, name: string, price: number, description: string}) {
    handleUpdateFood(data);
    setIsClosed();
  };

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
};

