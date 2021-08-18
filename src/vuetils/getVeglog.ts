import { supabase } from "../supabase";
import { Account } from "../types";
import { userSession } from "./useAuth";

function getLocalVeglog() {
	const log = localStorage.getItem("veglog")
	const timestamp = localStorage.getItem("veglog_updated_at")

	return { log, timestamp }
}

async function fetchVeglog() {
	try {
		const { data: accounts, error } = await supabase
			.from("accounts")
			.select("veglog,veglog_updated_at");

		if (error) {
			console.error("error", error)
			return
		}

		if (accounts === null) {
			console.warn("no accounts fo user")
			return
		}

		const account: Account = accounts[0]

		return {
			log: account.veglog,
			timestamp: account.veglog_updated_at
		};
	} catch (err) {
		console.error("Error retrieving data from db", err)
		return
	}
}

async function getVeglog() {
	const localVeglog = getLocalVeglog()

	if (!localVeglog.log && !userSession.value) return

	if (!userSession.value) return JSON.parse(localVeglog.log)

	const dbVeglog = await fetchVeglog()

	// merge logs with newer values overwriting older
	return dbVeglog.timestamp > localVeglog.timestamp
		? { ...JSON.parse(localVeglog.log), ...JSON.parse(dbVeglog.log) }
		: { ...JSON.parse(dbVeglog.log), ...JSON.parse(localVeglog.log) }
}

export { getVeglog };
