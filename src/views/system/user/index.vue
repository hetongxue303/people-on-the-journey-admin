<script setup>
import Pagination from '@components/pagination/index.vue'
import {Reload} from "@icon-park/vue-next";
import moment from "moment";
import {ElNotification} from "element-plus";
import {useUser} from "@views/system/user/hooks/useUser.jsx";

const {
    search,
    disable,
    loading,
    total,
    tableData,
    form,
    show,
    dialogRules,
    title,
    dialogRef,
    columns,
    imageUrl,
    showImage,
    dialogOperate,
    getTableData,
    selectionChange,
    changeSize,
    changeCurrent,
    openDialog,
    handleBatchDelete,
    handleDelete,
    handleOperate,
    handleUploadSuccess,
    handleBeforeUpload,
    openShowImage
} = useUser()
</script>

<template>
    <el-card :style="{ borderRadius: '10px' }">
        <el-row :gutter="5">
            <el-col :span="4">
                <el-input v-model="search.keywords" clearable placeholder="输入名称搜索" @clear="search.keywords = undefined"/>
            </el-col>
            <el-col :span="16">
                <el-button type="warning">查询</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="20">
                <el-button type="success" @click="openDialog('add')">新增</el-button>
                <el-button :disabled="disable" type="danger" @click="handleBatchDelete">
                    批量删除
                </el-button>
            </el-col>
            <el-col :span="4">
                <el-tooltip :show-after="500" content="上传" effect="light" placement="top">
                    <!--TODO-->
                    <el-button class="grid-button" icon="Upload" @click="ElNotification.success('待开发')"/>
                </el-tooltip>
                <el-tooltip :show-after="500" content="下载" effect="light" placement="top">
                    <!--TODO-->
                    <el-button class="grid-button" icon="Download" @click="ElNotification.success('待开发')"/>
                </el-tooltip>
                <el-tooltip :show-after="500" content="刷新" effect="light" placement="top">
                    <el-button class="grid-button" icon="Refresh" @click="getTableData"/>
                </el-tooltip>
                <el-popover :width="80" placement="bottom" title="筛选列" trigger="click">
                    <template v-for="item in columns" :key="item">
                        <el-checkbox v-model="item.status" :label="item.label"/>
                    </template>
                    <template #reference>
                        <el-button class="grid-button" icon="Grid"/>
                    </template>
                </el-popover>
            </el-col>
        </el-row>
        <el-table
            :key="Reload"
            v-loading="loading"
            :data="tableData"
            :header-row-style="{ color: '#575656' }"
            empty-text="暂无数据"
            highlight-current-row
            tooltip-effect="light"
            @selection-change="selectionChange"
        >
            <el-table-column align="center" type="selection" width="30"/>
            <el-table-column v-if="columns[1].status" :label="columns[1].label" prop="id"/>
            <el-table-column v-if="columns[2].status" :label="columns[2].label">
                <template #default="{row}">
                    <el-image :src="row.userinfo.avatar" class="table-image" @click="openShowImage(row.userinfo.avatar)"/>
                </template>
            </el-table-column>
            <el-table-column v-if="columns[3].status" :label="columns[3].label" prop="username"/>
            <el-table-column v-if="columns[4].status" :label="columns[4].label">
                <template #default="{row}">
                    <span v-if="row.userinfo.gender===1">男</span>
                    <span v-else-if="row.userinfo.gender===2">女</span>
                    <span v-else>保密</span>
                </template>
            </el-table-column>
            <el-table-column v-if="columns[5].status" :label="columns[5].label" show-overflow-tooltip prop="userinfo.email"/>
            <el-table-column v-if="columns[6].status" :label="columns[6].label">
                <template #default="{ row }">
                    {{ moment(row['createTime'])
                    .format('YYYY-MM-DD') }}
                </template>
            </el-table-column>
            <el-table-column v-if="columns[7].status" :label="columns[7].label">
                <template #default="{ row }">
                    {{ moment(row['updateTime'])
                    .format('YYYY-MM-DD') }}
                </template>
            </el-table-column>
            <el-table-column v-if="columns[8].status" :label="columns[8].label" align="center" width="180">
                <template #default="{ row }">
                    <el-button type="primary" @click="openDialog('edit',row)">编辑</el-button>
                    <el-popconfirm title="确认删除本条记录吗？" @confirm="handleDelete(row.id)">
                        <template #reference>
                            <el-button type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <Pagination
            :current="search.current"
            :size="search.size"
            :total="total"
            class="pagination"
            @change-current="changeCurrent"
            @change-size="changeSize"
        />
    </el-card>

    <el-dialog
        v-model="show"
        :close-on-click-modal="false"
        :show-close="false"
        class="dialog-common"
        :title="title"
        destroy-on-close
        width="30%"
    >
        <el-form ref="dialogRef" :model="form" :rules="dialogRules" label-width="70">
            <el-form-item label="头像" prop="avatar">
                <el-upload
                    :before-upload="handleBeforeUpload"
                    :on-success="handleUploadSuccess"
                    :show-file-list="false"
                    action="/api/file/upload/avatar"
                    class="images-upload"
                    drag
                    method="post"
                    name="file"
                >
                    <el-image v-if="form.userinfo.avatar" :src="form.userinfo.avatar" class="images-box" fit="fill" title="点击更换头像"/>
                    <div v-else class="images-box">
                        <el-icon :size="50" class="images-upload-icon">
                            <component is="upload-filled"/>
                        </el-icon>
                        <div class="el-upload__text" style="font-size: 10px">将文件拖到此处，或<em>点击上传</em></div>
                    </div>
                </el-upload>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" :disabled="dialogOperate==='edit'"/>
            </el-form-item>
            <el-form-item label="密码" prop="password" v-if="dialogOperate==='add'">
                <el-input v-model="form.password" placeholder="默认：123456" show-password/>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="form.userinfo['nickname']"/>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="form.userinfo.gender">
                    <el-radio-button label="1">男</el-radio-button>
                    <el-radio-button label="2">女</el-radio-button>
                    <el-radio-button label="3">保密</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.userinfo.email"/>
            </el-form-item>
            <el-form-item label="介绍">
                <el-input v-model="form.userinfo.intro" :rows="3" resize="none" type="textarea"/>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button text type="danger" @click="show = false">返回</el-button>
            <el-button type="primary" @click="handleOperate(dialogRef)">确认</el-button>
        </template>
    </el-dialog>

    <el-dialog
        v-model="showImage"
        :show-close="false"
        class="dialog-common"
        destroy-on-close
        title="查看图像"
        width="33%"
    >
        <el-image :src="imageUrl" class="table-image-show"/>
    </el-dialog>
</template>

<style lang="scss" scoped>
:deep(.el-button.grid-button) {
    @apply rounded-none;
    border: 0.1px solid #dcdfe6;
    transition: all ease-in-out 0.5s;

    &:hover {
        color: #000000;
        background-color: rgb(222, 223, 224);
    }
}

// 去除按钮间距
:deep(.el-button.grid-button + .el-button) {
    @apply ml-0;
}

.pagination {
    @apply flex justify-center mt-8;
}

:deep(.el-row) {
    @apply mb-20px;
}

// image
$images-upload-width: 200px;
$images-upload-height: 200px;
:deep(.images-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    width: $images-upload-width;
    height: $images-upload-height;

    &:hover {
        border-color: var(--el-color-primary);
    }
}

:deep(.el-upload-dragger) {
    padding: 0;
}

.images-upload-icon {
    color: #8c939d;
    text-align: center;
}

.images-box {
    width: $images-upload-width;
    height: $images-upload-height;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
