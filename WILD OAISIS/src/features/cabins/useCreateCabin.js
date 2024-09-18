import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: create } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['cabin']});
      toast("Cabin created successfully");
    },
    onError: (err) => {
      toast(err.message);
    },
  });

  return { isCreating, create };
}
