import * as Yup from 'yup';

export const cartPostSchema = Yup.object().shape({
  cart: Yup.object().shape({
    id: Yup.string().required(),
    title: Yup.string().required(),
    price: Yup.number().required(),
    quantity: Yup.number().required(),
    thumbnail: Yup.string().required(),
  }),
});


export const cartPutSchema = Yup.object().shape({
  quantity: Yup.number().required(),
});
