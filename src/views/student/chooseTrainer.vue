<template>
  <div class="container">
    <!-- 标题 -->
    <headerTitle title="选择教练"></headerTitle>
    <!-- 搜索框 -->
    <div class="condition-search">
      <div class="search_input">
        <input v-model="requestParams.name" type="text" @input.lazy="getList" placeholder="请输入教练名称" />
      </div>
      <ul class="choose-type">
        <li v-for="(type,index) in typeList" :key="index" @click="chooseConditon(index)">
          {{type}}
          <i class="tringle" :class="{'active':typeActiveId==index&&isShowConditon}"></i>
        </li>
      </ul>
      <div class="condition-list" v-show="isShowConditon">
        <ul v-if="typeActiveId==0">
          <li
            class="text-center"
            v-for="(city,index) in cityList"
            :key="index"
            @click="clickConItem(typeActiveId,city)"
          >{{city}}</li>
        </ul>
        <ul v-if="typeActiveId==1">
          <li
            class="text-center"
            v-for="(county,index) in countyList"
            :key="index"
            @click="clickConItem(typeActiveId,county)"
          >{{county}}</li>
        </ul>
        <div v-if="typeActiveId==2" class="price-range">
          <div>
            <input type="text" placeholder="起始价格" maxlength="4" v-model="min_price" />
            <i style="display:inline-block;margin:0 5px;color:#666;">—</i>
            <input type="text" placeholder="结束价格" maxlength="4" v-model="max_price" />
            <button class="price-btn" @click="searchPrice">确定</button>
          </div>
        </div>
        <ul v-if="typeActiveId==3">
          <li
            class="text-center"
            v-for="(gender,index) in genderList"
            :key="index"
            @click="clickConItem(typeActiveId,gender)"
          >{{gender}}</li>
        </ul>
      </div>
    </div>

    <!-- 教练列表 -->
    <ul class="trainer_list">
      <li
        class="trainer_item flex_between"
        v-for="(trainer,index) in trainerList.members"
        :key="index"
        @click="goToTrainerDetail(trainer.id)"
      >
        <img v-if="trainer.avatar" :src="trainer.avatar | imgContact" alt />
        <img v-else src="../../assets/img/default_avatar.jpg" alt />
        <ul class="trainer_info">
          <li class="flex_between" style="margin-bottom:.1rem;">
            <strong>{{trainer.name}}</strong>
            <span class="learn_more">了解更多&nbsp;&gt;</span>
          </li>
          <li>编号:{{trainer.teach_code}}</li>
          <li class="flex_between">
            <span style="width:2.6rem;" class="ellipsis">区域：{{trainer.teach_area?trainer.teach_area:'暂无'}}</span>
            <span>
              报价：
              <b style="color:#F1594B;">
                <i
                  v-if="trainer.teach_price!='未报价'"
                  style="color:#F1594B;font-weight:800;position:relative;right:-5px;"
                >￥</i>
                {{trainer.teach_price=='未报价'?'未报价':Math.round(trainer.teach_price)}}
              </b>
            </span>
          </li>
          <li class="flex_between">
            <div>
              <p style="margin-bottom: .04rem;">性别：{{trainer.sex}}</p>
              <p>
                评分：
                <b style="color:#118EEA;">
                  {{trainer.number=='无评分'?90:trainer.number}}
                  <i
                    style="color:#118EEA;font-weight:800;"
                  >分</i>
                </b>
              </p>
            </div>
            <button class="order_btn">立即预约</button>
          </li>
        </ul>
      </li>
      <li class="no_more">已经没有更多了~</li>
    </ul>
    <stuFooter></stuFooter>
  </div>
</template>

<script>
import headerTitle from "../../components/headerTitle";
import stuFooter from "../../components/stuFooter";
import api from "../../api/common.js";
export default {
  components: {
    headerTitle,
    stuFooter
  },
  data() {
    return {
      trainerList: "",
      typeList: ["城市", "县市区", "价格", "性别"],
      typeActiveId: 0, //类型激活id
      isShowConditon: false, //是否展示选择列表
      cityList: ["全部", "昆明市"],
      countyList: [
        "全部",
        "全城",
        "市区",
        "五华区",
        "盘龙区",
        "盘龙区",
        "官渡区",
        "西山区",
        "呈贡区"
      ],
      genderList: ["全部", "男", "女"],
      countNum: 0, //
      min_price:"",
      max_price:"",
      requestParams: {
        name: "", //教练名称
        phone: "", //教练电话号码
        code: "", //教练代码
        city_name: "", // 市名
        area_name: "", //区名
        min_price: "", //最小金额
        max_price: "", //最大金额
        sex: "" //性别
      }
    };
  },
  created() {
    //获取教练列表
    this.getList();
  },
  watch: {
    requestParams: {
      deep: true,
      handler(newVal, oldVal) {
        this.getList(newVal);
      }
    }
  },
  methods: {
    //获取教练列表
    getTrainerList(curNum, params) {
      return new Promise((resolve, reject) => {
        api.getTrainerList(params).then(res => {
          resolve({
            records: res,
            curNum: curNum
          });
        });
      });
    },
    //获取教练列表
    async getList(params) {
      this.countNum++;
      let obj = { ...params };
      if (obj.city_name == "全部") obj.city_name = "";
      if (obj.area_name == "全部") obj.area_name = "";
      if (obj.sex == "全部") obj.sex = "";
      this.getTrainerList(this.countNum, obj).then(res => {
        console.log(res);
        if (res.curNum == this.countNum) {
          this.trainerList = res.records;
          console.log(this.trainerList);
        }
      });
      // this.trainerList = await api.getTrainerList(this.requestParams);
      // console.log(this.trainerList);
    },
    //判断改展示哪一项条件
    chooseConditon(id) {
      console.log(this.typeActiveId, id);
      if (this.typeActiveId == id) {
        //如果第一次和第二次点击的是同一地方
        this.isShowConditon = !this.isShowConditon;
      } else {
        this.isShowConditon = true;
      }
      this.typeActiveId = id;
    },
    //搜索价格
    searchPrice(){
      this.isShowConditon=false;
      this.requestParams.min_price=this.min_price;
      this.requestParams.max_price=this.max_price;
    },
    //点击选项条件item
    clickConItem(id, name) {
      this.typeList[id] = name;
      switch (id) {
        case 0:
          this.requestParams.city_name = name;
          break;
        case 1:
          this.requestParams.area_name = name;
          break;
        case 3:
          this.requestParams.sex = name;
          break;
      }
      this.isShowConditon = false;
    },
    //跳转教练详情
    goToTrainerDetail(id) {
      if (localStorage.getItem("stuMobile"))
        this.$router.push(`/trainerDetail?id=${id}`);
      else {
        this.$toast("无浏览权限，请登录！！！");
        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
      }
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.search_input {
  width: 100%;
  padding: 0.2rem 0.24rem;
  input {
    width: 100%;
    flex: 1;
    line-height: 0.8rem;
    border: 1px solid #eee;
    border-radius: 0.4rem;
    padding-left: 0.8rem;
    background: url("../../assets/img/search.png") no-repeat 10px center #fff;
    background-size: 0.4rem;
    font-size: 0.3rem;
  }
}
//类型选择
.choose-type {
  width: 100%;
  display: flex;
  background: #fff;
  border-bottom: 1px solid #eee;
  li {
    flex: 1;
    text-align: center;
    line-height: 0.8rem;
    position: relative;
    &:not(:last-child)::after {
      content: "";
      display: block;
      width: 1px;
      height: 0.6rem;
      background: #ddd;
      position: absolute;
      right: 0;
      top: 0.1rem;
    }
    &.active {
      color: $color_red;
    }
    .tringle {
      display: inline-block;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-top-color: #999;
      position: relative;
      top: 3px;
      left: 5px;
      &.active {
        transform: rotate(180deg);
        border-top-color: $color_red;
        top: -3px;
      }
    }
  }
}
//选择的列表
.condition-list {
  width: 100%;
  position: absolute;
  top: 3rem;
  left: 0;
  z-index: 999;
  ul {
    background: #fff;
  }
  li {
    line-height: 0.8rem;
    &.pd-left {
      padding-left: 0.8rem;
    }
    &.pd-righ {
      padding-right: 0.8rem;
    }
    &.text-center {
      text-align: center;
    }
    &:not(:last-child) {
      border-bottom: 1px solid #eee;
    }
  }
  // 价格区间
  .price-range {
    background: #fff;
    width: 100%;
    min-height: 1.4rem;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 0.5rem;
      input {
        display: inline-block;
        width: 2rem;
        height: 0.7rem;
        border-radius: 0.08rem;
        border: 1px solid #ddd;
        padding-left: 0.3rem;
      }
    }
    .price-btn {
      width: 1.4rem;
      line-height: 0.7rem;
      text-align: center;
      background: $color_red;
      color: #fff;
      font-size: 0.24rem;
      border-radius: 4px;
      margin: 0.3rem;
      // width: 92%;
    }
  }
}
//教练列表
.trainer_list {
  width: 100%;
  height: calc(100vh - 3rem);
  background: #fff;
  padding-left: 0.3rem;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 1rem;
  .trainer_item {
    padding: 0.34rem 0.3rem;
    padding-left: 0;
    border-bottom: 1px solid #eee;
    li,
    span,
    p {
      color: #b3b3b3;
      font-size: 0.24rem;
    }
    > img {
      width: 1.8rem;
      height: 2rem;
      border-radius: 4px;
      background: gray;
    }
    .trainer_info {
      flex: 1;
      padding-left: 0.3rem;
      li {
        margin-bottom: 0.04rem;
      }
      strong {
        font-size: 0.34rem;
      }
      .learn_more {
        font-size: 0.24rem;
        color: $color-blue;
        align-self: flex-end;
      }
      .order_btn {
        width: 2.12rem;
        @include lh(0.6rem);
        border-radius: 4px;
        font-size: 0.3rem;
        background: $color_red;
        color: #fff;
      }
    }
  }
}
</style>
