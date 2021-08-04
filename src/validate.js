import * as yup from 'yup';

const schema = yup.object().shape({
  url: yup.string().url(),
});

export default (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return true;
  } catch (e) {
    return false;
  }
};
