<template>
    <div class="result-common">
        <el-result
            icon="warning"
            title="无权访问"
            sub-title="你没有权限访问该内容！"
        >
            <template #extra>
                <el-button type="warning" plain @click="$router.go(-1)">上一级</el-button>
                <el-button type="warning" @click="$router.replace('/index')">返回首页</el-button>
            </template>
        </el-result>
    </div>
</template>
