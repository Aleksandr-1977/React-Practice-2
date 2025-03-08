import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [fotos, setFotos] = useState('');
  const handleChange = evt => {
    setFotos(evt.target.value);
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    if (!fotos.trim()) {
      return alert('Empty');
    }
    onSubmit(fotos);
    setFotos('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="search" value={fotos} onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );
};

export default Form;
