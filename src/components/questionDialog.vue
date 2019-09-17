<!-- 弹窗 -->
<template>
  <div class="dialog">
    <div class="dialog-cover back" v-if="isShow" @click="close"></div>
    <div class="dialog-content" :style="{
        width: dialogWidth + '%'
      }" v-if="isShow">
      <div class="content">
        <div class="dialog_head back">
          <!--弹窗头部 title-->
          {{ title }}
        </div>
        <div class="dialog_main">
          <!--弹窗的内容-->
          {{ content }}
        </div>
      </div>
      <!--弹窗关闭按钮-->
      <div class="foot">
        <div class="btn close" @click="close" v-if="showClose">{{ closeBtnName }}</div>
        <div class="btn ok" @click="OK">{{ okBtnName }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isShow: {
      //弹窗组件是否显示 默认不显示
      type: Boolean,
      default: false,
      required: true //必须
    },
    dialogWidth: {
      //弹窗内容宽度
      type: Number,
      default: 90
    },
    title: {
      // 弹窗标题
      type: String,
      default: ""
    },
    content: {
      // 弹窗内容
      type: String,
      required: true,
      default: ""
    },
    okBtnName: {
      // 确认按钮名称
      type: String,
      default: "确认"
    },
    closeBtnName: {
      // 关闭按钮名称
      type: String,
      default: "取消"
    },
    showClose: {
      // 是否显示关闭按钮
      type: Boolean,
      default: true
    }
  },
  methods: {
    //  关闭事件
    close: function() {
      let self = this;
      self.$emit("closeClk");
    },
    // 确定事件
    OK: function() {
      let self = this;
      self.$emit("okClk");
    }
  }
};
</script>
<style lang="scss" scoped>
.dialog {
  position: relative;
}
.dialog-cover {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.dialog-content {
  position: fixed;
  border-radius: 2px;
  z-index: 300;
  background-color: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 0.5rem;
  .content {
    width: 100%;
    padding: 0.4rem;
  }
  .dialog_head {
    color: #333;
    font-size: 0.4rem;
    font-weight: 600;
    margin-bottom: 0.4rem;
  }
  .dialog_main {
    color: #6c6c6c;
    font-size: 0.36rem;
  }
  .foot {
    width: 100%;
    height: 1rem;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    border-top: 1px solid #f1f1f1;
    .btn {
      width: 50%;
      height: 100%;
      text-align: center;
      line-height: 1rem;
      font-size: 0.4rem;
      font-weight: 600;
      border-right: 1px solid #f1f1f1;
    }
    .ok {
      color: #1b82d1;
      border-right: none;
    }
  }
}
</style>