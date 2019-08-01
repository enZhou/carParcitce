<template>
  <div class="container">
    <headerTitle title="关于我们"></headerTitle>
    <div class="about_us_info" v-for="(article,index) in ourMsg.posts" :key="index">
      <img :src="article.src" alt>
      <div>
        <h2 v-html="article.title"></h2>
        <p v-html="article.desc"></p>
      </div>
    </div>
    <!-- <stuFooter></stuFooter> -->
  </div>
</template>

<script>
import headerTitle from "../../components/headerTitle";
import stuFooter from "../../components/stuFooter"
import api from "../../api/common.js";
export default {
  components: {
    headerTitle,
    stuFooter
  },
  data() {
    return {
      ourMsg:''
    };
  },
  async created() {
    this.ourMsg=await api.aboutUsInfo();
    console.log(this.ourMsg);
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped lang="scss">
//关于我们
.about_us_info {
  width: 90%;
  margin-left: 5%;
  margin-top: 0.4rem;
  background: #fff;
  border-radius: 4px;
  img {
      display: block;
    width: 100%;
    height: 1.94rem;
    border-radius: 4px 4px 0 0;
    background: pink;
  }
  >div{
      width:100%;
      padding:.4rem;
      h2{
          font-size: .4rem;
          font-weight: 800;
          margin-bottom: .4rem;
      }
      p{
          font-size: .32rem;
          line-height: 1.4;
          margin-bottom: .2rem;
      }
  }
}
</style>
