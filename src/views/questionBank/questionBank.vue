<template>
  <div>
    {{title}}
    <newHead></newHead>
    <stuFooter></stuFooter>
  </div>
</template>
<script>
import stuFooter from "../../components/stuFooter";
import newHead from "../../components/newHead";
export default {
  components: { newHead, stuFooter },
  data() {
    return {
      title: "驾考题库"
    };
  }
};
</script>
