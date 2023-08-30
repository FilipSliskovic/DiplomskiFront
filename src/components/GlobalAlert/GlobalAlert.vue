<template>
    <v-snackbar
    :model-value="this.$store.getters.Show"
    :color="this.$store.getters.AlertType"
    :timeout="-1"
    >
    {{ this.$store.getters.Message }}
    <template v-slot:actions>
        <v-btn
        variant="plain"
        icon="mdi-close"
        density="compact"  
        @click="this.$store.dispatch('hideAlert')"
            >
        </v-btn>
    </template>    
    </v-snackbar>
</template>

<script>

    export default {
       
    };

</script>

<style scoped>
    .v-alert {
    position: fixed;
    top: 110px; /* Adjust the top spacing as needed */
    right: 20px; /* Adjust the right spacing as needed */
    max-width: 300px; /* Adjust the max-width as needed */
    z-index: 1000; /* Adjust the z-index as needed */
    }
</style>