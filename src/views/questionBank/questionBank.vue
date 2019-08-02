<template>
  <div>
    {{ title }}
    <!-- 答题/背题模式切换 -->
    <commonNav :active="active" :showType="showType" @changeModal="changeType">
      <template slot="content">
        <div v-show="active === 'answer'">
          答题模式内容
        </div>
        <div v-show="active === 'recite'">
          背题模式内容
        </div>
      </template>
    </commonNav>

    <newHead></newHead>
    <stuFooter></stuFooter>
  </div>
</template>
<script>
import stuFooter from "../../components/stuFooter";
import newHead from "../../components/newHead";
import commonNav from "../../components/commonNav.vue";
export default {
  components: { newHead, stuFooter, commonNav },
  data() {
    return {
      title: "驾考题库",
      active: "answer",//默认答题模式
      showType:'tab'
    };
  },
  methods: {
    // 选择模式
    changeType(val) {
      let self = this;
      self.active = val;
    }
  }
};
</script>
