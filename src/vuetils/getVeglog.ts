import { supabase } from "../supabase";
import { Account } from "../types";

function getLocalVeglog() {
	const log =
		localStorage.getItem("veglog") ||
		localStorage.getItem("log") || // TODO: temp fix for name change - remove after alpha
		"";

	const timestamp = localStorage.getItem("veglog_updated_at");
	return { log, timestamp };
}

async function fetchVeglog() {
	try {
		const { data: accounts, error } = await supabase
			.from("accounts")
			.select("veglog,veglog_updated_at");

		if (error) {
			console.error("error", error);
			return { log: "" };
		}

		if (accounts === null) {
			console.warn("no accounts fo user");
			return { log: "" };
		}

		const account: Account = accounts[0];

		return { log: account.veglog, timestamp: account.veglog_updated_at };
	} catch (err) {
		console.error("Error retrieving data from db", err);
	}
}

async function getVeglog() {
	const dbVeglog = await fetchVeglog();
	const localVeglog = getLocalVeglog();
	const latestLog =
		dbVeglog.timestamp > localVeglog.timestamp ? dbVeglog.log : localVeglog.log;

	return JSON.parse(latestLog);
}

export { getVeglog };
