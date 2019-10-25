<template>
  <!--dragend冒泡到drag-tree-table-body节点上-->
  <div
    class="tree-block"
    :draggable="!!isdraggable"
    @dragstart="dragstart($event)"
    @dragend="dragend($event)"
  >
    <div
      class="tree-row"
      @click="toggle"
      @contextmenu.stop="contextmenu"
      :data-level="depth"
      :tree-id="model[custom_field.id]"
      :class="[model[custom_field['row-state']]]"
    >
      <column
        v-for="(subItem, subIndex) in columns"
        :class="'align-' + subItem.align"
        :field="subItem.field"
        :width="subItem.width"
        :flex="subItem.flex"
        :key="subIndex"
      >
        <span v-if="subItem.type === 'selection'">
          <space :depth="depth" />
          <span
            v-if="model[custom_field.lists] && model[custom_field.lists].length"
            class="zip-icon"
            v-bind:class="[isExpand ? 'arrow-bottom' : 'arrow-right']"
          >
          </span>
          <span v-else class="zip-icon arrow-transparent"> </span>
          <span
            v-if="subItem.formatter"
            v-html="subItem.formatter(model)"
          ></span>
          <span v-else v-html="model[subItem.field]"></span>
        </span>
        <span v-else-if="subItem.type === 'action'">
          <a
            class="action-item"
            v-for="(acItem, acIndex) in subItem.actions"
            :key="acIndex"
            type="text"
            size="small"
            @click.stop.prevent="acItem.onclick(model)"
          >
            <i :class="acItem.icon" v-html="acItem.formatter(model)"></i>
          </a>
        </span>
        <span v-else-if="subItem.type === 'checkbox'">
          <input
            type="checkbox"
            v-if="model.isShowCheckbox !== false"
            :name="model[custom_field.id]"
            v-model="model[custom_field.checked]"
            class="checkbox action-item"
            @click.stop="onCheckboxClick($event, model)"
          />
        </span>
        <span v-else>
          <span
            v-if="subItem.formatter"
            v-html="subItem.formatter(model)"
          ></span>
          <span v-else>{{ model[subItem.field] }}</span>
        </span>
      </column>
      <div class="hover-model" style="display: none">
        <div class="hover-block prev-block">
          <i class="el-icon-caret-top"></i>
        </div>
        <div class="hover-block center-block">
          <i class="el-icon-caret-right"></i>
        </div>
        <div class="hover-block next-block">
          <i class="el-icon-caret-bottom"></i>
        </div>
      </div>
    </div>
    <template v-if="isFolder">
      <row
        v-show="isExpand"
        v-for="(item, index) in model[custom_field.lists]"
        :model="item"
        :columns="columns"
        :key="index"
        :isdraggable="isdraggable"
        :depth="depth * 1 + 1"
        :custom_field="custom_field"
        :onCheck="onCheck"
        :isContainChildren="isContainChildren"
        :default-expand-keys="defaultExpandKeys"
        @row-contextmenu="
          row => {
            $emit('row-contextmenu', row);
          }
        "
        @toggle="
          (tog, toggleItem) => {
            $emit('toggle', tog, toggleItem);
          }
        "
      >
      </row>
    </template>
  </div>
</template>
<script>
import column from './column.vue';
import space from './space.vue';
export default {
  name: 'row',
  props: [
    'model',
    'depth',
    'columns',
    'isdraggable',
    'custom_field',
    'onCheck',
    'isContainChildren',
    'defaultExpandKeys'
  ],
  data() {
    return {
      open: false,
      visibility: 'visible'
    };
  },
  components: {
    column,
    space
  },
  computed: {
    isFolder() {
      return (
        this.model[this.custom_field.lists] &&
        this.model[this.custom_field.lists].length
      );
    },
    isExpand() {
      for (let i = 0; i < this.defaultExpandKeys.length; i++) {
        if (this.defaultExpandKeys[i] === this.model[this.custom_field.id]) {
          return true;
        }
      }
      return this.model[this.custom_field.open];
    }
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.model[this.custom_field.open] = !this.model[
          this.custom_field.open
        ];
        this.$forceUpdate();
        this.$emit('toggle', this.model[this.custom_field.open], this.model);
      }
    },
    dragstart(e) {
      // if (navigator.userAgent.indexOf('Firefox') >= 0) {
      //     // Firefox drag have a bug
      //     e.dataTransfer.setData('Text', this.id);
      // }
      window.dragId = e.target.children[0].getAttribute('tree-id');
      window.dragParentNode = e.target;
      e.target.style.opacity = 0.2;
    },
    dragend(e) {
      e.target.style.opacity = 1;
    },
    setAllCheckData(curList, flag) {
      const listKey = this.custom_field.lists;
      for (let i = 0; i < curList.length; i++) {
        var item = curList[i];
        this.$set(item, 'checked', flag);
        if (item[listKey] && item[listKey].length) {
          this.setAllCheckData(item[listKey], flag);
        }
      }
    },
    onCheckboxClick(evt, model) {
      const list = model[this.custom_field.lists];
      // 判断是否有子节点，如有需递归处理
      if (list && this.isContainChildren) {
        this.setAllCheckData(
          model[this.custom_field.lists] || [],
          !!evt.target.checked
        );
      } else {
        this.$set(model, 'checked', !!evt.target.checked);
      }
      this.onCheck && this.onCheck();
    },

    contextmenu() {
      this.$emit('row-contextmenu', this.model);
    },
    dragover(e) {
      e.preventDefault();
    },
    /**
     * 元素拖动到目标元素
     * @param e
     */
    drop(e) {
      if (e) console.log(e.dataTransfer.getData('DragTreeTableOutDropData'));
    }
  }
};
</script>
<style lang="css">
.tree-block{
  width: 100%;
  background: rgba(255,255,255,0.8)
}
.tree-row{
    position: relative;
    display: flex;
    padding: 10px 10px;
    border-bottom: 1px solid #eee;
}
.tree-row:hover{
     background: #ecf5ff
 }
.tree-row .align-left{
    text-align: left;
}
.tree-row .align-right{
    text-align: right;
}
.tree-row .align-center{
    text-align: center;
}
.hover-model{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.6);
}
.hover-block{
    display: flex;
    opacity: 0.1;
    transition: opacity 0.5s;
    justify-content: center;
    align-items: center;
}
.hover-block i{
    color: #FFF;
}
.prev-block{
    height: 25%;
    background: #a0c8f7;
}
.center-block{
    height: 50%;
    background: #a0c8f7;
}
.next-block{
    height: 25%;
    background: #a0c8f7;
}
.action-item{
    color: #409eff;
    cursor: pointer;

}
.action-item i{
    font-style: normal;
}
.zip-icon{
    display: inline-block;
    width: 8px;
    height: 8px;
    vertical-align: middle;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAf0lEQVQ4T7XT0Q2AMAhF0dvNdALdSEdzBB3BDXQD85LGRNMCauS7nAKBxMdIhfwemIAtYpeAEeiANoLUgAGYI4gFqAMX8QAXiQBCNFDNRBVdIgpUkSfADjT3KqLACmg/XrWw5J+Li+VVYCZrMBbgJluA+tXA3Hv45ZgiR3i+OQBeSyYRPEyeUAAAAABJRU5ErkJggg==') no-repeat center;
    background-size: cover;
}
.arrow-transparent{
    visibility: hidden;
}
.arrow-right{

}
.arrow-bottom{
    transform: rotate(90deg)
}
[draggable=true] {
  -khtml-user-drag: element;
}
</style>
