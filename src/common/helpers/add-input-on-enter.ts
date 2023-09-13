export const AddInputOnEnterEvent = (
  event: React.KeyboardEvent<HTMLDivElement>,
  append: () => void
) => {
  if (event.key === "Enter") {
    append();
  }
};
