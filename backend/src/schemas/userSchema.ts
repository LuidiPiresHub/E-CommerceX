import * as Yup from 'yup';

export const userRegisterSchema = Yup.object().shape({
  userData: Yup.object().shape({
    username: Yup.string().min(3).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(3).required(),
  }),
});

export const userLoginSchema = Yup.object().shape({
  userData: Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(3).required(),
  })
});

export const userUpdateSchema = Yup.object().shape({
  username: Yup.string().min(3).required(),
  phoneNumber: Yup.string().min(11).max(12).notRequired(),
  gender: Yup.string().notRequired(),
  birthdate: Yup.date().notRequired(),
});
