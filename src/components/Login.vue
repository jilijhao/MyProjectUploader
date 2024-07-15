<!-- src/components/Login.vue -->
<template>
    <div>
        <h2>用户登录</h2>
        <form @submit.prevent="login">
            <div>
                <label for="username">用户名:</label>
                <input type="text" id="username" v-model="username" required />
            </div>
            <div>
                <label for="password">密码:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit">登录</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        async login() {
            try {
                const response = await fetch('http://localhost:5000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: this.username, password: this.password })
                });
                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    alert('登录成功！');
                     this.$router.push('/upload');
                } else {
                    alert('登录失败：' + data.message);
                }
            } catch (error) {
                alert('登录失败：' + error.message);
            }
        }
    }
};
</script>
