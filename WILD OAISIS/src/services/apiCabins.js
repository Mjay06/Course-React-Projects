import supabase, { supabaseUrl } from "./supabase";

export default async function getCabins() {
  const { data: Cabin, error } = await supabase.from("Cabin").select("*");

  if (error) {
    console.error("cabin no fit load");
    throw new Error("cabins no fit load");
  }

  return Cabin;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("Cabin").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("cabin could not be deleted");
  }
}

export async function createCabin(newCabin, id=undefined) {
  console.log(newCabin)
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  console.log(newCabin.image)
  const hasThis = typeof newCabin.image === 'string';
  const imagePath = hasThis
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;
  //https://jhotqrhqrooyrjwjyuaj.supabase.co/storage/v1/object/sign/cabins/cabin-001.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbnMvY2FiaW4tMDAxLmpwZyIsImlhdCI6MTY5NTkyODg4NiwiZXhwIjoxNzI3NDY0ODg2fQ.bpBIGFV63e5NU_J9jRE_ytuRhNO-3xsJlsfxWUdgITk&t=2023-09-28T19%3A21%3A26.797Z
  //https://jhotqrhqrooyrjwjyuaj.supabase.co/storage/v1/object/public/cabins/0.09677552284425639-cabin-002.jpg?t=2023-09-28T20%3A43%3A02.591Z
  //https://jhotqrhqrooyrjwjyuaj.supabase.co/storage/v1/object/sign/cabins/0.6296118995438951-cabin-002.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbnMvMC42Mjk2MTE4OTk1NDM4OTUxLWNhYmluLTAwMi5qcGciLCJpYXQiOjE2OTU5MzM0MjIsImV4cCI6MTcyNzQ2OTQyMn0.WXJTbnyOlAG_GLYGJDXypDO5psf9JGarvPKwfcowDRg&t=2023-09-28T20%3A37%3A02.339Z

  const query = supabase.from("Cabin");

  if (id) {
    const { data, error } = await supabase
      .from("Cabin")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
    if (error) {
      console.log(error);
      throw new Error("cabin could not be editted");
    }
  }

  if (!id) {
    //1. Create Cabin
    const { data, error } = await query
      .insert([{ ...newCabin, image: imagePath }])
      .select();

    if (error) {
      console.log(error);
      throw new Error("cabin could not be created");
    }
  }
  //upload to bucket

  if (!hasThis) {
    const { error: storageError } = await supabase.storage
      .from("cabins")
      .upload(imageName, newCabin.image);
    if (storageError) {
      const { data, error } = await supabase
        .from("Cabin")
        .delete()
        .eq("id", newCabin.id);
      throw new Error("We no fit upload your image o");
    }
  }
}
