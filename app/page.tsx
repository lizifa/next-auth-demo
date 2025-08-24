import { signIn } from "@/auth"
import Link from 'next/link';

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex flex-col gap-4">
        
        <div className="text-center space-y-4">
          
          <div className="bg-gray-100 p-4 rounded-lg text-left">
            <h3 className="font-semibold mb-2">可用的 API 端点：</h3>
            <ul className="space-y-2 text-sm">
              <li><code className="bg-gray-200 px-2 py-1 rounded">POST /api/auth/signin/github</code> - GitHub 登录</li>
              <li><code className="bg-gray-200 px-2 py-1 rounded">POST /api/auth/signin/google</code> - Google 登录</li>
              <li><code className="bg-gray-200 px-2 py-1 rounded">POST /api/auth/signout</code> - 登出</li>
              <li><code className="bg-gray-200 px-2 py-1 rounded">GET /api/auth/session</code> - 获取会话信息</li>
              <li><code className="bg-gray-200 px-2 py-1 rounded">GET /api/auth/csrf</code> - 获取 CSRF 令牌</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg text-left">
            <h3 className="font-semibold mb-2 text-blue-800">使用方式：</h3>
            <p className="text-sm text-blue-700">
              您可以通过 HTTP 请求直接调用这些 API 端点，或者在前端使用 fetch/axios 等方式调用。
              NextAuth 将处理 OAuth 流程和会话管理，但不依赖 React 组件。
            </p>
          </div>


          <div className="pt-4">
            <Link 
              href="/api-example"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              查看 API 调用示例 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
