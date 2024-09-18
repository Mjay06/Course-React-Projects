import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin(){
    const queryClient = useQueryClient();
    const { isLoading: isEditing, mutate: edit } = useMutation({
        mutationFn: ({ id, newCabin }) => createCabin(newCabin,id),
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['cabin']});
          toast("Cabin editted sucessfully");
        },
        onError: (err) => {
          toast(err.message);
        },
      });

      return {isEditing, edit}
}