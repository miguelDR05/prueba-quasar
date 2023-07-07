<template>
  <q-layout view="hHh Lpr lff" class="row items-center">
    <div class="col-12 col-md-7 col-lg-8 col-xl-8 background-content gt-sm" style="height: 100vh">
      <!-- <div class="background-login"></div> -->
      <!-- <q-carousel animated v-model="slide" arrows infinite style="height: 100%;">
        <q-carousel-slide :name="1" img-src="~assets/images/dashboard-login-2.svg">
          <div class="absolute-bottom custom-caption text-center">
            <div class="text-h2">First stop</div>
            <div class="text-subtitle1">Mountains</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" img-src="~assets/images/logo_todo.jpg" />
        <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
        <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
      </q-carousel> -->
      <q-img src="~assets/images/men.jpg" style="height: 100%; ">
        <div class="absolute-full text-subtitle2 flex flex-center">
        </div>
      </q-img>
    </div>
    <div class="col-12 col-md-5 col-lg-4 col-xl-4">
      <!--  :style="Screen.sm || Screen.xs ? 'height: 100vh' : ''" -->
      <!-- <div v-if="Screen.sm || Screen.xs" class="bg-mobile-login"></div> -->
      <div class="row justify-center items-center">
        <div :class="Screen.sm || Screen.xs ? 'col-10' : 'col-8'">
          <div>
            <div class="logo column items-center justify-center q-mx-auto"
              :style="Screen.sm || Screen.xs ? 'margin-bottom: 2rem' : ''">
              <q-avatar size="100px">
                <img src="~assets/images/hteclogo_sticky.svg" />
                <!-- style="width: 3.5rem; margin: auto;"  -->
              </q-avatar>
              <div><strong class="text-grey-9" style="font-size: 20px;">Innovahtec</strong></div>
              <div class="text-grey-9">Solutions</div>
            </div>
            <div class="q-my-lg" style="font-weight: 600;">
              <div class="text-grey-9" style="font-size: 24px;">
                Bienvenido usuario
              </div>
              <div class="text-primary cursor-pointer">Crear una cuenta.</div>
            </div>

            <q-form ref="refFormLogin" @submit="login" v-model="validForm" greedy>
              <q-input outlined dense class="q-my-md" v-model="usuario" label="Usuario" color="primary"
                label-color="text-grey-9">
                <template v-slot:prepend>
                  <q-icon name="person" color="grey-9" />
                </template>
              </q-input>
              <q-input outlined dense class="q-my-md" v-model="password" label="Contraseña" color="primary"
                label-color="text-grey-9" :type="showPassword ? 'password' : 'text'">
                <template v-slot:prepend>
                  <q-icon color="grey-9" :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="showPassword = !showPassword" />
                </template>
              </q-input>
              <div class="row justify-between items-center q-my-md" style="font-size: 12px; font-weight: 600;">
                <q-checkbox v-model="recordarPassword" label="Recordar contraseña" class="text-grey-9"></q-checkbox>
                <span class="text-primary cursor-pointer">¿Olvidaste tu contraseña?</span>
              </div>
              <q-btn unelevated no-caps class="q-my-md full-width" color="primary" label="Iniciar sesión" type="submit" />
              <q-btn no-caps :icon="'img:src/assets/images/icon-google.svg'" outline unelevated
                class="full-width text-grey-9" color="dark" label="Iniciar sesión con Google" type="submit"
                style="font-weight: 600;" />
            </q-form>
          </div>
        </div>
      </div>
    </div>
  </q-layout>
</template>
<script setup lang="ts">
import { Screen } from 'quasar'
import { useRouter, useRoute } from 'vue-router';
import { ref, Ref, onMounted, onUpdated, computed } from 'vue';

/****************************************************************************/
/*                              DATA                                        */
/****************************************************************************/
const validForm = ref<boolean>(false);
const refFormLogin = ref<any>(null);
const item = ref<any>({
  usuario: <string>'',
})
const usuario = ref<string>('');
const password = ref<string>('');
const showPassword = ref(true);
const recordarPassword = ref(false);
const slide = ref(1)
/****************************************************************************/
/*                       	    	ROUTER     	                                */
/****************************************************************************/
const route = useRoute();
const router = useRouter();

/****************************************************************************/
/*                           METHODS                                        */
/****************************************************************************/
const login = async () => {
  console.log('Login');
  router.push({ path: '/' });
}
const backgroundClass = computed(() => {
  if (Screen.sm || Screen.xs) {
    return true;
  } else {
    return false
  }
});
</script>
<style lang="sass">

.txtuppercase input
  text-transform: uppercase

.background-content
  // background-color: var(--secondary)
  // background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='105' viewBox='0 0 80 105'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='death-star' fill='%232c698d' fill-opacity='0.48'%3E%3Cpath d='M20 10a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V10zm15 35a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V45zM20 75a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V75zm30-65a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V10zm0 65a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V75zM35 10a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V10zM5 45a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V45zm0-35a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V10zm60 35a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V45zm0-35a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V10z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
  // padding: 1rem

.background-login
  background: url('src/assets/images/dashboard-login.svg') no-repeat
  background-size: contain
  background-position: center
  background-color: #fff
  width: 50%
  height: 50%
  border-radius: 20px

.bg-mobile-login
  margin: 10px 0
  height: 25vh
  margin-bottom:20px
  background: url('src/assets/images/dashboard-login.svg') no-repeat
  background-size: contain
  background-position: center
  // background-image: linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)
.q-carousel
  border-radius: 20px

.q-carousel__slides-container
  padding: 1rem
  // background-color: var(--secondary)
.q-carousel__slide
  min-height: 100%
  background-size: contain
  background-position: center
  background-repeat: no-repeat
  border-radius: 20px

.logo
  // border: 1px solid #ccc
  // background: var(--primary)
  border-radius: 50%
  width: 10rem
  height: 10rem
</style>
