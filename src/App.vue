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
                                        v-model="search"
                                        label="Search"
                                        placeholder="Enter a name"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        disabled
                                        :value="searchResult.length"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                        </v-col>



                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            text
                            @click="loadArr"
                            :loading="loading"
                            :disabled="loading">
                            Generate data
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

    watch: {
        search(val) {
            this.$store.dispatch('localStorage/loadSearchResult', val)
        }
    },

    computed: {
        loading() {
            return this.$store.getters['localStorage/loading']
        },
        searchResult(){
            return this.$store.getters['localStorage/searchResult']
        }
    },

    methods: {
        loadArr() {
            this.$store.dispatch('localStorage/loadArray')
        }
    }
};
</script>
