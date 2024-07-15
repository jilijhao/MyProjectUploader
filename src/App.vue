<template>
    <div id="app">
        <header>
            <h1>我的应用</h1>
            <nav v-if="!loggedIn">
                <ul>
                    <li @click="goTo('/login')">登录</li>
                    <li @click="goTo('/register')">注册</li>
                </ul>
            </nav>
            <nav v-else>
                <ul>
                    <li @click="goTo('/upload')">文件上传</li>
                    <li @click="logout">退出</li>
                </ul>
            </nav>
        </header>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loggedIn: false
        };
    },
    created() {
        // 检查本地存储中是否有用户登录信息
        const token = localStorage.getItem('token');
        if (token) {
            this.loggedIn = true;
        }
    },
    methods: {
        goTo(path) {
            this.$router.push(path);
        },
        logout() {
            localStorage.removeItem('token');
            this.loggedIn = false;
            this.$router.push('/login');
        }
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

header {
    background-color: #35495e;
    padding: 10px 0;
    color: white;
}

nav ul {
    list-style: none;
    padding: 0;
}

nav ul li {
    display: inline;
    margin: 0 10px;
    cursor: pointer;
}
</style>
