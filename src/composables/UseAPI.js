import useSupabase from "src/boot/supabase";
import useAuthUser from "./useAuthUser";

export default function useAPI() {
  const supabase = useSupabase();
  const { user } = useAuthUser();

  const get = async (table) => {
    const { data, error } = await supabase.from(table).select("*");
    if (error) throw error;
    return data;
  };

  const getByID = async (table, id) => {
    const { data, error } = await supabase.from(table).select("*").eq("id", id);
    if (error) throw error;
    return data[0];
  };

  const post = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .insert({ ...form, user_id: user.value.id });
    if (error) throw error;
    return data;
  };

  const update = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .update({ ...form })
      .match({ id: form.id });
    if (error) throw error;
    return data;
  };

  const remove = async (table, id) => {
    const { data, error } = await supabase.from(table).delete().match({ id });
    if (error) throw error;
    return data;
  };

  return {
    get,
    getByID,
    post,
    update,
    remove,
  };
}
