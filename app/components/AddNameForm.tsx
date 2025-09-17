export type AddNameFormProps = {
  input: string;
  onInputChange: (value: string) => void;
  onAdd: () => void;
};

export const AddNameForm = ({
  input,
  onInputChange,
  onAdd,
}: AddNameFormProps) => (
  <div className="flex gap-2 w-full max-w-xs">
    <input
      data-testid="name-input"
      className="border px-2 py-1 rounded flex-1"
      value={input}
      placeholder="Ajouter un nom"
      onChange={(e) => onInputChange(e.target.value)}
      type="text"
      autoComplete="off"
    />
    <button
      data-testid="add-name-button"
      className="bg-blue-500 text-white px-3 py-1 rounded"
      onClick={onAdd}
      type="button"
    >
      Ajouter
    </button>
  </div>
);
