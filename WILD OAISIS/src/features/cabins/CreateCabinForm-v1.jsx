import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";


function CreateCabinForm() {
  const { register, handleSubmit, reset, formState, getValues } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries();
      reset();
      toast("Cabin created successfully");
    },
    onError: (err) => {
      toast(err.message);
    },
  });

  function onClick(data) {
    mutate({...data, image: data.image[0]});
  }
  function onError(error){
    console.log(error)
  }
  return (
    <Form onSubmit={handleSubmit(onClick, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message} >
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
        
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register("maxCapacity",{
          required: "This field is required",
          min:{
            value: 1,
            message: "Capacity should be at least 1"
          }
        })} />
      </FormRow>

      <FormRow label="Regular price">
        <Input type="number" id="regularPrice" {...register("regularPrice", {
          required: "This field is required"
        })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value)=>{
              return value <= getValues("regularPrice") || "Discount more than price"
            }
            
          })}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" {...register("image",{
          required: "This field is required"
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button type="reset">Cancel</Button>
        <Button disabled={isLoading}>New Cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
