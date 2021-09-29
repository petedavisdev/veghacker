import { createClient, Session } from "@supabase/supabase-js";
import { ref } from "vue";
import { Account } from "./types";

export const supabase = createClient(
	import.meta.env.VITE_APP_SUPABASE_URL as string,
	import.meta.env.VITE_APP_SUPABASE_KEY as string
);

export const userSession = ref<Session | null>(null);

export async function createProfile() {
	// TODO: Check if profile exists already

	const localVegLog = localStorage.getItem("vegLog");

	console.log(userSession.value.user.id);
	try {
		const { data, error } = await supabase
			.from("profiles")
			.insert([{ 
				user_id: userSession.value.user.id,
				veg_log: localVegLog
			}]);

		if (error) {
			console.error("error", error);
			return;
		}

		console.log(data);
	} catch (err) {
		alert("Error");
		console.error("Unknown problem inserting to db", err);
		return null;
	}
}

export async function fetchVeglog() {
	try {
		console.log(userSession);

		const { data: profiles, error } = await supabase
			.from("profiles")
			.select("veg_log")
			.eq("user_id", userSession.value.user.id);

		if (error) {
			console.error("error", error);
			return;
		}

		if (profiles === null) {
			console.warn("no profiles fo user");
			return;
		}

		return profiles[0].veg_log;
	} catch (err) {
		console.error("Error retrieving data from db", err);
		return;
	}
}
