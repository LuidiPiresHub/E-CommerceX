import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  id: Yup.string().required(),
  title: Yup.string().required(),
  price: Yup.number().positive().required(),
  thumbnail: Yup.string().required(),
  quantity: Yup.number().positive().required(),
});

