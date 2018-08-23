<template>
<section>
  <div class="container">
    <div class="columns">
      <div class="column">
        <b-field>
          <b-upload v-model="dropFiles" type="file" multiple drag-drop @input="preview" v-bind:loading="uploadstate">
            <section class="section">
              <div class="content has-text-centered">
                <p>
                  <b-icon icon="upload" size="is-large">
                  </b-icon>
                </p>
                <p>Drop your files here or click to upload</p>
              </div>
            </section>
          </b-upload>
        </b-field>

        <div class="tags">
          <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary">
                  {{file.name}}
                  <button class="delete is-small"
                      type="button"
                      @click="deleteDropFile(index)">
                  </button>
              </span>
        </div>
      </div>
      <div class="column">{{filecontent}}</div>
    </div>
  </div>
</section>
</template>

<script>
/* eslint-disable */
import store from '../store'
import async from 'async'
import {
  mapState
} from 'vuex'

export default {
  store,
  data() {
    return {
      dropFiles: [],
      uploadstate: false
    }
  },
  computed: mapState([
    'filecontent'
  ]),
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1)
      store.commit('updateState', '')
    },
    readUploadedFileAsText(inputFile) {
      const temporaryFileReader = new FileReader();
      return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
          temporaryFileReader.abort();
          reject(new DOMException("Problem parsing input file."));
        };
        temporaryFileReader.onload = () => {
          resolve(temporaryFileReader.result);
        };
        temporaryFileReader.readAsText(inputFile);
      });
    },
    async preview() {
     // can only upload one at a time
     if (this.dropFiles[1]){
      this.deleteDropFile(0)
     }
     const file = this.dropFiles[0]
      this.uploadstate = true
      try {
        const fileContents = await this.readUploadedFileAsText(file)
        store.commit('updateState', fileContents)
        this.uploadstate = false
      } catch (e) {
        console.warn(e.message)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.columns {
    height: 330px;
    margin:2em;
    .column {
        border: 1px solid #888;
        border-radius: 0.3em;
        height: 100%;
        overflow: auto;
    }
}
</style>
