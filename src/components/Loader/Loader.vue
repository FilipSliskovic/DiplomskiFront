<template>
    <v-overlay
      :model-value="isLoading"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
</template>
<script>
    export default{
        name: 'loader-1',
        props:{
            isLoading: Boolean,
        }
    }
</script>

<style scoped>
    .v-progress-circular {
    margin: 1rem;
    }
</style>