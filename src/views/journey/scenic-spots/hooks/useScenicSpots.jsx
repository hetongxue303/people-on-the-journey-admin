import {onMounted, reactive, ref, watch} from "vue";
import {
    addScenicSpotsUrl,
    batchDeleteScenicSpotsUrl,
    deleteScenicSpotsUrl,
    getScenicSpotsListUrl,
    updateScenicSpotsUrl
} from "@/api/scenicSpots.js";
import {clone, cloneDeep} from "lodash-es";
import {delayRequest} from "@utils/common.js";
import {ElNotification} from "element-plus";
import {confirmBox} from "@utils/element.js";

export function useScenicSpots() {
    const tableData = ref([])
    const total = ref(0)
    const loading = ref(false)
    const selection = ref([])
    const search = reactive({current: 1, size: 10, keywords: undefined})
    const disable = ref(true)
    const columns = ref([
        {label: '全选', status: false},
        {label: 'ID', status: false},
        {label: '封面', status: true},
        {label: '名称', status: true},
        {label: '介绍', status: true},
        {label: '创建时间', status: true},
        {label: '更新时间', status: false},
        {label: '操作', status: true}
    ])
    const result = (data, dialog) => {
        if (data.code === 200) {
            ElNotification.success('成功')
            getTableData()
            if (dialog) show.value = false
            return
        }
        ElNotification.error('失败')
    }
    const getScenicSpotsList = () => {
        getScenicSpotsListUrl(search)
            .then(({data}) => {
                if (data.code === 200) {
                    tableData.value = cloneDeep(data.data["records"])
                    total.value = clone(data.data.total)
                }
            })
            .finally(() => loading.value = false)
    }
    const getTableData = () => {
        loading.value = true
        delayRequest(() => getScenicSpotsList(), 5, 500)
    }
    const add = (value) => {
        addScenicSpotsUrl(value)
            .then(({data}) => result(data, true))
            .catch(({response}) => ElNotification.error(response.data.message))
    }
    const update = (value) => {
        updateScenicSpotsUrl(value)
            .then(({data}) => result(data, true))
            .catch(({response}) => ElNotification.error(response.data.message))
    }
    const handleDelete = (id) =>
        deleteScenicSpotsUrl(id)
            .then(({data}) => result(data))
            .catch(({response}) => ElNotification.error(response.data.message))
    const handleBatchDelete = () =>
        confirmBox('确定删除选中的数据吗？', '提示', 'warning', () =>
            batchDeleteScenicSpotsUrl(selection.value.map((item) => item['id']))
                .then(({data}) => result(data))
                .catch(({response}) => ElNotification.error(response.data.message))
        )
    const changeCurrent = (current) => search.current = current
    const changeSize = (size) => search.size = size

    /* dialog */
    const show = ref(false)
    const form = ref({})
    const dialogRef = ref(null)
    const dialogOperate = ref('')
    const title = ref('')
    const dialogRules = reactive({name: [{required: true, message: '名称不能为空', trigger: 'blur'}]})
    const selectionChange = (data) => selection.value = data
    const openDialog = (operate, row = undefined) => {
        if (operate === 'add') {
            title.value = '新增'
        } else {
            title.value = '编辑'
            form.value = row ? cloneDeep(row) : cloneDeep(selection.value[0])
        }
        show.value = true
        dialogOperate.value = operate
    }

    const handleOperate = async (formEl) => {
        if (!formEl) return
        await formEl.validate(async (valid) => {
            if (valid) {
                const {value} = form
                dialogOperate.value === 'add' ? add(value) : update(value)
            }
        })
    }

    /* showImage */
    const showImage = ref(false)
    const imageUrl = ref('')
    const openShowImage = (url) => {
        showImage.value = true
        imageUrl.value = url
    }

    /* upload */
    const maxSize = ref(5)
    const types = ref(['image/jpeg', 'image/png'])
    const handleUploadSuccess = (response) => (form.value.image = clone(response.data))

    const handleBeforeUpload = (file) => {
        const {value} = maxSize
        const {size, type} = file
        if (size / 1000 / 1024 > value) {
            ElNotification.warning(`图片最大为${value}MB`)
            return false
        }
        if (types.value.indexOf(type) === -1) {
            ElNotification.warning('图片类型错误')
            return false
        }
    }

    watch(
        () => search,
        () => getTableData(),
        {deep: true}
    )

    watch(
        () => show.value,
        (value) => {
            if (!value) {
                form.value = {}
                dialogOperate.value = ''
            }
        },
        {deep: true}
    )

    watch(
        () => selection.value,
        (value) => (disable.value = value.length < 1),
        {deep: true}
    )

    watch(() => columns.value[0].status, (value) => (
            value ? columns.value.forEach(item => item.status = true) :
                columns.value.forEach(item => item.status = false))
        , {deep: true})

    onMounted(() => getTableData())

    return {
        tableData,
        total,
        columns,
        loading,
        search,
        disable,
        show,
        form,
        dialogRef,
        title,
        dialogRules,
        dialogOperate,
        imageUrl,
        showImage,
        getTableData,
        selectionChange,
        changeCurrent,
        changeSize,
        openDialog,
        handleOperate,
        handleDelete,
        handleBatchDelete,
        handleUploadSuccess,
        handleBeforeUpload,
        openShowImage
    }
}
