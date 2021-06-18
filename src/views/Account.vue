<template>
    <div v-if="userSession === null">
        <Auth />
    </div>

    <div v-else>
        <Suspense>
            <template #default>
            <div>
                <button @click="handleLogout">
                Logout
                </button>
            </div>
            </template>

            <template #fallback>
                <Loading />
            </template>
        </Suspense>
    </div>
</template>

<script>
import Auth from "../components/Auth.vue";
import Loading from "../components/Loading.vue";
import { userSession, handleLogout } from "../vuetils/useAuth";

export default {
    components: {
        Auth,
        Loading,
    },
    setup() {
        return { userSession, handleLogout };
    }
};
</script>
