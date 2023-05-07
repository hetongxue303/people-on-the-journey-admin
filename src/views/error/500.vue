<template>
    <div class="result-common">
        <el-result
            icon="error"
            title="发生错误啦"
            sub-title="服务器内部异常，请返回上一级或首页！"
        >
            <template #extra>
                <el-button type="danger" plain @click="$router.go(-1)">上一级</el-button>
                <el-button type="danger" @click="$router.replace('/index')">返回首页</el-button>
            </template>
        </el-result>
    </div>
</template>
