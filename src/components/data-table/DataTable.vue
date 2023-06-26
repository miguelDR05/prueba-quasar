<template>
  <div>
    <q-table :title="title" :columns="headerTable" :rows="rowsFilterTable" :row-key="row_key ? row_key : 'ido'"
      :dense="dense" :flat="flat" class="my-sticky-virtscroll-table q-my-sm" :table-style="tableStyle"
      :rows-per-page-options="[0]" :filter="filter" :loading="loadingTable" :separator="separator" :selection="selection"
      v-model:selected="selectedTable" :virtual-scroll="true" :visible-columns="headerVisibleColumns"
      :virtual-scroll-sticky-size-start="8" @selection="selectRow" @row-contextmenu="handleEvent">
      <!-- @row-contextmenu="handleEvent" -->
      <!-- header -->
      <template v-slot:header="props">
        <q-tr :props="props" v-if="!hasHeaderSlot">
          <!--<q-th auto-width class="ignore-elements"> </q-th>-->
          <q-th auto-width class="ignore-elements" v-if="selection != 'none' && selection != undefined">
            <q-checkbox color="primary" v-model="props.selected" />
          </q-th>
          <q-th :props="props" v-for="col in props.cols" :key="col['name']"
            @contextmenu="filterContextMenu($event, col.name)">
            <div class="row inline justify-center items-center">
              <div class="column" v-if="headerFilter &&
                col['hasFilter'] &&
                col.hasOwnProperty('hasFilter')
                ">
                <q-btn flat dense size="sm" class="q-ml-xs" @click.stop="">
                  <q-icon name="mdi-cube-outline" color="red"></q-icon>
                </q-btn>
              </div>

              <div class="column">
                &nbsp;&nbsp;
                {{ col['label'] }}
              </div>
              <q-menu context-menu>
                <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary"
                  align="justify" narrow-indicator>
                  <q-tab name="filters">
                    <q-icon name="filter_list" size="10"></q-icon>
                  </q-tab>
                  <q-tab name="fixed_columns">
                    <q-icon name="table_rows" size="10"></q-icon>
                  </q-tab>
                  <q-tab name="visibility_columns">
                    <q-icon name="view_week" size="10"></q-icon>
                  </q-tab>
                </q-tabs>
                <q-separator />
                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="filters">
                    <q-card flat>
                      <q-input rounded dense label-slot style="width: 100%" clearable
                        @update:model-value="nextSearchFilterByColumn($event)" v-model="txtSearchByColumn">
                        <template v-slot:label>
                          <span class="text-weight-bold text-red-9">Buscar {{ txtSearchByColumn }}</span>
                        </template>
                      </q-input>
                      <div id="virtual-scroll-target" class="scroll"
                        style="height: 280px; width: 380px; margin-top: 10px">
                        <div class="" style="
                              position: sticky;
                              opacity: 1;
                              z-index: 1;
                              top: 0;
                            ">
                          <li style="
                                display: block;
                                line-height: 1.9;
                                border-bottom: 1px solid #abc;
                              ">
                            <q-checkbox dense size="sm" color="primary" :label="'Seleccionar Todos'" :model-value="listFilterTable.length ==
                              listFilterTable.filter((e: any) => e.isActive).length
                              ? true
                              : listFilterTable.filter((e: any) => e.isActive)
                                .length == 0
                                ? false
                                : null
                              " @update:model-value="
    updateModelValue($event, col.field)
    "></q-checkbox>
                          </li>
                        </div>

                        <q-virtual-scroll scroll-target="#virtual-scroll-target" :items="listFilterTable" separator
                          v-slot="{ item }">
                          <li style="
                                display: block;
                                line-height: 1.9;
                                border-bottom: 1px solid #abc;
                              ">
                            <q-checkbox dense v-model="item.isActive" size="sm" color="primary"
                              :label="item.value"></q-checkbox>
                          </li>
                        </q-virtual-scroll>
                      </div>

                      <q-card-actions class="justify-around">
                        <q-btn flat color="red"> Cerrar </q-btn>

                        <q-btn @click="aceptFilter" flat size="10" color="primary">
                          Aceptar
                        </q-btn>
                      </q-card-actions>
                    </q-card>
                  </q-tab-panel>

                  <q-tab-panel name="fixed_columns">
                    <q-card flat>
                      <div class="container" style="height: 300px; width: 380px; margin-top: 10px">
                        FIJAR COLUMNAS
                      </div>
                    </q-card>
                  </q-tab-panel>

                  <q-tab-panel name="visibility_columns">
                    <div v-if="visibleColumns.length == 0" class="container"
                      style="height: 300px; width: 380px; margin-top: 10px">
                      {{
                        visibleColumns.length == 0
                        ? 'Filtro de columnas visibles no disponible'
                        : ''
                      }}
                    </div>
                    <q-card flat>
                      <q-list>
                        <q-item tag="label" dense v-for="(item, i) in visibleColumns" :key="i">
                          <q-item-section>
                            <q-item-label>{{
                              visibleColumns[i].label
                            }}</q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-toggle color="primary" v-model="headerVisibleColumnsTemp" :val="visibleColumns[i].name"
                              @update:model-value="aceptVisibleColumns" />
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-card>
                  </q-tab-panel>
                </q-tab-panels>
              </q-menu>
            </div>
          </q-th>
        </q-tr>

        <slot name="header" v-bind:cols="props.cols"> </slot>
      </template>

      <!-- top -->
      <template v-slot:top="props" v-if="btnExportarExcel ||
        btnFullScreen ||
        filterSearch ||
        btnLoadTable ||
        btnFilterAdvance
        ">
        <div class="row items-center full-width " style="padding: 10px 22px;">
          <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3">
            <!-- :class="Dark.isActive ? 'text-grey-2' : 'text-grey-7'" -->
            <div class="row justify-start items-center">
              <img v-if="imgHead" class="q-mr-xs" style="width: 25px" :src="imgHeadSrc">
              <div :class="Screen.xs ? 'text-subtitle1' : 'q-table__title'">{{ title }}</div>
              <!-- <span v-if="selection == 'multiple'">({{ selectedTable.length }}/{{ countRowsTable }})</span> -->
            </div>
          </div>
          <div class="col-xs-12 col-sm-8 col-md-9 col-lg-9">
            <!-- aqui hira lo que querramosp poner desde nuestro componente padre en la parte derecha -->
            <div class="row items-center justify-end q-gutter-y-xs">
              <slot name="btn-left"></slot>
            </div>
          </div>
        </div>
        <div class="full-width hr__space"></div>
        <div class="row items-center full-width justify-end" style="padding: 0px 22px;">
          <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6 row justify-start">
            <div>
              <q-input dense borderless v-model="filter" @update:model-value="nextSearchFilter($event)"
                placeholder="Buscar en el listado" v-if="filterSearch">
                <template v-slot:prepend>
                  <q-icon v-if="filter !== ''" name="close" @click="filter = ''" class="cursor-pointer" />
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6 row justify-end items-center">
            <!-- <div class="col-12 col-md-6 col-lg-5 row"> -->
            <!-- <div :class="drawerFilters ? 'gt-lg' : 'gt-sm col-md-6 col-lg-7'">
                <q-input dense borderless v-model="filter" @update:model-value="nextSearchFilter($event)" label-slot
                  v-if="filterSearch">
                  <template v-slot:label>
                    <span class="text-weight-bold text-primary">Buscar</span>
                    en el listado
                  </template>
                  <template v-slot:append>
                    <q-icon v-if="filter !== ''" name="close" @click="filter = ''" class="cursor-pointer" />
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div> -->
            <!-- <div> -->
            <q-btn round flat icon="mdi-microsoft-excel" class="q-ml-sm" v-if="btnExportarExcel" color="primary">
              <!-- :color="Dark.isActive ? 'secondary' : 'primary'" -->
              <q-tooltip class="bg-tool-tip" anchor="center left" self="center right" :offset="[10, 10]">
                Exportar Excel
              </q-tooltip>
            </q-btn>
            <q-btn round flat :icon="'mdi-autorenew'" class="q-ml-sm" v-if="btnLoadTable" @click.prevent="refresh"
              color="primary">
              <q-tooltip class="bg-tool-tip" anchor="center left" self="center right" :offset="[10, 10]">
                Refrescar
              </q-tooltip>
            </q-btn>
            <q-btn round flat :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'
              " @click="props.toggleFullscreen" class="q-ml-sm" v-if="btnFullScreen" color="primary">
              <q-tooltip class="bg-tool-tip" anchor="center left" self="center right" :offset="[10, 10]">
                {{ props.inFullscreen ? 'Cerrar Pantalla' : 'Pantalla Completa' }}
              </q-tooltip>
            </q-btn>
            <q-btn flat round :icon="'mdi-filter-outline'" @click="openDrawerOfFilters" class="q-ml-sm"
              v-if="btnFilterAdvance" color="primary">
              <q-tooltip class="bg-tool-tip" anchor="center left" self="center right" :offset="[10, 10]">
                Filtrar
              </q-tooltip>
            </q-btn>
            <slot name="btn-right"></slot>
            <!-- </div> -->

            <!-- </div> -->
          </div>
        </div>
        <div class="full-width hr__space"></div>
      </template>
      <!-- body -->
      <template v-slot:body="props" v-if="!hasBodyCellByColumSlot">
        <q-tr :props="props" @contextmenu="onContextMenuForRow($event, props.row)" class="cursor-pointer"
          v-if="!hasBodyCellByColumSlot && !hasBodySlot">
          <q-td v-if="selection != 'none' && selection != undefined" auto-width class="ignore-elements">
            <q-checkbox color="primary" :key="props.row.ido" v-model="props.selected"
              checked-icon="checkbox-marked-circle-outline" />
          </q-td>
          <q-td v-for="item in props.cols" :key="item.name" :props="props">
            {{ item.value }}
          </q-td>
        </q-tr>
        <!--<slot name="body" v-bind="props" v-if="!hasBodySlot"></slot>-->
        <q-popup-proxy context-menu>
          <q-list dense style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>Copiar</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Copiar con Cabecera</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>Exportar</q-item-section>
              <q-item-section side>
                <q-icon name="keyboard_arrow_right" />
              </q-item-section>

              <q-menu anchor="top end" self="top start">
                <q-list>
                  <q-item v-for="n in 3" :key="n" dense clickable>
                    <q-item-section>Exportar</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-item>
          </q-list>
        </q-popup-proxy>
      </template>

      <template v-for="(_, slot) of slots" v-slot:[`${slot.toString()}`]="scope" :key="`key-${slot}`">
        <slot :name="slot" v-bind="scope" />
        <q-menu anchor="top right" context-menu self="top right">
          <q-list dense style="min-width: 100px" v-if="haveOptions(scope.row)">
            <data-table-option :options="optionsTable" :row="scope.row" @optionAction="optionAction"></data-table-option>
          </q-list>
        </q-menu>
        <!--<q-popup-proxy context-menu>-->
        <!--</q-popup-proxy>-->
      </template>

      <!-- loading -->
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>
  </div>
  <!-- aqui ponemos filtros personalizados para busacar en la tabla -->
  <q-drawer side="right" v-model="drawerFilters" :width="350" :breakpoint="fullscreen ? 7000 : 300" color="primary"
    class="drawer-index" overlay bordered>
    <div class="">
      <q-toolbar class="q-px-sm">
        <q-toolbar-title>Búsqueda por filtros</q-toolbar-title>
        <q-btn flat rounded @click.prevent="closeDrawerOfFilters" round dense icon="close" />
      </q-toolbar>
      <q-separator></q-separator>

      <div class="q-ma-md">
        <slot name="filter"></slot>
      </div>
    </div>
  </q-drawer>
</template>

<script setup lang="ts">
import { QTableProps } from 'node_modules/quasar/dist/types/index';
import {
  onMounted,
  ref,
  computed,
  watch,
  nextTick,
  useSlots,
  PropType,
} from 'vue';
import type { Ref } from 'vue';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { OptionTable } from '@components/data-table/models';
import DataTableOption from '@components/data-table/DataTableOption.vue';
import { useTree } from '@composable/tree/useTree';
import { Dark, Screen } from 'quasar';

/****************************************************************************/
/*                                PROPS                                     */
/****************************************************************************/

const dProps = defineProps({
  title: {
    type: String,
    default: '',
  },
  data: {
    type: Array<any>,
    default: [],
  },
  columns: {
    type: Array<any>,
    default: [],
  },
  separator: {
    type: String as PropType<QTableProps['separator']>,
    default: 'none',
  },
  dense: {
    type: Boolean,
    default: false,
  },
  dark: {
    type: Boolean,
    default: false,
  },
  flat: {
    type: Boolean,
    default: false,
  },
  selection: {
    type: String as PropType<QTableProps['selection']>,
    default: 'none',
  },
  selected: {
    type: Array<any>,
    default: [],
  },
  pagination: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  row_key: {
    type: String,
    default: 'ido',
  },
  btnLoadTable: {
    type: Boolean,
    default: false,
  },
  btnExportarExcel: {
    type: Boolean,
    default: false,
  },
  btnFullScreen: {
    type: Boolean,
    default: false,
  },
  filterSearch: {
    type: Boolean,
    default: false,
  },
  visibilityColumns: {
    type: Boolean,
    default: false,
  },
  btnFilterAdvance: {
    type: Boolean,
    default: false,
  },
  headerFilter: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array<OptionTable>,
    default: [],
  },
  tableStyle: {
    type: Object,
    default: () => ({ height: '' }),
  },
  imgHead: {
    type: Boolean,
    default: false,
  },
  imgHeadSrc: {
    type: String,
    default: 'https://cdn.quasar.dev/logo-v2/svg/logo.svg',
  }
});

/****************************************************************************/
/*                             VARIABLES                                    */
/****************************************************************************/

const tableStyle = ref(dProps.tableStyle);

const optionsTable = ref(dProps.options);

const loadingTable: Ref<boolean> = ref<boolean>(false);

const drawerFilters = ref(false);
//const internalError: Ref<boolean> = ref<boolean>(props.error)

const headerVisibleColumns: Ref<QTableProps['visibleColumns']> = ref([]);
const headerVisibleColumnsTemp: any = ref([]);
const visibleColumns: any = ref([]);
// selected
const selectedTable = ref(dProps.selected);
// vitualizacion tables
const paginations = ref({
  rowsPerPage: 0,
});

//tables
const filter = ref('');

//const selectedFilterByColumn = ref([]);
//let columnValuesSelected = ref([]);

// tabs
const tab = ref('filters');

// second implementacion
const filterTable: any = ref([]);
const headerTable: Ref<QTableProps['columns']> = ref([]);
const rowsTable: Ref<QTableProps['rows']> = ref([]);
let rowsFilterTable: Ref<QTableProps['rows']> = ref([]);
let idFilterColumnHeader: string;
const listFilterTable: any = ref([]);

//rxjs
const searchFilterByColumn$ = new Subject<unknown>();
const searchFilter$ = new Subject<unknown>();
const txtSearchByColumn = ref('');
const fullscreen = ref(false);

/****************************************************************************/
/*                                EMITS                                     */
/****************************************************************************/

const emit = defineEmits([
  'update:selected',
  'refresh',
  'optionAction',
  'selectRow',
]);

/****************************************************************************/
/*                                SLOTS                                     */
/****************************************************************************/

const slots = useSlots();

searchFilterByColumn$.asObservable().pipe(debounceTime(300)).subscribe({
  next: subSearchFilterByColumn,
});

searchFilter$
  .asObservable()
  .pipe(debounceTime(300))
  .subscribe({
    next: (v) => subSearch(v),
  });

/****************************************************************************/
/*                           COMPOSABLE                                     */
/****************************************************************************/

const { treeToArray } = useTree();

/****************************************************************************/
/*                           METHODS                                        */
/****************************************************************************/
function openDrawerOfFilters() {
  nextTick(() => {
    drawerFilters.value = !drawerFilters.value;
  });
}

function closeDrawerOfFilters() {
  nextTick(() => {
    drawerFilters.value = false;
  });
}

function filterContextMenu(e: any, id: string) {
  e.preventDefault();
  idFilterColumnHeader = id?.toString().trim();
  /*   console.log(filterTable.value[`${idFilterColumnHeader}`].value[0].value);
  console.log(
    Array.isArray(filterTable.value[`${idFilterColumnHeader}`].value[0].value)
  ); */
  listFilterTable.value = [];
  if (Array.isArray(filterTable.value[`${idFilterColumnHeader}`].value[0].value)) {
    filterTable.value[`${idFilterColumnHeader}`].value.forEach((e: any) => {
      e.value.forEach((e2: any) => {
        const item = listFilterTable.value.filter(
          (f: any) => f.value == e2.nombreCompleto
        );
        if (item.length == 0) {
          listFilterTable.value.push({
            isActive: e.isActive,
            value: e2.nombreCompleto,
          });
        }
      });
    });
  } else {
    listFilterTable.value = filterTable.value[
      `${idFilterColumnHeader}`
    ].value.filter((e: any) => e.value != null);
  }
  listFilterTable.value.sort((x: any, y: any) =>
    x.value.localeCompare(y.value)
  );
  console.log('filter', listFilterTable.value);

  console.log(idFilterColumnHeader);
}

const refresh = () => {
  console.log('refresh');
  loadingTable.value = true;
  setTimeout(function () {
    emit('refresh');
    loadingTable.value = false;
  }, 1500);

};

function subSearch(search: any) {
  //console.log(search, 'search');
  filter.value = search;
}

const nextSearchFilter = (search: string | number | null) => {
  searchFilter$.next(search?.toString()?.trim() ?? '');
};

function subSearchFilterByColumn({ id, search }: any) {
  console.log('value empty');
  if (search === '') {
    listFilterTable.value = filterTable.value[id].value;
    console.log('value empty');
    return;
  }
  listFilterTable.value = filterTable.value[id].value.filter((e: any) => {
    return e.value.toString().search(new RegExp(search, 'i')) !== -1;
  });
}

function nextSearchFilterByColumn(search: string | number | null) {
  searchFilterByColumn$.next({
    id: idFilterColumnHeader,
    search: search?.toString()?.trim() ?? '',
  });
}

function initHeader(header: any) {
  let arrHeader = [];
  // seleccion multiple
  if (false) {
  }
  arrHeader = header.map((e: any) => ({
    isSticky: false,
    isFilter: false,
    ...e,
  }));
  return arrHeader;
}

function initFilter(rows: Ref<QTableProps['rows']>) {
  if (!rows.value?.length) return;
  const filterHeader: any = [];
  const headerTemp: any = headerTable.value?.reduce(function (acm: any, el) {
    return { ...acm, [`${el.name}`]: [] };
  }, {});

  const headerKeys = Object.keys(headerTemp);

  //console.log(headerTemp, headerKeys);
  rows.value.forEach((e: any) => {
    for (let key in headerTemp) {
      headerTemp[key].push(e[key]);
    }
  });
  /*rows.value.forEach((e: any) => {
      headerKeys.forEach((ek) => {
        headerTemp[ek].push(e[ek]);
      });
    });*/
  for (let key in headerTemp) {
    filterHeader[`${key}`] = {
      order: 0,
      value: [...new Set(headerTemp[key])].map((e) => ({
        isActive: false,
        value: e,
      })),
    };
  }

  //console.log(filterHeader);
  //console.log(headerTemp, 'headerTemp', headerKeys);

  /*headerKeys.forEach((e: any) => {
      filterHeader[e] = {
        order: 0,
        value: [...new Set(headerTemp[e])].map((e) => ({
          isActive: false,
          value: e,
        })),
      };
    });*/

  filterTable.value = filterHeader;
}

const aceptVisibleColumns = (e: any) => {
  headerVisibleColumns.value = [...headerVisibleColumnsTemp.value];
};

const aceptFilter = (e: any) => {
  const id = idFilterColumnHeader;
  const countActiveFilter = filterTable.value[id].value
    .filter((e: any) => e.isActive)
    .map((e: any) => e.value);
  //console.log(filterTable.value[id])
  // arreglo q tiene los order indexado
  const countFilterTable = Object.keys(filterTable.value).map((e) => ({
    order: filterTable.value[e].order,
  }));

  // lita cantidad de order
  const listCountOrder = countFilterTable
    .filter((e) => e.order > 0)
    .map((e) => e.order);
  // order
  const order = !listCountOrder.length ? [0] : listCountOrder;
  // maximo order de la lista
  const maxOrder = Math.max(...order);
  // agrega al order del filtro de la columna
  filterTable.value[id].order = !countActiveFilter.length ? 0 : maxOrder + 1;

  // list object filter table
  const listObjectOrderFilterTable = Object.keys(filterTable.value)
    .map((e) => ({
      order: filterTable.value[e].order,
      id: e,
      value: filterTable.value[e].value
        .filter((e: any) => e.isActive)
        .map((e: any) => e.value),
    }))
    .filter((e) => e.order > 0)
    .sort((a, b) => a.order - b.order);
  // zona header
  const reduceOrderFilterTable: any = listObjectOrderFilterTable.reduce(
    (acm, e, i) => ({ ...acm, [`${e.id}`]: i + 1 }),
    {}
  );

  headerTable.value?.map((e: any) => {
    e.isFilter = reduceOrderFilterTable[e.name] ?? false;
    e.orderFilter = reduceOrderFilterTable[e.name] ?? 0;
    return e;
  });

  let acmRowsTable: any = [...(rowsTable.value as [])];

  listObjectOrderFilterTable.forEach((eList) => {
    acmRowsTable = acmRowsTable.filter((eAcm: any) =>
      eList.value.some((es: any) => es === eAcm[eList.id])
    );
  });

  rowsFilterTable.value = [...acmRowsTable];
};

const updateModelValue = (e: string | number | null, id: string) => {
  const s =
    listFilterTable.value.length ==
    listFilterTable.value.filter((e: any) => e.isActive).length;

  listFilterTable.value.forEach((e: any) => {
    e.isActive = !s ? true : false;
  });
};

const handleEvent = (
  evt: string | number | null,
  row: object,
  index: number
) => {
  console.log('row', row);
  console.log('index', index, evt);
};

// menu context of row table
function onContextMenuForRow(e: any, item: object) {
  e.preventDefault();

  //showContenxtMenu.value = true;
}

const optionAction = (option: any) => {
  //console.log(option, 'action')
  emit('optionAction', { action: option.action, row: option.row });
};

const haveOptions = (row: any) => {
  let countOptions = 0;
  treeToArray(optionsTable.value).forEach((el) => {
    if (row[el.elementCan]) countOptions++;
  });
  console.log(optionsTable.value);

  return countOptions > 0;
};

const selectRow = (row: any) => {
  emit('selectRow', { item: row.rows, value: row.added });
};

/****************************************************************************/
/*                             COMPUTED                                     */
/****************************************************************************/
const countRowsTable = computed(() => {
  return rowsFilterTable.value?.length;
});

const hasHeaderSlot = computed(() => {
  return slots.hasOwnProperty('header');
});

const hasBodySlot = computed(() => {
  return slots.hasOwnProperty('body');
});

const hasBodyCellByColumSlot = computed(() => {
  //console.log("hasBodySlot", rows.value);
  let flag = false;
  headerTable.value?.map((e) => {
    if (slots.hasOwnProperty(`body-cell-${e.name}`)) flag = true;
    return flag;
  });
  return flag;
});

/****************************************************************************/
/*                             WATCH                                        */
/****************************************************************************/
watch(selectedTable, (v) => {
  // headerTable.value = initHeader(v)
  selectedTable.value = v;
  emit('update:selected', selectedTable.value);
  console.log(selectedTable.value);

});

watch(
  () => dProps.data,
  (v: Array<any>) => {
    //console.log(v);
    const rowsMap: Array<any> = v.map((el: object, i: number) => ({
      id: i + 1,
      ido: i + 1,
      ...el,
    }));
    rowsTable.value = rowsMap;
    rowsFilterTable.value = rowsMap;
    //console.log(rowsTable.value, rowsMap);
    initFilter(rowsTable);
    //rowsFilterTable.value = Object.freeze(rowsMap);
  }
);

watch(
  () => dProps.columns,
  (v: Array<any>) => {
    headerTable.value = initHeader(v);
    let visibleColumnsAux: any = [];
    v.filter((obj) => obj.required == false).forEach((e) => {
      visibleColumns.value.push(e);
      visibleColumnsAux.push(e.name);
    });
    headerVisibleColumns.value = visibleColumnsAux;
    headerVisibleColumnsTemp.value = visibleColumnsAux;
  }
);

watch(
  () => dProps.loading,
  (v: boolean) => {
    loadingTable.value = v;
  }
);

watch(
  () => dProps.options,
  (v: Array<OptionTable>) => {
    console.log(dProps.options);
    optionsTable.value = v;
  }
);
watch(() => Dark.isActive, val => {
  document.body.style.setProperty('--q-thead', val ? '#1D1D1D' : '#fff');
  // console.log(Dark.mode);

})
/****************************************************************************/
/*                           LIFECYCLE                                      */
/****************************************************************************/
onMounted(() => {
  headerTable.value = initHeader(dProps.columns);
  let visibleColumnsAux: any = [];
  headerTable.value
    ?.filter((obj) => obj.required == false)
    .forEach((e) => {
      visibleColumns.value.push(e);
      visibleColumnsAux.push(e.name);
    });
  headerVisibleColumns.value = visibleColumnsAux;
  headerVisibleColumnsTemp.value = visibleColumnsAux;

  rowsTable.value = dProps.data;
  rowsFilterTable.value = dProps.data.map((el, idx) => ({
    idx: idx + 1,
    ido: idx + 1,
    ...el,
  }));
  initFilter(rowsTable);
});
const backgroundThead = ref('#fff')
</script>
<style lang="sass">

$height-table: 65vh

body.body--dark .my-sticky-virtscroll-table
  border-color: rgba(255, 255, 255, 0.28)

body.body--dark .hr__space
  border-color: rgba(255, 255, 255, 0.28)

.hr__space
  border-bottom: 1px solid rgba(0, 0, 0, 0.12)

.my-sticky-virtscroll-table
  border: 1px solid rgba(0, 0, 0, 0.12)
  border-radius: 20px
  /* height or max-height is important */
  .q-table--dense
    height: 35px
  .q-table tr
    margin: 4px
    border: 1px solid #efa
  .q-table thead tr, .q-table tbody td
    height: 45px
  .q-table__top
    padding: 0px
  .q-table__bottom
    min-height: 30px
  .q-table__middle
    margin-right: 5px
    // min-height: 65vh
    height: var(--height-table)
    // max-height: 80vh
  /*.q-table__top
    background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)
    color: #fff*/
  .q-table__middle::-webkit-scrollbar
    margin-left: 5px
    width: 5px
  .q-table__middle::-webkit-scrollbar-thumb
    margin-left: 5px
    border-radius: 5px
    background-color: #ccc
  .q-table__middle::-webkit-scrollbar:horizontal
    height: 6px
  .q-table__middle::-webkit-scrollbar-thumb:horizontal
    border-radius: 5px
    background-color: #ccc
  .q-table th, .q-table td
    padding: 0px 0px 0px 16px
  thead
    position: sticky
    z-index: 100
    top: 0
    background-color: var(--q-thead)
    height: 40px !important
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    height: 40px
  thead tr:first-child th
    top: 0
    font-weight: bold
  // .q-table tbody td:before, .q-table tbody td:after
  //   background: rgb(236,235,251,0.2)
  //   margin: 4px
// COLUM STICKY
  // td:first-child
  //   /* bg color is important for td; just specify one */
  //   background-color: #00b4ff

  // tr th
  //   position: sticky
  //   /* higher than z-index for td below */
  //   z-index: 2
  //   /* bg color is important; just specify one */
  //   background: #00b4ff

  // thead tr:last-child th
  //   /* height of all previous header rows */
  //   top: 48px
  //   /* highest z-index */
  //   z-index: 3
  // thead tr:first-child th
  //   top: 0
  //   z-index: 1
  // tr:first-child th:first-child
  //   /* highest z-index */
  //   z-index: 3

  // td:first-child
  //   z-index: 1

  // td:first-child, th:first-child
  //   position: sticky
  //   left: 0

  // /* prevent scrolling behind sticky top row on focus */
  // tbody
  //   /* height of all previous header rows */
  //   scroll-margin-top: 48px

.containerx
  background: red !important
  width: 400px
  height: 400px
  border: 1px solid #eee
  border-radius: 12px
  overflow: hidden
.list
  justify-content: center
  display: flex
  flex-wrap: wrap
  padding: 24px

.filter-drawer.q-drawer-container.q-drawer:after
  z-index: 7000 !important

.q-table__container.fullscreen
  z-index: 2000 !important

</style>

<!-- <style lang="sass">
.my-sticky-custom-table
  .q-table__top, thead tr:first-child th
    //background-color: #051937 !important
  thead tr th
    position: sticky !important
    z-index: 1 !important
  thead tr:first-child th
    top: 0 !important
  /*.q-virtual-scroll__content
    height: 70vh*/


</style> -->
