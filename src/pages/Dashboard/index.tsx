import { Component, useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

type FoodData = {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
};

type foodEdited = {
  name: string;
  description: string;
  price: number;
  image: string;
}

export function Dashboard(){
  const [foods, setFoods] = useState<FoodData []>([]);

  async function fetchFoods() {
    const response = await api.get('/foods');

    setFoods(response.data);
  };

  useEffect(() => {fetchFoods()}, []);

  async function handleAddFood(food: foodEdited) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: foodEdited) {

    try {
      const foodUpdated = await api.put(
        `/foods/${idEditing}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(food =>
        food.id !== foodUpdated.data.id ? food : foodUpdated.data,
      );
      
      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number) {

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  const [modalOpen, setModalOpen] = useState(false);

  function toggleModal() {
    setModalOpen(true);
  };

  const [editModalOpen, setEditModalOpen] = useState(false);

  function toggleEditModal() {
    setEditModalOpen(true);
  }
  const [editingFood, setEditingFood] = useState<foodEdited>({} as foodEdited);
  const [idEditing, setIdEditing] = useState(0);
  function handleEditFood(food: FoodData) {
    setEditModalOpen(true);
    setEditingFood({name: food.name, price: Number(food.price), description: food.description, image: food.image});
    setIdEditing(food.id);
  };

    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          setIsClosed={() => setModalOpen(false)}
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={(data) => handleAddFood(data)}
        />
        
        <ModalEditFood
          setIsClosed={() => setEditModalOpen(false)}
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={(food) =>handleEditFood(food)}
              />
            ))}
        </FoodsContainer>
      </>
    );
};

