<!-- 答题底部 收藏错题等 -->
<template>
  <div class="footer">
    <div class="question_bottom">
      <div class="option left">
        <div class="submit f-c-2AC782" v-if="submit === true">
          <span class="iconfont f-c-2AC782">&#xe614;</span>
          交卷
        </div>
        <div class="del" v-if="del === true">
          <span class="iconfont">&#xe606;</span>
          移除
        </div>

        <div class="uncollected" v-if="uncollected === true">
          <span class="iconfont">&#xe616;</span>
          收藏
        </div>
        <div class="collected" v-if="collected === true">
          <span class="iconfont">&#xe654;</span>
          已收藏
        </div>
      </div>
      <div class="option right">
        <div class="correct f-c-2AC782">
          <span class="iconfont f-s-12 f-c-2AC782">&#xe634;</span>
          1
        </div>
        <div class="error f-c-FB6E52">
          <span class="iconfont f-s-12 f-c-FB6E52">&#xe61b;</span>
          1
        </div>
        <div class="menu" @click="lookMenu">
          <span class="iconfont ">&#xe685;</span>

          1/22
        </div>
      </div>
    </div>
    <div class="mask" v-if="showOrHideMenu === true" @click="displayMenu"></div>
    <div class="questionlist" v-if="showOrHideMenu === true">
      <ul>
        <li>
          <div class="item yes">1</div>
        </li>
        <li>
          <div class="item no">1</div>
        </li>
        <li>
          <div class="item">1</div>
        </li>
        <li>
          <div class="item">1</div>
        </li>
        <li>
          <div class="item">1</div>
        </li>
        <li>
          <div class="item">1</div>
        </li>
        <li>
          <div class="item">1</div>
        </li>
        <li>
          <div class="item">1</div>
        </li>
        <li>
          <div class="item">1</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showOrHideMenu: false
    };
  },
  props: {
    submit: {
      type: Boolean,
      default: false
    },
    del: {
      type: Boolean,
      default: false
    },
    uncollected: {
      type: Boolean,
      default: false
    },
    collected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    lookMenu() {
      let self = this;
      if (self.showOrHideMenu == true) {
        self.showOrHideMenu = false;
      } else {
        self.showOrHideMenu = true;
      }
    },
    displayMenu() {
      let self = this;
      self.showOrHideMenu = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.question_bottom {
  width: 100%;
  height: 1rem;
  background-color: #f7f7f9;
  border-top: 1px solid #e1e0e0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  padding: 0 0.2rem;
  .option {
    width: 40%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }
}
.f-c-2AC782 {
  color: #2ac782;
}
.f-c-FB6E52 {
  color: #fb6e52;
}
.f-s-12 {
  font-size: 0.24rem;
}
.mask {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.questionlist {
  width: 100%;
  min-height: 75vh;
  background-color: #fff;
  ul {
    width: 100%;
    max-height: 75vh;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 0.2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    li {
      width: 16.6%;
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      .item {
        width: 0.8rem;
        height: 0.8rem;
        line-height: 0.8rem;
        border-radius: 0.8rem;
        text-align: center;
        border: 1px solid #b5b5b5;
        color: #666666;
      }
      .yes {
        background-color: #24c27d;
        border: 1px solid #24c27d;
        color: #fff;
      }
      .no {
        background-color: #fb6e52;
        border: 1px solid #fb6e52;
        color: #fff;
      }
    }
  }
}
</style>
