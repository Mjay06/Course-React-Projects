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
import { supabaseUrl } from "../../services/supabase";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabintoEdit = {}, onClose }) {
  console.log(onClose);
  const { id: editId, ...editValues } = cabintoEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;
  const { isCreating, create } = useCreateCabin();
  const { isEditing, edit } = useEditCabin();
  const working = isEditing || isCreating;

  function onClick(data) {
    const hasImage = typeof data.image === "string";
    const DataUploaded = hasImage
      ? { ...data }
      : { ...data, image: data.image[0] };
    console.log(data);
    const parameters = { newCabin: DataUploaded, id: editId };
    if (isEditSession) {
      console.log("na me de run");
      edit(parameters);
    } else {
      console.log(data.image);
      create(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
    }
  }
  function onError(error) {
    console.log(error);
  }
  return (
    <Form
      onSubmit={handleSubmit(onClick, onError)}
      type={onClose ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={working}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={working}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price">
        <Input
          type="number"
          id="regularPrice"
          disabled={working}
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={working}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              return (
                value <= +getValues("regularPrice") ||
                "Discount more than price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={working}>
          {isEditSession ? "Edit Cabin" : "Create New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
