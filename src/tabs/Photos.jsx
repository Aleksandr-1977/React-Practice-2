import { useEffect, useState } from 'react';
import Text from '../components/Text/Text';
import Form from '../components/Form/Form';
import Loader from '../components/Loader/Loader';
import PhotosGallery from '../components/PhotosGallery/PhotosGallery';
import { getPhotos } from '../apiService/photos';

const Photos = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!query) return;
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const { photos, per_page, total_result } = await getPhotos(query, page);
        if (!photos.length) {
          setIsEmpty(true);
          return;
        }
        setImage(prevImage => [...prevImage, ...photos]);
        setIsVisible(page < Math.cell(total_result / per_page));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhotos();
  }, [page, query]);

  const getQuery = inputValue => {
    setQuery(inputValue);
  };
  return (
    <>
      <Form onSubmit={getQuery} />
      {isLoading && <Loader />}
      {error && <Text>Ooops</Text>}
      {!error && !isEmpty && <Text>Lets begin</Text>}
      {isEmpty && <Text>Sorry</Text>}
      {image.length > 0 && <PhotosGallery image={image} />}
      <Text textAlign="center">Let`s begin search 🔎</Text>
    </>
  );
};

export default Photos;
