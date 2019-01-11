<template>
    <div class="base-tree-select">
        <div class="base-tree-select__header">
            <div class="base-tree-select__previous" @click="changeCurrentNode(currentParent.parent_id)">
                <!--<img src="../../assets/images/icons/arrow-back.svg" />-->
                <svgicon v-if="currentParent.parent_id !== null" name="arrow-back"></svgicon>
            </div>
            <div class="base-tree-select__title">
                {{ currentParent.name }}
            </div>
            <div class="base-tree-select__close" @click="close">
                <svgicon name="close"></svgicon>
            </div>
        </div>
        <ul>
            <li v-for="(item, index) in currentItems"
                :key="index"
                :class="{'selected': item.id === selectedNode}">
                <div class="base-tree-select__item-line" @click="selectNode(item.id)">
                    <svgicon name="folder2"></svgicon> {{ item.name }}
                </div>
                <div v-if="item.children.length > 0" class="base-tree-select__select-node" @click="changeCurrentNode(item.id)">
                    <svgicon name="chevron-right"></svgicon>
                </div>
            </li>
        </ul>
        <div class="base-tree-select__footer">
            <base-button-action v-show="displayMoveHere" @click="chooseItem(currentParentNode)">DEPLACER ICI</base-button-action>
            <base-button-action v-show="displayMoveToward" @click="chooseItem(selectedNode)">DEPLACER VERS</base-button-action>
            <span v-show="displayTextMove" class="text-destination">Choisir une destination</span>
        </div>
    </div>
</template>
<script>
import BaseButtonAction from './BaseButtonAction'
export default {
  components: {BaseButtonAction},
  data () {
    return {
      selectedNode: null,
      currentParentNode: 0
    }
  },
  props: {
    tree: {
      required: true,
      type: Array
    },
    initialParentNode: {
      type: Number,
      default: 0
    }
  },
  computed: {
    displayMoveHere () {
      return this.initialParentNode !== this.currentParentNode && this.selectedNode === null
    },
    displayMoveToward () {
      return this.initialParentNode !== this.selectedNode && this.selectedNode !== null
    },
    displayTextMove () {
      return !this.displayMoveHere && !this.displayMoveToward
    },
    currentItems () {
      if (this.currentParentNode === 0) {
        return this.tree[0].children.filter(elt => {
          return Array.isArray(elt.children)
        })
      } else {
        let elt = this.getElement(this.currentParentNode)
        return elt.children.filter(elt => {
          return Array.isArray(elt.children)
        })
      }
    },
    currentParent () {
      let currentItemParent = this.getElement(this.currentParentNode)
      return currentItemParent
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    selectNode (id) {
      this.selectedNode = id
    },
    chooseItem (id) {
      this.$emit('chooseItem', id)
    },
    changeCurrentNode (id) {
      if (id !== null) {
        this.currentParentNode = id
        this.selectedNode = null
      }
    },
    getElement (searchedId) {
      let o
      this.tree.some(function iter (a) {
        if (a['id'] === searchedId) {
          o = a
          return true
        }
        return Array.isArray(a.children) && a.children.some(iter)
      })
      return o
    }
  },
  created () {
    this.currentParentNode = this.initialParentNode
  }
}
</script>