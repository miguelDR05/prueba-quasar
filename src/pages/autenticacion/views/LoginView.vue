<template>
  <q-layout view="hHh Lpr lff" class="row items-center " :class="backgroundClass?'background-mobile':''">
    <div
      class="col-12 col-md-8 col-lg-8 col-xl-8 background-login gt-sm"
      style="height: 100vh"
    ></div>
    <div class="col-12 col-md-4 col-lg-4 col-xl-4 full-height" >
      <div class="row justify-center" :class="backgroundClass?'background-form-mobile':''">
        <div class="col-9">
          <div class="text-center">
            <div>
              <img width="100" src="~assets/images/logo_login_todo.jpg" />
            </div>
            <div class="q-ma-md text-h6 text-center text-weight-bold text-grey-10">
              BIENVENIDO
            </div>
            <q-form ref="refFormLogin" @submit="login" v-model="validForm" greedy
            >
              <q-input
              class="q-my-md"
              v-model="usuario"
              label="Usuario"
              :color="backgroundClass?'white':'primary'"
              :label-color="backgroundClass?'white':'grey'"
              >
                <template v-slot:prepend>
                  <q-icon name="person" :color="backgroundClass?'white':'grey'"/>
                </template>
              </q-input>
              <q-input
              class="q-my-md"
              v-model="password"
              label="Contraseña"
              :color="backgroundClass?'white':'primary'"
              :label-color="backgroundClass?'white':'grey'"
              :type="showPassword ? 'password' : 'text'"
              >
                <template v-slot:prepend>
                  <q-icon
                    :color="backgroundClass?'white':'grey'"
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>
              <q-btn
                class="q-my-md full-width"
                color="primary"
                label="Ingresar"
                type="submit"
              />
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
<style lang="scss">
.tableHeight .q-page{
	min-height: 400px !important;
}
.txtuppercase input{
	text-transform: uppercase;
}
.background-login{
	background: url('src/assets/images/logo_todo.jpg') no-repeat;
	background-size: cover;
}
.background-mobile {
  // background: url('src/assets/images/logo_todo.jpg') no-repeat;
  background-image: linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
  background-color: #7a7a7a30;
	background-size: cover;
  background-position: center;
  color: #fff;
}
.background-form-mobile{
  color: #fff ;
}

</style>
