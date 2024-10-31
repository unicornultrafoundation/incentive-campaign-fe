import { FieldErrors } from 'react-hook-form';

interface Props {
  errors: FieldErrors<any>;
}

export default function FormValidationMessages({ errors }: Props) {
  if (!errors || !Object.entries(errors).length) {
    return null;
  }

  return (
    <div className="w-full flex gap-4 my-4 px-6 py-4 rounded-2xl bg-surface-soft/50 border border-error">
      <div className="flex flex-col gap-1">
        {Object.entries(errors).map(([key, error]) => (
          <text
            key={key}
            className="font-semibold text-error italic text-body-12"
          >
            {error?.message as string}
          </text>
        ))}
      </div>
    </div>
  );
}
