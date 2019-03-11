<template>
  <tr class="list-item table-active">
    <th scope="col">#</th>
    <th scope="col">Preview</th>
    <th scope="col">Name</th>
    <th scope="col" v-if="selectedVideos.length>1"> <SelectedFilesHeadInfo/> </th>
    <th scope="col" v-else> Info </th>
    <th scope="col">Comment</th>
    <th scope="col">

      <b-button-group> 
        <b-dropdown text="Actions">
          <b-dropdown-item 
              @click="removeAll"
              v-b-tooltip.hover.left title="Remove selected videos from the list"
              ><i class="fa fa-trash-alt"></i>  {{removeAllText}} ({{all_count}})
          </b-dropdown-item>
          <b-dropdown-divider/>
          <b-dropdown-item v-if="all_valid_count" 
                          v-b-tooltip.hover.left :title="sendAllTitle"
                           @click="sendAllHandler">
                            <i class="fas fa-upload"></i>
                           {{sendAllText}} 
          </b-dropdown-item>
        </b-dropdown>
      </b-button-group>

    </th>
  </tr>
</template>


<script>
import { mapMutations, mapState } from "vuex";
import { filters, selectedFilesCounts} from "@/mixins.js";
import SelectedFilesHeadInfo from './SelectedFilesHeadInfo'

export default {
  name: "Selected-Files-Head",
  components: {SelectedFilesHeadInfo},
  props: {},
  mixins: [filters, selectedFilesCounts],
  data() {return {};},
  methods: {},
  watch: {},
  computed: {
    ...mapState([
      'selectedVideos'      
    ])
  }
};
</script>
 
<style lang="scss" scoped>
</style>
