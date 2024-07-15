<!-- src/components/Register.vue -->
<template>
    <div>
        <h2>用户注册</h2>
        <form @submit.prevent="register">
            <div>
                <label for="username">用户名:</label>
                <input type="text" id="username" v-model="username" required />
            </div>
            <div>
                <label for="password">密码:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit">注册</button>
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
        async register() {
            try {
                const response = await fetch('http://localhost:5000/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: this.username, password: this.password })
                });
                const data = await response.json();
                if (response.ok) {
                    alert('注册成功！');
                } else {
                    alert('注册失败：' + data.message);
                }
            } catch (error) {
                alert('注册失败：' + error.message);
            }
        }
    }
};
</script>
