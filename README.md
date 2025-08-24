# NextAuth.js 演示项目

这是一个使用 Next.js 15 和 NextAuth.js 的认证演示项目。

## 功能特性

- 🔐 GitHub OAuth 登录
- 🛡️ 受保护的 API 路由
- 📱 响应式设计
- 🎨 现代化 UI 组件

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 环境变量配置

复制 `env.example` 文件为 `.env.local`：

```bash
cp env.example .env.local
```

然后编辑 `.env.local` 文件，填入以下值：

```env
# GitHub OAuth 应用配置
AUTH_GITHUB_ID=your_github_client_id_here
AUTH_GITHUB_SECRET=your_github_client_secret_here

# NextAuth.js 密钥
AUTH_SECRET=your_nextauth_secret_here

# 应用URL
NEXTAUTH_URL=http://localhost:3000
```

### 3. 创建 GitHub OAuth 应用

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写应用信息：
   - Application name: `NextAuth Demo`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. 复制 Client ID 和 Client Secret 到 `.env.local` 文件

### 4. 生成 NextAuth 密钥

```bash
openssl rand -base64 32
```

将生成的密钥复制到 `.env.local` 文件的 `AUTH_SECRET` 字段。

### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
next-auth-demo/
├── app/                    # App Router 目录
│   ├── api/               # API 路由
│   │   └── app/
│   │       └── helloApi/  # 受保护的 API 示例
│   ├── auth/              # 认证相关页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── pages/                  # Pages Router 目录
│   └── api/
│       └── auth/          # NextAuth API 路由
├── components/             # 可复用组件
├── auth.ts                 # NextAuth 配置
├── env.example            # 环境变量示例
└── README.md              # 项目说明
```

## API 使用示例

### 受保护的 API 调用

```typescript
import { useSession } from 'next-auth/react'

export default function MyComponent() {
  const { data: session } = useSession()

  const callProtectedAPI = async () => {
    if (session) {
      const response = await fetch('/api/app/helloApi', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log(data)
      }
    }
  }

  return (
    <div>
      {session ? (
        <button onClick={callProtectedAPI}>
          调用受保护的 API
        </button>
      ) : (
        <p>请先登录</p>
      )}
    </div>
  )
}
```

## 认证流程

1. 用户访问应用
2. 点击登录按钮，重定向到 GitHub
3. 用户在 GitHub 授权应用
4. GitHub 重定向回应用，携带授权码
5. NextAuth.js 使用授权码获取访问令牌
6. 创建用户会话，用户登录成功

## 故障排除

### 常见问题

1. **"Catch-all must be the last part of the URL" 错误**
   - 确保没有重复的 API 路由
   - 检查 `app/` 和 `pages/` 目录下的路由配置

2. **认证失败**
   - 检查环境变量是否正确配置
   - 确认 GitHub OAuth 应用的回调 URL 设置

3. **类型错误**
   - 运行 `npm install` 确保依赖完整
   - 检查 TypeScript 配置

## 技术栈

- **框架**: Next.js 15
- **认证**: NextAuth.js
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **数据库**: Prisma (可选)

## 许可证

MIT
