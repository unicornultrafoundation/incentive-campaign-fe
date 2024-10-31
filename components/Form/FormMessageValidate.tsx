import { ErrorMessage } from '@hookform/error-message';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface FormMessageValidateProps<T> {
  mainForm: UseFormReturn<T extends FieldValues ? T : FieldValues>;
  fieldName: Path<T extends FieldValues ? T : FieldValues>;
}

const FormMessageValidate = <T extends FieldValues>(
  props: FormMessageValidateProps<T>,
) => {
  const { mainForm, fieldName } = props;

  const {
    formState: { errors },
  } = mainForm;

  return (
    <ErrorMessage
      errors={errors}
      name={fieldName as any}
      render={({ message }) => (
        <p className="text-red-500 text-sm italic">{message}</p>
      )}
    />
  );
};

export default FormMessageValidate;
