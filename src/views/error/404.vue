<template>
    <div class="result-common">
        <el-result
            icon="info"
            title="页面不存在"
            sub-title="好像又在陌生的地方迷路了！"
        >
            <template #extra>
                <el-button type="primary" plain @click="$router.go(-1)">上一级</el-button>
                <el-button type="primary" @click="$router.replace('/index')">返回首页</el-button>
            </template>
        </el-result>
    </div>
</template>
