import { Component, createRef, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormProps } from '@unform/core';
import { Form } from './styles';
import { Modal } from '../Modal';
import {Input} from '../Input';


type Props = {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (data: {image: string, name: string, price: number, description: string}) => void;
}

export function ModalAddFood({isOpen, setIsOpen, handleAddFood}: Props){
  const formRef = useRef(null);


  async function handleSubmit(data: {image: string, name: string, price: number, description: string}) {
    handleAddFood(data);
    setIsOpen();
  };

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={(data) => handleSubmit(data)}>
          <h1>Novo Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />
          <button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
}

