<!-- <template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to the Vuetify 3 Beta
        </h1>

        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br />please join our online
          <a href="https://community.vuetifyjs.com" target="_blank"
            >Discord Community</a
          >
        </p>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-5">What's next?</h2>

        <v-row justify="center">
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-row>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-5">Important Links</h2>

        <v-row justify="center">
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </v-row>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-5">Ecosystem</h2>

        <v-row justify="center">
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ eco.text }}
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template> -->

<template>
  <v-container>
    <v-row class="text-center mb-5" align="center">
      <v-col cols="12" class="mb-5">
        <h1>Cofix</h1>
      </v-col>

      <v-col cols="12" class="mb-5">
        <h2>About us</h2>
        <v-divider class="border-opacity-100" color="info"></v-divider>
        <h3 class="mt-4">Sve pocinje od sna</h3>
        <p>
          Guided by the vision to meet tradition and innovation and create the
          unique pleasure of drinking one of the most popular beverages in the
          Balkans, our dream of coffee was born. Coffee that unites and erases
          all the cultural barriers of the world. Coffee that conquers the
          palate of experienced coffee drinkers and connoisseurs. Coffee to
          remember
        </p>
      </v-col>
      <v-col>
        <h2>Blog</h2>
        <v-divider class="border-opacity-100" color="info"></v-divider>
        <v-row justify="space-between mt-4">
          <v-card v-for="card in cardData" :key="card" class="text-white mt-4">
            <div class="imageGradient-overlay-container">
              <v-img
                height="300px"
                class="imageGradient"
                cover
                :width="400"
                :src="require(`@/assets/Images/${card.cardImg}`)"
              >
                <!-- Gradient overlay -->
                <div class="imageGradient-overlay"></div>

                <!-- Card content -->
                <div class="card-content">
                  <v-card-title
                    class="text-white w-75"
                    style="white-space: normal"
                  >
                    {{ card.cardTitle }}
                  </v-card-title>

                  <v-card-text
                    class="text-white w-75"
                    style="white-space: normal"
                  >
                    {{ card.cardText }}
                  </v-card-text>
                  <hr class="cardHR" v-if="card.cardLink" />
                  <router-link :to="card.cardLink" v-if="card.cardLink">
                    <v-btn class="ml-4 mt-8" variant="outlined">{{
                      card.cardTitle
                    }}</v-btn>
                  </router-link>
                </div>
              </v-img>
            </div>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    cardData: [
      {
        cardTitle: "Locations",
        cardImg: "HomeImageWork.jpg",
        cardText: "Find our locations",
        cardLink: "/Cafe",
      },
      {
        cardTitle: "Cofix Wins Best Coffee in Local Poll",
        cardImg: "Blog2.jpg",
        cardText:
          "We're thrilled to announce that Cofix has been voted the best coffee spot in town!",
      },
      {
        cardTitle: " Cofix Introduces Contactless Ordering",
        cardImg: "Blog3.jpg",
        cardText:
          "Browse our menu, and place your order from the comfort of your seat. Enjoy your favorite brew without missing a beat!",
      },
      {
        cardTitle: "A Journey Through Unique Brews",
        cardImg: "Blog4.jpg",
        cardText:
          "Join us in celebrating the diverse and complex profiles that make each cup a journey of its own.",
      },
      {
        cardTitle: "Cofix Hosts Local Artisan Market",
        cardImg: "Blog5.jpeg",
        cardText:
          "We believe in supporting local talent, and what better way than hosting an Artisan Market right here at [Coffee Shop Name]!",
      },
      {
        cardTitle: "Cofix Launches Coffee Tasting Workshops",
        cardImg: "Blog6.jpg",
        cardText:
          "[Coffee Shop Name] is excited to introduce our Coffee Tasting Workshops.",
      },
      {
        cardTitle: "Cofix Initiates 'Beans for a Cause' Campaign",
        cardImg: "blog 7.jpg",
        cardText:
          "Percentage of proceeds from select drinks will go towards supporting a local charity.",
      },
      {
        cardTitle: "Ethical Coffee Sourcing",
        cardImg: "blog 8.jpg",
        cardText:
          "Learn about our partnerships with sustainable coffee producers and the fair trade practices we embrace,",
      },
    ],
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader/tree/next",
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify/tree/next",
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify",
      },
    ],
    importantLinks: [
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com",
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify",
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs",
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify",
      },
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com",
      },
      {
        text: "Roadmap",
        href: "https://vuetifyjs.com/introduction/roadmap/",
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions",
      },
    ],
  }),
  methods: {
    getImageSrc(img) {
      return "@/assets/Images/" + img;
    },
  },
};
</script>

<style scoped>
.imageGradient-overlay-container {
  position: relative;
  width: 100%;
}

.imageGradient {
  position: relative;
  width: 100%;
  height: auto;
}

.imageGradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(48, 63, 159, 0.6), transparent);
}

.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  padding-bottom: 40px;
  width: 100%;
  background: transparent;
  color: white;
  text-align: left;
}

.cardHR {
  height: 3px;
  color: white;
  width: 40%;
  margin: 0 0 0 16px;
}
</style>
