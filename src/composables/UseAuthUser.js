import { ref } from "vue";
import useSupabase from "src/boot/supabase";

export default function useAuthUser() {
  const { supabase } = useSupabase();
  const user = ref(null);

  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) throw error;
    return user;
  };

  const loginWithSocialProvider = async (provider) => {
    const { user, error } = await supabase.auth.signIn({ provider });
    if (error) throw error;
    return user;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const isLoggedIn = async () => {
    return !!user.value;
  };

  const register = async ({ email, password, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      { email, password },
      {
        data: meta,
        redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`,
      }
    );
    if (error) throw error;
    return user;
  };

  const upadteUser = async (data) => {
    const { user, error } = await supabase.auth.update(data);
    if (error) throw error;
    return user;
  };

  const resetPassword = async (accessToken, password) => {
    const { user, error } = await supabase.auth.api.updateUser(accessToken, {
      password,
    });
    if (error) throw error;
    return user;
  };

  const sendPasswordResetEmail = async (email) => {
    const { user, error } = await supabase.auth.api.resetPasswordForEmail(
      email
    );
    if (error) throw error;
    return user;
  };

  return {
    user,
    login,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    upadteUser,
    resetPassword,
    sendPasswordResetEmail,
  };
}
