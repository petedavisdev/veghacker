import { Session } from "@supabase/supabase-js";
import { ref } from "vue";

export const userSession = ref<Session | null>(null)