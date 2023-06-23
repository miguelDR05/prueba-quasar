<template>
  <div v-if="children && children.length > 0 && level > 0" class="q-mx-sm">
    <!--
      v-if="children && children.length > 0 && level > 0"
      :header-inset-level="level === 1 ? 0 : level * espace"
      :header-class="level === 1 ? 'text-primary' : ''"
    -->
    <q-expansion-item default-closed :content-inset-level="0.5" :group="level.toString().trim()" :dense="dense"
      active-class="actives__link" class="q-mb-xs overflow-hidden text-grey-8 expansion-item" style="border-radius: 8px;"
      :expand-icon="level === 1 ? 'add' : 'nada'" expanded-icon="remove" @before-show="expandActivate = true"
      @before-hide="expandActivate = false" :class="expandActivate ? 'transition__active' : ''" :duration="250">
      <!-- popup unread -->
      <template v-slot:header>
        <q-item-section avatar v-if="level == 1">
          <q-skeleton type="QAvatar" v-if="!icon && (icon === '' || icon === undefined)" size="24px" />
          <q-icon :name="icon" size="sm" :style="miniState ? 'color:white' : { color: `${color}` }" class="btn-drawer"
            :class="miniState ? 'mini-state-active' : ''" />
        </q-item-section>
        <q-item-section class="q-mx-sm">
          <q-skeleton type="text" v-if="title && (title === '' || title === undefined)" />
          {{ title }}
        </q-item-section>
      </template>
      <MenuLink v-for=" child  in  children " :key="child.idModuleAuth" v-bind="child" :dense="dense">
      </MenuLink>
    </q-expansion-item>
  </div>
  <div v-else class="">
    <q-separator v-if="separator" />
    <q-space />
    <q-item clickable :dense="dense" :to="link" class="q-my-xs" active-class="actives__link">
      <!-- <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" color="grey" />
      </q-item-section> -->
      <q-item-section>
        <q-item-label>
          <q-skeleton type="text" v-if="!title && (title === '' || title === undefined)"></q-skeleton>
          {{ title }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator v-if="separator" />
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useConfigUserStore } from '@stores/config-user'

export interface Menu {
  idModuleAuth?: string | undefined;
  title?: string | undefined;
  caption?: string | undefined;
  link?: string | undefined;
  color?: string | undefined;
  icon?: string | undefined;
  level?: number;
  children?: Array<Menu> | undefined;
  dense?: boolean;
  lastLevel?: number;
  separator?: boolean;
  code?: string;
  miniState?: boolean;
}
withDefaults(defineProps<Menu>(), {
  caption: '',
  link: '#',
  icon: '',
  color: '',
  level: 0,
  title: '',
  //children: Array as PropType<Menu>,
  children: () => [],
  dense: false,
  lastLevel: 0,
  separator: false,
  code: '',
  miniState: false,
});

const espace = 0.13;
const expandActivate = ref<boolean>(false);

const configStore = useConfigUserStore()
const expandItem = async () => {
  console.log('expandir');

}
const listPermisosUser = computed(() => {
  return configStore.getFullPermisos;
})

</script>
<style lang="sass">
.q-item
  min-height: 35px
  border-radius: 8px
.q-item__section--side > .q-icon
  font-size: 18px
  font-weight: bolder

.q-item__section--avatar
  min-width: 5px

.q-item__section--side
  // padding-right: 5px !important

.actives__link
  color: #1f1e20
  background-color: #ececf0
  border-radius: 10px

.transition__active
  margin-top: 10px
  margin-bottom: 10px
  -webkit-transition: 0.2s linear
  transition: 0.2s linear

.mini-state-active
  color: var(--q-toolbar2)
  border-radius: 10px
  // padding: 6px
  // border: 1px solid #7d7c81
  margin: 5px 0px
</style>
