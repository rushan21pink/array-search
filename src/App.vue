<template>
    <v-app>

        <v-container>
            <v-dialog v-model="dialog" width="500">
                <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                        Search elements
                    </v-card-title>


                        <v-col cols="12"
                               sm="12"
                               md="12">
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        :disabled="loading"
                                        v-model="search"
                                        label="Search"
                                        placeholder="Enter a name"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="6">
                                    <v-text-field
                                        disabled
                                        :value="searchValue"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                        </v-col>



                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            :color="colorBtn"
                            text
                            @click="loadArray"
                            :loading="loading"
                            :disabled="loading">
                            {{showBtn ? 'Generate data' : 'data generated'}}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </v-app>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'App',

    components: {},

    data: () => ({
        dialog: true,
        search: '',
    }),

    watch:{
      search(val, oldVal){
          if(!!oldVal && val.includes(oldVal))
              this.getSearchByOldValue(val)
          else
            this.getSearchResult(val)
      }
    },

    computed: {
        ...mapGetters('localStorage', ['loading', 'searchResult', 'loadingSearch', 'showBtn']),

        searchValue(){
            return this.loadingSearch ? 'Loading...' : this.searchResult.length
        },

        colorBtn(){
            return this.showBtn ? 'primary' : 'success'
        }

    },

    methods: {
        ...mapActions('localStorage', ['loadArray', 'getSearchByOldValue', 'getSearchResult']),
    }
};
</script>
