<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>Position</span>
    </div>
    <div class="text item">
      sectionA - moduleB
    </div>
  </el-card>
</template>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
  margin: 20px auto;
}
</style>
