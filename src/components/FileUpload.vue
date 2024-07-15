<!-- src/components/FileUpload.vue -->
<template>
    <div>
        <h2>文件上传</h2>
        <form @submit.prevent="uploadFile">
            <input type="file" @change="handleFileUpload" required />
            <button type="submit">上传</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            file: null
        };
    },
    methods: {
        handleFileUpload(event) {
            this.file = event.target.files[0];
        },
        async uploadFile() {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('请先登录！');
                this.$router.push('/login');
                return;
            }
            const formData = new FormData();
            formData.append('file', this.file);
            try {
                const response = await fetch('http://localhost:5000/upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}` // 修正 Authorization 头格式
                    },
                    body: formData
                });
                const data = await response.json();
                if (response.ok) {
                    alert('文件上传成功！');
                } else {
                    alert('文件上传失败：' + data.message);
                }
            } catch (error) {
                alert('文件上传失败：' + error.message);
            }
        }
    }
};
</script>
