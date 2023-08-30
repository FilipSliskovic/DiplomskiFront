
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

        <v-card-subtitle class="pt-4" v-text="cafe.name + ', ' + cafe.adress">
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
                @click="getMenu(this.cafe.name)"
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
                <v-col cols="8" align-self="center" v-if="Object.keys(categorizedMenuItems).length != 0 ">
                    
                    <v-list
                    lines="one"
                    subheader
                    v-for="(categoryItems,category) in categorizedMenuItems" :key="category"
                    cols="6"
                    >
                        <v-list-subheader v-text="category"></v-list-subheader>
                        <v-list-item v-for="(item,id) in categoryItems" :key="id" :title=item.productName :subtitle=item.description>
                            <template v-slot:prepend>


                                <v-dialog
                            transition="dialog-top-transition"
                            width="auto"
                            
                            >
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                    color="grey-lighten-1"
                                    icon="mdi-information"
                                    variant="text"
                                    @click="getMenuItem(item.id)"
                                    v-bind="props"
                                    ></v-btn>
                                </template>
                                <template v-slot:default="{ isActive }">
                                <v-card>
                                    <v-toolbar
                                    color="primary"
                                    :title="menuItem.name"
                                    ></v-toolbar>
                                    <v-carousel>
                                        <v-carousel-item v-for="imageName in menuItem.imageNames" :key="imageName" 
                                        :src = getImageURL(imageName)
                                        :alt=imageName
                                        cover
                                        
                                        >
                                            
                                        </v-carousel-item>
                                    </v-carousel>
                                    <v-card-text class="text-center">
                                    <div class="text-h4 pa-5" v-text="menuItem.description"></div>
                                    </v-card-text>
                                    <v-card-text>
                                        <div class="text-h5 pa-2" v-text="'Amount: ' + menuItem.amount"></div>
                                    </v-card-text>
                                    <v-card-text>
                                        <div class="text-h5 pa-2" v-text="'Category: ' + menuItem.categoryName"></div>
                                    </v-card-text>
                                    <v-card-text>
                                        <div class="text-h5 pa-2" v-text="'Price: ' + menuItem.price + 'RSD'"></div>
                                    </v-card-text>
                                    <v-card-actions class="justify-end">
                                    <v-btn
                                        variant="text"
                                        @click="isActive.value = false"
                                    >Close</v-btn>
                                    </v-card-actions>
                                </v-card>
                                </template>
                            </v-dialog>



                                
                            </template>

                            



                            <template v-slot:append>
                                <p>({{ item.amount }}) {{item.price}} RSD</p>
                            </template>
                        </v-list-item>
                        <!-- <v-list-item title="Password" subtitle="Require password for purchase or use password to restrict purchase"></v-list-item> -->
                        <v-divider></v-divider>
                    </v-list>
                </v-col>
                <v-col cols="8" v-else align-self="center">
                    <v-card-title class="text-center">Sorry this menu doesnt have any items in it!</v-card-title>
                </v-col>    
                <!-- <v-list
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
                </v-list> -->
            </v-card>
            </v-dialog>
            <v-btn color="orange" v-if="this.$store.getters.IsAuthenticated">
                Reserve
            </v-btn>
        </v-row>
              
        

        
        </v-card-actions>
    </v-card>
</template>

<script>
    import axios from '@/axios';

    export default {
        name: "cafe-card",
        data: () => ({
            show: false,
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            menu:[],
            menuItem:{},
            ImageRoot: "http://localhost:5000/images/",
            asd : ".../"
        }),
        props: {
            cafe: {},
        },
        methods:{
            getMenu(name)
            {
                var that = this;
                axios
                .get("http://localhost:5000/api/CafeProducts?keyword="+name, {
                    headers: { Authorization: "Bearer " + this.$store.getters.Token },
                })
                .then((response) => {
                    that.menu = response.data.data;
                    console.log(that.menu);
                });
            },
            getMenuItem(id)
            {
                var that = this;
                axios
                .get("http://localhost:5000/api/Products/"+id, {
                    headers: { Authorization: "Bearer " + this.$store.getters.Token },
                })
                .then((response) => {
                    that.menuItem = response.data;
                    console.log(that.menuItem);
                });
            },
            getImageURL(name)
            {
                return this.ImageRoot + name
            }
        },
        computed:{
            categorizedMenuItems()
            {
                const categories = {};

                this.menu.forEach(item=>{
                    if(!categories[item.category]){
                        categories[item.category] = []
                    }
                    categories[item.category].push(item);
                })

                console.log(categories)
                return categories;
            }

        }
    };
</script>
<style>
    .dialog-bottom-transition-enter-active,
    .dialog-bottom-transition-leave-active {
    transition: transform .2s ease-in-out;
    }
</style>