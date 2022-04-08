import { FormControl,  Input, InputLabel } from "@material-ui/core";

export default function InputText({
  labeltext
}) {

  return (
    <>
      <FormControl>
        <InputLabel htmlFor="my-input">{labeltext}</InputLabel>
      </FormControl>
    </>
  );
}
