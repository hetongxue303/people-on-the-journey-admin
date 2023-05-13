<script setup>
import Pagination from '@components/pagination/index.vue'
import {Reload} from "@icon-park/vue-next";
import moment from "moment";
import {ElNotification} from "element-plus";
import {useTravelAgency} from "@views/journey/travel-agency/hooks/useTravelAgency.jsx";
// const dataList = ref([])
// const value = ref([])
// onMounted(() => {
//     getCascadeTreeUrl()
//         .then(({data}) => {
//             dataList.value = cloneDeep(data.data)
//         })
// })

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
    showImage,
    imageUrl,
    dialogOperate,
    getTableData,
    selectionChange,
    changeSize,
    changeCurrent,
    openDialog,
    handleBatchDelete,
    handleDelete,
    handleOperate,
    openShowImage,
    handleUploadSuccess,
    handleBeforeUpload
} = useTravelAgency()
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
            <!--            <el-cascader clearable v-model="value" :options="dataList" :props="{ expandTrigger: 'hover'}"/>-->
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
                    <!-- TODO -->
                    <el-button class="grid-button" icon="Upload" @click="ElNotification.success('待开发')"/>
                </el-tooltip>
                <el-tooltip :show-after="500" content="下载" effect="light" placement="top">
                    <!-- TODO -->
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
            <el-table-column v-if="columns[2].status" :label="columns[2].label" prop="image">
                <template #default="{row}">
                    <el-image :src="row.image" class="table-image" @click="openShowImage(row.image)"/>
                </template>
            </el-table-column>
            <el-table-column v-if="columns[3].status" :label="columns[3].label" prop="name"/>
            <el-table-column v-if="columns[4].status" :label="columns[4].label" prop="intro" show-overflow-tooltip/>
            <el-table-column v-if="columns[5].status" :label="columns[5].label">
                <template #default="{ row }">
                    {{ moment(row['createTime'])
                    .format('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column v-if="columns[6].status" :label="columns[6].label">
                <template #default="{ row }">
                    {{ moment(row['updateTime'])
                    .format('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column v-if="columns[7].status" :label="columns[7].label" align="center" width="180">
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
        v-model="showImage"
        :show-close="false"
        class="dialog-common"
        destroy-on-close
        title="查看图像"
        width="33%"
    >
        <el-image :src="imageUrl" class="table-image-show"/>
    </el-dialog>

    <el-dialog
        v-model="show"
        :close-on-click-modal="false"
        :show-close="false"
        class="dialog-common"
        :title="title"
        destroy-on-close
        width="33%"
    >
        <el-form ref="dialogRef" :model="form" :rules="dialogRules" label-width="50">
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" class="table-input"/>
            </el-form-item>
            <el-form-item label="封面" prop="image">
                <el-upload
                    :before-upload="handleBeforeUpload"
                    :on-success="handleUploadSuccess"
                    :show-file-list="false"
                    action="/api/file/upload/travel-agency"
                    class="images-upload"
                    drag
                    method="post"
                    name="file"
                >
                    <el-image v-if="form.image" :src="form.image" :title="dialogOperate!=='add'?'点击更换壁纸':undefined" class="images-box" fit="fill"/>
                    <div v-else class="images-box">
                        <el-icon :size="67" class="images-upload-icon">
                            <component is="upload-filled"/>
                        </el-icon>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </div>
                </el-upload>
            </el-form-item>
            <el-form-item label="介绍">
                <el-input v-model="form.intro" class="table-input" :rows="5" resize="none" type="textarea"/>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button text type="danger" @click="show = false">返回</el-button>
            <el-button type="primary" @click="handleOperate(dialogRef)">确认</el-button>
        </template>
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
$images-upload-width: 350px;
$images-upload-height: 200px;
:deep(.images-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
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
