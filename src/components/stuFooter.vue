<template>
  <ul class="stu_footer">
    <li v-for="(tab,index) in stuTabs" :key="index" :class="{'active':tabActiveId==index}">
      <router-link :to="tab.path">{{tab.name}}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tabActiveId: 0, //tab激活id
      stuTabs: [
        {
          name: "选择教练",
          path: "/chooseTrainer"
        },
        {
          name: "个人中心",
          path: "/ownCenter"
        },
        {
          name: "关于我们",
          path: "/aboutUs"
        },
        {
          name: "驾考题库",
          path: "/questionBank"
        }
      ]
    };
  },
  created() {
    this.stuTabs.forEach((el, index) => {
      if (el.path == this.$route.path) {
        console.log(this.$route.path);
        if (
          (this.$route.path == "/ownCenter" || this.$route.path == "/questionBank") &&
          !localStorage.getItem("stuMobile")
        ) {
          this.$toast("无浏览权限，请登录！！！");
          this.$router.push("/login");
          return false;
        } else this.tabActiveId = index;
      }
    });
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped lang="scss">
.stu_footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  border-top: 1px solid #eee;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  background: #fff;
  height: 1rem;
  display: flex;
  align-items: center;
  li {
    flex: 1;
    height: inherit;
    text-align: center;
    a {
      display: inline-block;
      line-height: 1rem;
      width: 100%;
      height: inherit;
      font-size: 0.3rem;
    }
    &.active {
      a {
        color: $color_blue;
      }
    }
  }
}
</style>
