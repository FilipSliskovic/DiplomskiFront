
<template>
    <v-card
        class="mx-auto"

        min-width="300"
        max-width="300"
    >
    <div>
        <iframe class="gmap_iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" 
            :src="`https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q= ${this.cafe.adress}&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`">
        </iframe>
    </div>
        <!-- <v-img
        class="align-end text-white"
        height="200"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        cover
        >
        <v-card-title v-text="cafe.name"></v-card-title>
        </v-img> -->

        <v-card-subtitle class="pt-4" v-text="cafe.adress">
        </v-card-subtitle>

        <v-card-text>
        <div v-text="cafe.description"></div>
        </v-card-text>

        <v-card-actions>

        <v-row justify="center">
            <v-dialog
            v-model="dialog"
            fullscreen
            :scrim="false"
            transition="dialog-bottom-transition"
            >
            <template v-slot:activator="{ props }">
                <v-btn
                color="primary"
                dark
                v-bind="props"
                >
                See Menu
                </v-btn>
            </template>
            <v-card>
                <v-toolbar
                dark
                color="primary"
                >
                
                
                <v-toolbar-title>Menu</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                    icon
                    dark
                    @click="dialog = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                </v-toolbar-items>
                </v-toolbar>
                <v-list
                lines="two"
                subheader
                >
                <v-list-subheader>User Controls</v-list-subheader>
                <v-list-item title="Content filtering" subtitle="Set the content filtering level to restrict apps that can be downloaded"></v-list-item>
                <v-list-item title="Password" subtitle="Require password for purchase or use password to restrict purchase"></v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list
                lines="two"
                subheader
                >
                <v-list-subheader>General</v-list-subheader>
                <v-list-item title="Notifications" subtitle="Notify me about updates to apps or games that I downloaded">
                    <template v-slot:prepend>
                    <v-checkbox v-model="notifications"></v-checkbox>
                    </template>
                </v-list-item>
                <v-list-item title="Sound" subtitle="Auto-update apps at any time. Data charges may apply">
                    <template v-slot:prepend>
                    <v-checkbox v-model="sound"></v-checkbox>
                    </template>
                </v-list-item>
                <v-list-item title="Auto-add widgets" subtitle="Automatically add home screen widgets">
                    <template v-slot:prepend>
                    <v-checkbox v-model="widgets"></v-checkbox>
                    </template>
                </v-list-item>
                </v-list>
            </v-card>
            </v-dialog>
            <v-btn color="orange">
                Reserve
            </v-btn>
        </v-row>
              
        

        
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "cafe-card",
        data: () => ({
            show: false,
            dialog: false,
                      notifications: false,
                      sound: true,
                      widgets: false,
        }),
        props: {
            cafe: {},
        },
    };
</script>
<style>
    .dialog-bottom-transition-enter-active,
    .dialog-bottom-transition-leave-active {
    transition: transform .2s ease-in-out;
    }
</style>