import * as Yup from 'yup';

export const favoriteProductSchema = Yup.object().shape({
  id: Yup.string().required(),
  title: Yup.string().required(),
  price: Yup.number().required(),
  thumbnail: Yup.string().required(),
});
